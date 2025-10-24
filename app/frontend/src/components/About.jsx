import React from "react";
import { personalInfo } from "../mock";
import "./About.css";

const About = ({ language }) => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">
          {language === "en" ? "About Me" : "نبذة عني"}
        </h2>

        <div className="about-content">
          <div className="about-image-wrapper">
            <div className="about-image-border">
              <img
                src={personalInfo.photo}
                alt={personalInfo.name[language]}
                className="about-image"
              />
            </div>
          </div>

          <div className="about-text">
            <h3 className="about-name">{personalInfo.name[language]}</h3>
            <p className="about-title">{personalInfo.title[language]}</p>
            <p className="about-bio">{personalInfo.bio[language]}</p>

            <div className="stats-container">
              {personalInfo.stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label[language]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;