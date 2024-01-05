// Footer.js
import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="social-media">
          <a href="https://facebook.com"  className='facebook' target="_blank" rel="noopener noreferrer">
          <FaFacebook />
          </a>
          <a href="https://twitter.com" className='twitter' target="_blank" rel="noopener noreferrer">
          <FaXTwitter />
          </a>
          <a href="https://instagram.com" className='instagram' target="_blank" rel="noopener noreferrer">
          <FaInstagram />
          </a>
        </div>

        <div className="copyright">
          &copy; 2024 Manas Health. All rights reserved.
        </div>

        <div className="terms-privacy">
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
        </div>

        <div className="contact">
          Contact  :  manas@gmail.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
