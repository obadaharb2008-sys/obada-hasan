import React from "react";
import { Heart } from "lucide-react";
import "./Footer.css";

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content" style={{ textAlign: "center" }}>
          <p className="footer-text">
            {language === "en" ? (
              <>
                Developed by{" "}
                <span className="footer-highlight">Obada Ghassan Harb Hasan</span>
              </>
            ) : (
              <>
                تطوير{" "}
                <span className="footer-highlight">عبادة غسان حرب حسن</span>
              </>
            )}
          </p>
          <p className="footer-copyright">
            © {currentYear}{" "}
            {language === "en" ? "All rights reserved" : "جميع الحقوق محفوظة"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
