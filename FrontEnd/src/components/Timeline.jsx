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
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">History of Exoplanet Exploration</h2>

      <div className="relative">
        <div className="overflow-x-auto py-6">
          <div className="flex space-x-10 px-4">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="min-w-[220px] flex-shrink-0">
                <div className="p-4 bg-[#061227] rounded-lg border border-gray-800 shadow hover:scale-105 transition transform">
                  <div className="text-sm text-cyan-300 font-bold">{m.year}</div>
                  <div className="mt-2 text-lg font-semibold">{m.title}</div>
                  <div className="mt-2 text-gray-300 text-sm">{m.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* timeline line */}
        <div className="hidden md:block absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 pointer-events-none">
          <div className="w-full h-1 bg-gradient-to-r from-purple-700 via-cyan-500 to-purple-700 opacity-30 rounded-full" />
        </div>
      </div>

      <p className="mt-6 text-gray-400">
        يمكنك إضافة نقاط جديدة بتحرير مصفوفة <code>MILESTONES</code> داخل الملف.
      </p>
    </div>
  );
}
