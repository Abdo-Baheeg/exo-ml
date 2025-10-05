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
      image: "/images/kepler-image.jpg",
      thumbnail: "/images/kepler-thumbnail.png",
      description: "Planet-hunting spacecraft",
      mission: "Discovered 2,662 exoplanets",
      launchYear: "2009",
      status: "Retired 2018"
    },
    {
      name: "TESS",
      image: "/images/tess-image.webp",
      thumbnail: "/images/tess-thumbnail.webp",
      description: "All-sky exoplanet survey",
      mission: "Surveying 200,000+ stars",
      launchYear: "2018",
      status: "Active"
    },
    {
      name: "JWST",
      image: "/images/jwst-image.webp",
      thumbnail: "/images/jwst-thumbnail.png",
      description: "Deep space observatory",
      mission: "Characterizing atmospheres",
      launchYear: "2021",
      status: "Active"
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-block">
                
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                DISCOVER
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  EXOPLANETS
                </span>
                <br />
                WITH AI
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
                Leverage machine learning to detect exoplanets from NASA's Kepler, K2, and TESS missions with unprecedented accuracy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/predict"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full text-white font-semibold transition-all shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
                >
                  <span>Start Detection</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="#problem"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-medium transition-all backdrop-blur-sm"
                >
                  Learn More
                </a>
              </div>

              {/* Satellite Selection */}
              <div className="pt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">Data Sources</p>
                <div className="flex gap-3 justify-center lg:justify-start">
                  {satellites.map((sat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedModel(idx)}
                      className={`group relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedModel === idx
                          ? 'border-cyan-400 scale-110 shadow-lg shadow-cyan-500/50'
                          : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`View ${sat.name} details`}
                    >
                      <img
                        src={sat.thumbnail || sat.image}
                        alt={sat.name}
                        className="w-full h-full object-contain p-2 bg-gray-900"
                      />
                      {selectedModel === idx && (
                        <div className="absolute inset-0 bg-cyan-500/20 animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Satellite Visualization */}
            <div className="relative lg:block">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-2xl blur-3xl group-hover:blur-2xl transition-all"></div>
                
                {/* Image */}
                <div className="relative">
                  <img
                    src={satellites[selectedModel].image}
                    alt={satellites[selectedModel].name}
                    className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-700"
                  />

                  {/* Info Card */}
                  <div className="absolute bottom-6 right-6 p-6 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl max-w-xs">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-cyan-400 bg-gray-900">
                        <img
                          src={satellites[selectedModel].thumbnail}
                          alt={satellites[selectedModel].name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{satellites[selectedModel].name}</h3>
                        <p className="text-gray-400 text-xs">{satellites[selectedModel].description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>📅</span>
                        <span>Launched {satellites[selectedModel].launchYear}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className={selectedModel === 0 ? '⚫' : '�'}></span>
                        <span>{satellites[selectedModel].status}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>🎯</span>
                        <span>{satellites[selectedModel].mission}</span>
                      </div>
                    </div>
                    
                    <Link
                      to="/predict"
                      className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group/link"
                    >
                      <span>Explore Data</span>
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-full text-sm text-red-400 font-medium">
                🎯 THE CHALLENGE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Exoplanet Detection Problem
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              While over 4,000 exoplanets have been discovered, validating candidates remains a critical bottleneck in astronomical research
            </p>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                title: "High False Positive Rate",
                icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                gradient: "from-red-500 to-orange-500",
                bgColor: "bg-red-500/20",
                textColor: "text-red-400",
                description: "Transit signals can be mimicked by eclipsing binary systems, stellar variability, cosmic rays, and instrumental noise—making it difficult to distinguish real planets from false detections."
              },
              {
                title: "Time-Consuming Manual Review",
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                gradient: "from-orange-500 to-yellow-500",
                bgColor: "bg-orange-500/20",
                textColor: "text-orange-400",
                description: "Each candidate requires review by at least three experts, a process that can take days per TESS sector. Human factors like fatigue and subjective interpretation lead to inconsistent classifications."
              },
              {
                title: "Massive Data Volume",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                gradient: "from-yellow-500 to-green-500",
                bgColor: "bg-yellow-500/20",
                textColor: "text-yellow-400",
                description: "TESS alone produces ~1 million light curves per month, covering 400× more sky area than Kepler. Traditional methods struggle to keep pace with this exponential data growth."
              },
              {
                title: "Need for Interpretability",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                gradient: "from-green-500 to-blue-500",
                bgColor: "bg-green-500/20",
                textColor: "text-green-400",
                description: "While deep learning models achieve high accuracy, they lack transparency in feature importance. Classical ML offers better interpretability for understanding which stellar characteristics indicate true exoplanets."
              }
            ].map((challenge, idx) => (
              <div key={idx} className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${challenge.gradient} rounded-t-2xl`}></div>
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${challenge.bgColor} rounded-xl flex items-center justify-center`}>
                    <svg className={`w-6 h-6 ${challenge.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={challenge.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">{challenge.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{challenge.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Solution Card */}
          <div className="relative p-10 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
            
            <div className="text-center relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Our Solution</h3>
              </div>
              
              <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed mb-8">
                We deploy <span className="text-cyan-400 font-semibold">ensemble machine learning models</span>—Random Forest, XGBoost, and Logistic Regression—to automate candidate vetting with high accuracy and interpretability, reducing review time from days to seconds.
              </p>
              
              <Link
                to="/predict"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full text-white font-semibold transition-all shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
              >
                <span>Try Our Models</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="bg-gradient-to-b from-gray-900 to-black">
        <section className="py-20">
          <NotebookRun />
        </section>

        <section id="timeline" className="py-20">
          <Timeline />
        </section>

        <section id="dashboard" className="py-20">
          <Dashboard />
        </section>

        <section id="learn" className="py-20">
          <Learn />
        </section>
      </div>

      <Footer />
    </div>
  )
}