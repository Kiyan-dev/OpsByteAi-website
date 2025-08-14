const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenAI API key
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

async function sendMessage() {
    const message = userInput.value;
    if (!message.trim()) return;

    // Show user message
    chatBox.innerHTML += `<div><b>You:</b> ${message}</div>`;
    userInput.value = "";

    // Fetch AI response
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }]
        })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    // Show AI response
    chatBox.innerHTML += `<div><b>AI:</b> ${aiMessage}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});
