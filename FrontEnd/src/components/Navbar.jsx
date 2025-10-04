import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-3xl font-bold tracking-wider text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-white">EXOML</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/predict" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Predict
            </Link>
            <a href="/#timeline" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Timeline
            </a>
            <a href="/#dashboard" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Dashboard
            </a>
          </div>

          {/* CTA Button */}
          <Link
            to="/predict"
            className="hidden md:block px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-medium transition-all backdrop-blur-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}