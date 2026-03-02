// ==UserScript==
// @name         chatgpt no voice
// @namespace    http://tampermonkey.net/
// @version      2026-03-02
// @description  remove the stupid voice button that I always click by mistake
// @author       You
// @match        https://chatgpt.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

// get saved interval or default to 25ms
let checkInterval = GM_getValue("checkInterval", 25);

// allow change interval via tampermonkey menu
GM_registerMenuCommand("Set Check Interval", () => {
    const val = prompt(`Enter check interval in ms:`, checkInterval);
    if (val !== null && !isNaN(val) && Number(val) > 0) {
        checkInterval = Number(val);
        GM_setValue("checkInterval", checkInterval);
        // restart removeButtons interval
        clearInterval(removeButtonsInterval);
        removeButtonsInterval = setInterval(removeButtons, checkInterval);
    }
});

function removeButtons() {
    document.querySelectorAll('button[aria-label="Start Voice"]').forEach(btn => btn.remove());
    document.querySelectorAll('button[aria-label="Dictate button"]').forEach(btn => btn.remove());
}

// initial interval
let removeButtonsInterval = setInterval(removeButtons, checkInterval);


function createCloneButton() {
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", "Send prompt");
    btn.setAttribute("data-testid", "send-button");
    btn.setAttribute("data-clone", "true"); // mark as our clone
    btn.className = "composer-submit-btn composer-submit-button-color h-9 w-9";
    btn.style.transform = "translateX(6px)"; // if it works dont touch it

    //colors
    btn.style.backgroundColor = "rgba(255, 255, 255, 0.41)";
    btn.style.opacity = "0.35";

    // text / icon color
    btn.style.color = "rgb(47, 47, 47)";

    btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon">
            <use href="/cdn/assets/sprites-core-eri7ssmm.svg#01bab7" fill="currentColor"></use>
        </svg>
    `;

    return btn;
}

let creatingClone = false; // lock to prevent double creation

function ensureButtonExists() {
    const parent = document.querySelector("div.ms-auto.flex.items-center.gap-1\\.5");
    if (!parent) return;

    const stopButton = parent.querySelector('button[aria-label="Stop streaming"]');
    const clone = parent.querySelector('button[data-clone]');
    const original = parent.querySelector('button[aria-label="Send prompt"]:not([data-clone])');

    // hide clone if stop button exists
    if (stopButton) {
        if (clone) clone.style.visibility = "hidden";
        return;
    } else {
        if (clone) clone.style.visibility = "visible";
    }

    // remove clone if original exists
    if (original && clone) {
        clone.remove();
        return;
    }

    // if neither original nor clone exists, create clone safely
    if (!original && !clone && !creatingClone) {
        creatingClone = true;
        setTimeout(() => {
            const existingOriginal = parent.querySelector('button[aria-label="Send prompt"]:not([data-clone])');
            const existingClone = parent.querySelector('button[data-clone]');
            if (!existingOriginal && !existingClone) {
                const span = parent.querySelector("span[data-state]");
                const btn = createCloneButton();
                if (span) span.after(btn);
                else parent.appendChild(btn);
            }
            creatingClone = false; // release lock
        }, checkInterval - 3); // small delay to let original render if it's coming back
    }
}

// observe the entire body for DOM changes
const observer = new MutationObserver(ensureButtonExists);
observer.observe(document.body, { childList: true, subtree: true });

// initial run
ensureButtonExists();
