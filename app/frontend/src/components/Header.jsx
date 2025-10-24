import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { navigation } from "../mock";
import "./Header.css";

const Header = ({ language, toggleLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = navigation[language];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-logo">
          <span className="logo-text">
            {language === "en" ? "Obada.G.Hasan" : "عبادة.غ.حسن"}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-link"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language Toggle */}
        <button onClick={toggleLanguage} className="lang-toggle" aria-label="Toggle Language">
          <Globe size={20} />
          <span>{language === "en" ? "AR" : "EN"}</span>
        </button>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="mobile-nav-link"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;