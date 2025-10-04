import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NotebookRun from './NotebookRun'
import Timeline from './Timeline'
import Dashboard from './Dashboard'
import Learn from './Learn'
import Footer from './Footer'

export default function Home() {
  const [selectedModel, setSelectedModel] = useState(0)

  const satellites = [
    {
      name: "KEPLER",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/Kepler_Arrives_at_Launch_Pad.jpg?w=1536",
      description: "Planet-hunting spacecraft"
    },
    {
      name: "TESS",
      image: "https://science.nasa.gov/wp-content/uploads/2023/05/tess-patch-1-jpg.webp?w=1536",
      description: "All-sky exoplanet survey"
    },
    {
      name: "JWST",
      image: "https://science.nasa.gov/wp-content/uploads/2023/04/webb-poster-1-jpg.webp?w=1536",
      description: "Deep space observatory"
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            {/* Mission badge */}
            <div className="inline-block">
              <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300">
                🚀 MISSION: EXOPLANET DETECTION
              </div>
            </div>

            {/* Main heading with futuristic font */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              THE FUTURE IS
              <br />
              <span className="block mt-2">NOW - WITH</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                EXOML
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Discover exoplanets using cutting-edge AI technology powered by data from NASA's Kepler, K2, and TESS missions.
            </p>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link
                to="/predict"
                className="group flex items-center space-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all backdrop-blur-sm"
              >
                <span>Explore more</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Satellite Models Selection */}
            <div className="pt-8">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">SATELLITE MODELS</p>
              <div className="flex space-x-4">
                {satellites.map((sat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedModel(idx)}
                    className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${selectedModel === idx
                        ? 'border-cyan-400 scale-110'
                        : 'border-white/20 hover:border-white/40 opacity-60'
                      }`}
                  >
                    <img
                      src={sat.image}
                      alt={sat.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Satellite visualization */}
          <div className="relative">
            {/* Main satellite image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
              <div className="relative">
                <img
                  src={satellites[selectedModel].image}
                  alt={satellites[selectedModel].name}
                  className="w-full h-auto max-w-2xl mx-auto rounded-2xl shadow-2xl transition-all duration-500"
                />

                {/* Info card */}
                <div className="absolute bottom-8 right-8 p-6 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-cyan-400">
                    <img
                      src={satellites[selectedModel].image}
                      alt={satellites[selectedModel].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{satellites[selectedModel].name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{satellites[selectedModel].description}</p>
                  <Link
                    to="/predict"
                    className="flex items-center text-cyan-400 text-sm font-medium group"
                  >
                    Start Detecting
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Main Components */}
      <div className="space-y-32 py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <section>
          <NotebookRun />
        </section>

        <section id="timeline">
          <Timeline />
        </section>

        <section id="dashboard">
          <Dashboard />
        </section>

        <section id="learn">
          <Learn />
        </section>
      </div>

      <Footer />
    </div>
  )
}