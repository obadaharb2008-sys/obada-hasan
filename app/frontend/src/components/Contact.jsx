import React from "react";
import { MessageCircle, Youtube, Download } from "lucide-react";
import { personalInfo } from "../mock";
import { Button } from "./ui/button";
import "./Contact.css";

const Contact = ({ language }) => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">
          {language === "en" ? "Let's Connect" : "لنتواصل"}
        </h2>
        <p className="contact-description">
          {language === "en"
            ? "Join my community and stay updated with my latest content"
            : "انضم إلى مجتمعي وابق على اطلاع بأحدث محتواي"}
        </p>

        <div className="social-buttons">
          <a
            href={personalInfo.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Button className="social-btn whatsapp-btn">
              <MessageCircle size={24} />
              <span>
                {language === "en" ? "Join WhatsApp Community" : "انضم لمجتمع واتساب"}
              </span>
            </Button>
          </a>

          <a
            href={personalInfo.socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Button className="social-btn youtube-btn">
              <Youtube size={24} />
              <span>
                {language === "en" ? "Visit YouTube Channel" : "زر قناتي على يوتيوب"}
              </span>
            </Button>
          </a>
        </div>

        <div className="contact-info">
          <p className="contact-note">
            {language === "en"
              ? "Feel free to reach out for collaborations or just to say hi!"
              : "لا تتردد في التواصل للتعاون أو لمجرد إلقاء التحية!"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
