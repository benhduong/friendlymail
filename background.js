// Define states
const loading = { text: "...", color: "yellow" };
const success = { text: ":)", color: "green" };
const error = { text: ":(", color: "red" };
const clear = { text: "", color: "white" };

const timeoutDuration = 1500;
let clearBadgeTimeout;

/**
 * Function to set the badge text and background color
 * @param {Object} badge - Object containing text and color for the badge
 */
function setBadge({ text, color }) {
  chrome.action.setBadgeText({ text: text });
  chrome.action.setBadgeBackgroundColor({ color: color });
}

/**
 * Function to set the badge status and clear it after a delay
 * @param {Object} status - Object containing text and color for the badge
 */
function setStatus(status) {
  setBadge(status);
  if (clearBadgeTimeout) {
    clearTimeout(clearBadgeTimeout);
  }
  clearBadgeTimeout = setTimeout(() => {
    setBadge(clear);
  }, timeoutDuration);
}

// Add a click event listener to the extension's action (icon)
chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("https://mail.google.com/")) {
    setBadge(loading);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"], // Execute content script in the tab
    });
  } else {
    setStatus(error);
  }
});

// Add a message listener to handle messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  setStatus(request.message === "task_done" ? success : error);
});
