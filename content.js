/**
 * Function to get the body of the email from the Gmail interface
 * @returns {string} - The inner text of the email body or an empty string if not found
 */
function getEmailBody() {
  const emailBodyElement = document.querySelector(
    'div[aria-label="Message Body"]'
  );
  return emailBodyElement ? emailBodyElement.innerText : "";
}

/**
 * Function to set the body of the email in the Gmail interface
 * @param {string} rewrittenText - The new text to set as the email body
 */
function setEmailBody(rewrittenText) {
  const emailBodyElement = document.querySelector(
    'div[aria-label="Message Body"]'
  );
  if (emailBodyElement) {
    emailBodyElement.innerText = rewrittenText;
  }
}

/**
 * Function to generate and set rewritten email text
 * @returns {Promise<string>} - A promise that resolves to the rewritten email text
 */
async function generateText() {
  try {
    const text = getEmailBody();
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are an editor. When given an email, rewrite the email for flow and friendliness. Try to keep the email concise or of similar length.",
          },
          {
            role: "user",
            content: `Please edit the following email: ${text}`,
          },
        ],
      }),
    });
    const data = await response.text();
    setEmailBody(data);
    chrome.runtime.sendMessage({ message: "task_done" });
    return data;
  } catch (error) {
    chrome.runtime.sendMessage({ message: "task_failed" });
    throw new Error(`Failed to rewrite email: ${error.message}`);
  }
}

generateText();
