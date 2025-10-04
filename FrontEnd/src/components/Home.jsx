import React from 'react'
import DatasetSelector from './DatasetSelector'
import DataInput from './DataInput'
import NotebookRun from './NotebookRun'
import Timeline from './Timeline'
import Dashboard from './Dashboard'
import Learn from './Learn'
import Footer from './Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ExoML
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          AI-Powered Platform for Exoplanet Detection using Kepler & TESS Data
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#predict" className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition">
            Get Started
          </a>
          <a href="#learn" className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition">
            Learn More
          </a>
        </div>
      </section>

      {/* Main Components */}
      <div className="space-y-20 py-10">
        <section id="datasets">
          <DatasetSelector />
        </section>
        
        <section id="predict">
          <DataInput />
        </section>

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