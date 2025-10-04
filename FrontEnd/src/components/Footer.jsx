import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#04101a] py-8 mt-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-lg font-semibold text-cyan-300">ExoML</div>
            <div className="text-sm text-gray-400">AI-Powered Platform for Exoplanet Detection</div>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              NASA Archive
            </a>
            <a href="https://kepler.nasa.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              Kepler
            </a>
            <a href="https://tess.mit.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              TESS
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ExoML. Data credits to NASA. This is a research/demo project.
        </div>
      </div>
    </footer>
  );
}
