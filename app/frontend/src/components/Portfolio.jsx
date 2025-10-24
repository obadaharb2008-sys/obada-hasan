import React, { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import EnhancedChatSection from "./EnhancedChatSection";
import About from "./About";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import "./Portfolio.css";

const Portfolio = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={`portfolio ${language === "ar" ? "rtl" : "ltr"}`}>
      <Header language={language} toggleLanguage={toggleLanguage} />
      <main>
        <Hero language={language} />
        <EnhancedChatSection language={language} />
        <About language={language} />
        <Education language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Portfolio;