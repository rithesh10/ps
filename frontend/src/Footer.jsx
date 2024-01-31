// Footer.js
import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="social-media">
          <a href="https://facebook.com"  className='facebook' target="_blank" rel="noopener noreferrer">
          <FaFacebook  style={{fontSize:"25px",color:"white"}}/>
          </a>
          <a href="https://twitter.com" className='twitter' target="_blank" rel="noopener noreferrer">
          <FaXTwitter style={{fontSize:"25px",color:"white"}}/>
          </a>
          <a href="https://instagram.com" className='instagram' target="_blank" rel="noopener noreferrer">
          <FaInstagram style={{fontSize:"25px",color:"white"}}/>
          </a>
        </div>

        <div className="copy-right">
          &copy; 2024 Manas Health. All rights reserved.
        </div>

        <div className="terms-privacy">
          <Link to="/working">Terms of Service</Link> | <Link to="/working">Privacy Policy</Link>
        </div>

        <div className="contact">
          Contact  :  bhAAi@gmail.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
