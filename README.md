# ChatGPT No Voice Button

This Tampermonkey userscript removes the annoying Voice and Dictate buttons from ChatGPT and adds the old grayed out Send Prompt to replace them. It does this by continuously monitoring the page for changes using a MutationObserver and a configurable check interval

You can configure the check interval for button monitoring directly through the Tampermonkey menu.

## Installation

 - Install Tampermonkey in your browser.

 - Click [this](https://raw.githubusercontent.com/Gameknight963/ChatGptNoVoice/refs/heads/main/userscript.js) to install this script

 - If that doesn't work, create a new userscript and copy that code into it

Note: Lower interval rates are better but probably more cpu instensive. I tried to use mutationobserver for everything but couldn't get it working cause js

## Screenshots

before:

<img width="770" height="70" alt="image" src="https://github.com/user-attachments/assets/e93f2120-e78a-42e9-a1ba-ee75f22be805" />

after:

<img width="769" height="70" alt="image" src="https://github.com/user-attachments/assets/57b9110d-330a-4646-86e8-8a1274dd8071" />

I'm using [AeroGPT](https://github.com/Gameknight963/AeroGPT), so if it looks different than your's thats why
