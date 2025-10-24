import React from "react";
import "./ChatSection.css"; // Assuming this file exists and is styled correctly

const EnhancedChatSection = ({ language }) => {
  return (
    <section id="chat" className="chat-section">
      <div className="chat-container">
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/gWvWe8QFeq_IVVm0vDONf"
          width="100%"
          style={{ height: "100%", minHeight: "700px" }}
          frameBorder="0"
          title="Chatbot"
        ></iframe>
      </div>
    </section>
  );
};

export default EnhancedChatSection;
