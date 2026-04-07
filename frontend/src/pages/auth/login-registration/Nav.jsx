import React from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { IoIosContact } from "react-icons/io";
import { CiCircleMore } from "react-icons/ci";
import { useState } from "react";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-sm font-bold text-white">
            M
          </div>
          <span className="text-lg font-bold text-white">Manas Health</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <IoMdHome size={18} /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <CiCircleMore size={18} /> About Us
            </Link>
          </li>
          <li>
            <a
              href="mailto:22bd1a0565@gmail.com?subject=MANAS%20HEALTH"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <IoIosContact size={18} /> Contact
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition hover:bg-white/10 md:hidden"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="animate-fade-in border-t border-white/10 bg-slate-900 px-4 pb-4 md:hidden">
          <ul className="space-y-1 pt-2" onClick={() => setMenuOpen(false)}>
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <IoMdHome size={18} /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <CiCircleMore size={18} /> About Us
              </Link>
            </li>
            <li>
              <a
                href="mailto:22bd1a0565@gmail.com?subject=MANAS%20HEALTH"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <IoIosContact size={18} /> Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
