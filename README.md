# friendly mail

This is a Chrome extension that makes emails friendlier with AI. Icon made by Freepik from www.flaticon.com. Powered by Pollinations.ai.

## Overview

The service worker sets the badge states and manages the onClicked action. When the action button is clicked and the user is on mail.google.com, the current draft message body is sent to Pollinations.ai to be rewritten. The email body is then replaced by the output from the AI model.

Badge States:
- Yellow Badge with **...** means the email is being rewritten
- Green Badge with **:)** means the operation was successful
- Red Badge with **:(** means the action button was clicked on a page other than mail.google.com

## Running this extension

1. Clone this repository.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Pin the extension to the taskbar and click the action button.
