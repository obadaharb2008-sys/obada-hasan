import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Mic, MicOff, Image, Volume2, X } from "lucide-react";
import axios from "axios";
import { chatbotKnowledge } from "../mock";
import "./ChatSection.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatSection = ({ language }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: chatbotKnowledge.sampleResponses[language][0],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update welcome message when language changes
    setMessages([
      {
        role: "assistant",
        content: chatbotKnowledge.sampleResponses[language][0],
      },
    ]);
  }, [language]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response with mock data
    setTimeout(() => {
      const responses = chatbotKnowledge.sampleResponses[language];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const assistantMessage = { role: "assistant", content: randomResponse };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="chat" className="chat-section">
      <div className="chat-container large">
        <div className="chat-header">
          <div className="chat-header-content">
            <Bot size={32} />
            <div>
              <h2 className="chat-title">
                {language === "en" ? "AI Assistant" : "المساعد الذكي"}
              </h2>
              <p className="chat-subtitle">
                {language === "en"
                  ? "Ask me about IT Education in Jordan"
                  : "اسألني عن تعليم تكنولوجيا المعلومات في الأردن"}
              </p>
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-icon">
                {message.role === "assistant" ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message assistant">
              <div className="message-icon">
                <Bot size={20} />
              </div>
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              language === "en"
                ? "Type your question..."
                : "اكتب سؤالك..."
            }
            className="chat-input"
          />
          <button onClick={handleSend} className="chat-send-btn" aria-label="Send message">
            <Send size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;