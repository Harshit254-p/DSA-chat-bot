document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const search = document.querySelector('.search');
  const bar = document.querySelector('.search-bar');
  const toggleBtn = document.querySelector('.search-toggle-btn');
  const sendBtn = document.getElementById('send-btn');
  const themeSwitch = document.getElementById('theme-switch');

  const API_KEY = "AIzaSyDBbSDzNszNAduOHTJTY4nTq9KW5Cg3noU ";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const systemPrompt = `
You are a Data Structure and Algorithm Instructor. You will only reply to the problems related to
Data Structures and Algorithms. You have to solve user queries in the simplest way.

If the user asks any question not related to DSA, reply politely.
Example: If the user asks, "How are you?"
You should respond: "This question is not related to DSA. Please ask only DSA related questions."

If the user asks a DSA question, reply politely with a simple explanation.
`;

  function activateSearch() {
    search.classList.toggle('active');
    bar.value = '';
    setTimeout(() => bar.focus(), 300);
  }

  toggleBtn.addEventListener('click', activateSearch, false);

  sendBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await sendMessage();
  });

  bar.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await sendMessage();
    }
  });

  async function sendMessage() {
    const userMessage = bar.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage, 'user-message');
    bar.value = '';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\n\nUser: " + userMessage }] }]
        })
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      const botMessage = data.candidates[0].content.parts[0].text;
      appendMessage(botMessage, 'bot-message');
    } catch (error) {
      console.error('Error:', error);
      appendMessage('Sorry, something went wrong. Please try again.', 'bot-message');
    }
  }

  function appendMessage(message, className) {
    const msg = document.createElement('div');
    msg.classList.add('message', className);
    msg.textContent = message;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Always start in dark mode
  document.body.classList.add("dark");
  themeSwitch.checked = true;
  localStorage.setItem("theme", "dark");

  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });
});
