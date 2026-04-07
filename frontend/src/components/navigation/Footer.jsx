// Footer.js
import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-6 lg:pl-80 lg:pr-8">
        <div className="flex items-center gap-3">
          <a href="https://facebook.com" className='flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white transition hover:bg-sky-700' target="_blank" rel="noopener noreferrer">
          <FaFacebook  style={{fontSize:"20px",color:"white"}}/>
          </a>
          <a href="https://twitter.com" className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700' target="_blank" rel="noopener noreferrer">
          <FaXTwitter style={{fontSize:"20px",color:"white"}}/>
          </a>
          <a href="https://instagram.com" className='flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white transition hover:bg-rose-600' target="_blank" rel="noopener noreferrer">
          <FaInstagram style={{fontSize:"20px",color:"white"}}/>
          </a>
        </div>

        <div className="font-medium text-slate-600">
          &copy; 2024 Manas Health. All rights reserved.
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/working">Terms of Service</Link> | <Link to="/working">Privacy Policy</Link>
        </div>

        <div>
          Contact  :  manashealth@gmail.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
