import React from "react";

const RESOURCES = [
  { 
    title: "Transit Method Explained", 
    href: "https://exoplanets.nasa.gov/alien-worlds/ways-to-find-a-planet/#/2",
    type: "NASA Guide",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    summary: "Learn how the transit method detects exoplanets by measuring brightness dips when planets pass in front of their host stars."
  },
  { 
    title: "Kepler Mission Overview", 
    href: "https://www.nasa.gov/mission_pages/kepler/overview/index.html",
    type: "Mission Data",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    summary: "Explore Kepler's groundbreaking discoveries including 2,662 confirmed exoplanets over its 9-year mission."
  },
  { 
    title: "TESS: All-Sky Survey", 
    href: "https://tess.mit.edu/science/",
    type: "Active Mission",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    summary: "Discover how TESS surveys 200,000+ stars to find Earth-sized planets around nearby bright stars."
  },
  { 
    title: "Machine Learning in Astronomy", 
    href: "https://arxiv.org/abs/1904.07248",
    type: "Research Paper",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    summary: "Deep dive into ML techniques for exoplanet detection and characterization from observational data."
  },
  { 
    title: "Introduction to Light Curves", 
    href: "https://www.youtube.com/watch?v=lpH3_hXUQqg",
    type: "Video",
    icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z",
    summary: "Visual explanation of how astronomers use light curves to detect and validate exoplanet transits."
  }
];

export default function Learn() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-sm text-purple-400 font-medium">
            📚 EDUCATIONAL RESOURCES
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          For Researchers & Students
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Explore curated resources from NASA, research papers, and tutorials to deepen your understanding of exoplanet detection
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {RESOURCES.map((resource, idx) => (
          <a 
            key={idx} 
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            {/* Icon */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={resource.icon} />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{resource.type}</span>
                  <svg className="w-3 h-3 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{resource.title}</h3>
              </div>
            </div>
            
            {/* Summary */}
            <p className="text-sm text-gray-400 leading-relaxed">{resource.summary}</p>
            
            {/* Hover Effect Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
          </a>
        ))}
      </div>

      {/* Additional Video Section */}
      <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Quick Start Video</h3>
            <p className="text-gray-300 mb-6">
              Watch this comprehensive introduction to exoplanets. Learn how astronomers analyze light curves to identify potential planets.
            </p>
            <a 
              href="https://www.youtube.com/watch?v=kYXE8dQPRF4" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-full text-white font-semibold transition-all shadow-lg shadow-purple-500/30"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              <span>Watch on YouTube</span>
            </a>
          </div>
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe width="764" height="430" src="https://www.youtube.com/embed/2mPz6Lv41PM" title="Exoplanets &amp; Light Curves Explained" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-blue-300">For Educators:</span> These resources are curated from NASA, peer-reviewed research, and educational institutions. Perfect for classroom integration or independent study.
          </p>
        </div>
      </div>
    </div>
  );
}
