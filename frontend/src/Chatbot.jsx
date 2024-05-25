import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

const chatWithClaude = async (userInput) => {
  const apiEndpoint = 'https://www.anthropic.com/api/app/conversation';

  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': REACT_APP_API_KEY
  };

  const data = {
    prompt: userInput,
    max_tokens_to_sample: 150
  };

  try {
    const response = await axios.post(apiEndpoint, data, { headers });
    return response.data.response.prompt_response;
  } catch (error) {
    console.error('Error communicating with the API:', error);
    return '';
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: '...', user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await chatWithClaude(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
    setInput('');
  };
  return (
    <div className="chatbot-container">
    <h1>Welcome to TaskRoom Chatbot ! Ask your question</h1>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user-messageeeee' : 'ai-messageeeee'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="chatbot-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default Chatbot;