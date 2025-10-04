// Timeline.jsx
// Horizontal timeline with simple hover popups.
// Place in frontend/src/components/

import React from "react";

const MILESTONES = [
  { year: "1992", title: "First confirmed exoplanets", detail: "Wolszczan & Frail discovered planets around a pulsar." },
  { year: "2009", title: "Kepler Launch", detail: "Kepler mission launched to search for Earth-size planets." },
  { year: "2013", title: "K2 Mission", detail: "Repurposed Kepler mission: K2." },
  { year: "2018", title: "TESS Launch", detail: "TESS launched to survey nearest bright stars." },
  { year: "2021", title: "JWST Science Era", detail: "JWST begins characterizing exoplanet atmospheres." },
];

export default function Timeline() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          EXPLORATION TIMELINE
        </span>
      </h2>

      <div className="relative">
        <div className="overflow-x-auto py-6">
          <div className="flex space-x-8 px-4">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="min-w-[240px] flex-shrink-0">
                <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-400/50 hover:scale-105 transition-all duration-300 group">
                  <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2">{m.year}</div>
                  <div className="mt-2 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{m.title}</div>
                  <div className="mt-3 text-gray-400 text-sm leading-relaxed">{m.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* timeline line */}
        <div className="hidden md:block absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
