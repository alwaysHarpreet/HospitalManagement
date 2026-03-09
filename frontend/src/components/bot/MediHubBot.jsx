import { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

function MediHubBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState(null);

  const API_KEY = "YOUR_API_KEY";
  const MODEL_NAME = "gemini-1.0-pro-001";

  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationConfig,
            safetySettings,
            history: [
              ...messages.map((msg) => ({
                text: msg.text,
                role: msg.role,
              })),
            ],
          });
        setChat(newChat);
      } catch (error) {
        setError("Failed to initialize chat. Please try again.");
      }
    };
    initChat();
  }, []);

  const handleSendMessage = async () => {
    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        const input_prompt = `
        If ${userInput} is informal like "hi"/"hello" etc ,respond like a general chatbot informally and greet back the user.Else,
        Identify diseases based on the Symptoms given by the user through ${userInput} and also list medicines for the same.
        If the user is asking general medical doubts like details of any medicine,etc through ${userInput} provide assistance for the same. 
        Don't give * in response please.
        Generate response in proper points on new line.
        
        `;
        const result = await chat.sendMessage(input_prompt);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); //prevents adding a new line in input field
      handleSendMessage();
    }
  };

  return (
    <div
      className="bot__chat"
    >
      <div className="bot__header">
        <h1 className="bot__title">HealthMatrix Bot</h1>
      </div>
      <div className="bot__messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`bot__message ${
              msg.role === "user" ? "bot__message--user" : "bot__message--bot"
            }`}
          >
            <div
              className={`bot__message-text ${
                msg.role === "user"
                  ? "bot__message-text--user"
                  : "bot__message-text--bot"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      {error && <div className="bot__error">{error}</div>}
      <div className="bot__input-wrap">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bot__input"
        />
        <button
          onClick={handleSendMessage}
          className="bot__send-btn"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MediHubBot;
