# ChatGPT No Voice Button

This Tampermonkey userscript removes the annoying Voice and Dictate buttons from ChatGPT and adds the old grayed out Send Prompt to replace them. It does this by continuously monitoring the page for changes using a MutationObserver and a configurable check interval

You can configure the check interval for button monitoring directly through the Tampermonkey menu.

## Installation

 - Install Tampermonkey in your browser.

 - Click [this](https://raw.githubusercontent.com/Gameknight963/ChatGptNoVoice/refs/heads/main/userscript.js) to install this script

 - If that doesn't work, create a new userscript and copy that code into it

Note: Lower interval rates are better but probably more cpu instensive. I tried to use mutationobserver for everything but couldn't get it working cause js