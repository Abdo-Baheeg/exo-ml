import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-sm py-12 mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-white">EXOML</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI-Powered Platform for Exoplanet Detection using advanced machine learning on NASA mission data.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <div className="space-y-2">
              <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-cyan-400 transition text-sm">
                NASA Exoplanet Archive
              </a>
              <a href="https://kepler.nasa.gov/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-cyan-400 transition text-sm">
                Kepler Mission
              </a>
              <a href="https://tess.mit.edu/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-cyan-400 transition text-sm">
                TESS Mission
              </a>
            </div>
          </div>

          {/* Credits */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Credits</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Data provided by NASA's Kepler, K2, and TESS missions. This is a research and educational project.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ExoML. All rights reserved. Made with ❤️ for astronomy and data science.
          </p>
        </div>
      </div>
    </footer>
  );
}
