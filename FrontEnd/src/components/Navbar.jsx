import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-[#0f172a] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-cyan-400">ExoML</div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <a href="#datasets" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Datasets</a>
                <a href="#predict" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Predict</a>
                <a href="#timeline" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Timeline</a>
                <a href="#dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="#learn" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Learn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}