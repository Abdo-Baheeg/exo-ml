import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              EXOML
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/predict" 
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Predict
            </Link>
            <a 
              href="/#timeline" 
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Timeline
            </a>
            <a 
              href="/#dashboard" 
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Dashboard
            </a>
          </div>

          {/* CTA Button - Desktop */}
          <Link
            to="/predict"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-500/30"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/predict" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Predict
              </Link>
              <a 
                href="/#timeline" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Timeline
              </a>
              <a 
                href="/#dashboard" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </a>
              <Link
                to="/predict"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white text-sm font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}