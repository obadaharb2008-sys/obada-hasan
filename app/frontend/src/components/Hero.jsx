import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { personalInfo } from "../mock";
import "./Hero.css";

const Hero = ({ language }) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const welcomeText = personalInfo.welcomeMessage[language];

  useEffect(() => {
    setDisplayText("");
    setTextIndex(0);
  }, [language]);

  useEffect(() => {
    if (textIndex < welcomeText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(welcomeText.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, welcomeText]);

  const scrollToNext = () => {
    const element = document.getElementById("chat");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {displayText}
            <span className="cursor">|</span>
          </h1>
          <p className="hero-subtitle">
            {personalInfo.title[language]}
          </p>
          <p className="hero-description">
            {personalInfo.description[language]}
          </p>
          <button onClick={scrollToNext} className="scroll-indicator" aria-label="Scroll to next section">
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="hero-bg-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
    </section>
  );
};

export default Hero;