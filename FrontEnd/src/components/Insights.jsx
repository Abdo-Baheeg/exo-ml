import React, { useState } from "react";
import Footer from "./Footer";

export default function Insights() {
  const [activeTab, setActiveTab] = useState("datasets");

  const datasets = [
    {
      name: "Kepler",
      icon: "🔭",
      color: "from-blue-500 to-cyan-500",
      stats: {
        totalObjects: "34,032",
        confirmedPlanets: "2,662",
        candidates: "2,420",
        falsePositives: "3,277",
        duration: "2009-2018",
        coverage: "150,000 stars"
      },
      features: [
        "High-precision photometry",
        "Long-term continuous observations",
        "Deep field single pointing",
        "0.1° field of view",
        "30-minute cadence"
      ],
      insights: "Kepler revolutionized exoplanet science by staring at a single patch of sky for 9 years, discovering that planets are more common than stars in our galaxy."
    },
    {
      name: "K2",
      icon: "🛰️",
      color: "from-purple-500 to-pink-500",
      stats: {
        totalObjects: "6,341",
        confirmedPlanets: "479",
        candidates: "889",
        falsePositives: "1,121",
        duration: "2014-2018",
        coverage: "Multiple fields"
      },
      features: [
        "Extended Kepler mission",
        "Different sky fields every 80 days",
        "Broader stellar diversity",
        "Younger star systems",
        "Ecliptic plane coverage"
      ],
      insights: "K2 extended Kepler's legacy by observing multiple fields, discovering planets around diverse stellar types including young and active stars."
    },
    {
      name: "TESS",
      icon: "🌍",
      color: "from-orange-500 to-red-500",
      stats: {
        totalObjects: "7,000+",
        confirmedPlanets: "400+",
        candidates: "6,000+",
        falsePositives: "Variable",
        duration: "2018-Present",
        coverage: "200,000+ stars"
      },
      features: [
        "All-sky survey mission",
        "Nearby bright stars focus",
        "2-minute & 30-minute cadence",
        "85% sky coverage",
        "Follow-up friendly targets"
      ],
      insights: "TESS surveys the entire sky to find planets around the nearest and brightest stars, ideal for atmospheric characterization with JWST."
    }
  ];

  const models = [
    {
      name: "Random Forest",
      type: "Ensemble Learning",
      icon: "🌲",
      color: "from-green-500 to-emerald-500",
      performance: {
        accuracy: "96.2%",
        precision: "94.8%",
        recall: "95.1%",
        f1Score: "94.9%",
        trainingTime: "~15 min"
      },
      strengths: [
        "Excellent feature importance analysis",
        "Handles non-linear relationships",
        "Robust to outliers",
        "Minimal hyperparameter tuning",
        "Good generalization"
      ],
      useCase: "Best for understanding which stellar features matter most in planet detection",
      features: "Uses orbital period, planet radius, stellar temperature, and stellar mass as key predictors"
    },
    {
      name: "XGBoost",
      type: "Gradient Boosting",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
      performance: {
        accuracy: "97.1%",
        precision: "96.3%",
        recall: "96.8%",
        f1Score: "96.5%",
        trainingTime: "~20 min"
      },
      strengths: [
        "Highest overall accuracy",
        "Excellent for imbalanced data",
        "Built-in regularization",
        "Feature importance ranking",
        "Handles missing values"
      ],
      useCase: "Optimal for maximizing detection accuracy with complex feature interactions",
      features: "Leverages boosting to correct errors iteratively, excels at catching subtle patterns"
    },
    {
      name: "Logistic Regression",
      type: "Linear Model",
      icon: "📊",
      color: "from-blue-500 to-indigo-500",
      performance: {
        accuracy: "89.3%",
        precision: "87.2%",
        recall: "88.5%",
        f1Score: "87.8%",
        trainingTime: "~2 min"
      },
      strengths: [
        "Fast training and inference",
        "Highly interpretable",
        "Clear probability outputs",
        "Low computational cost",
        "Baseline performance"
      ],
      useCase: "Ideal for quick initial screening and understanding linear relationships",
      features: "Provides clear probability scores and coefficient-based feature interpretation"
    }
  ];

  const comparisons = [
    {
      metric: "Best Accuracy",
      winner: "XGBoost",
      value: "97.1%",
      description: "Highest overall classification accuracy across all test sets"
    },
    {
      metric: "Most Interpretable",
      winner: "Random Forest",
      value: "Feature Rankings",
      description: "Clearest insights into which features drive predictions"
    },
    {
      metric: "Fastest Training",
      winner: "Logistic Regression",
      value: "~2 minutes",
      description: "Quickest to train on large datasets"
    },
    {
      metric: "Best Balance",
      winner: "Random Forest",
      value: "96.2% / Interpretable",
      description: "Optimal trade-off between performance and interpretability"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full text-sm text-cyan-400 font-medium">
              📊 DATA & MODEL INSIGHTS
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Deep Dive Into Our Data & Models
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore comprehensive statistics, model performance metrics, and insights from NASA's exoplanet missions
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("datasets")}
              className={`py-4 px-2 font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === "datasets"
                  ? "border-cyan-500 text-cyan-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              📡 Datasets
            </button>
            <button
              onClick={() => setActiveTab("models")}
              className={`py-4 px-2 font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === "models"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              🤖 Models
            </button>
            <button
              onClick={() => setActiveTab("comparison")}
              className={`py-4 px-2 font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === "comparison"
                  ? "border-green-500 text-green-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              ⚖️ Comparison
            </button>
          </div>
        </div>
      </section>

      {/* Datasets Tab */}
      {activeTab === "datasets" && (
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {datasets.map((dataset, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${dataset.color} rounded-t-2xl`}></div>
                  
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="text-6xl">{dataset.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-2">{dataset.name} Mission</h3>
                      <p className="text-gray-400 text-lg leading-relaxed">{dataset.insights}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {Object.entries(dataset.stats).map(([key, value], i) => (
                      <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${dataset.color} bg-clip-text text-transparent mb-1`}>
                          {value}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
                      {dataset.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                          <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Models Tab */}
      {activeTab === "models" && (
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map((model, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${model.color} rounded-t-2xl`}></div>
                  
                  {/* Icon & Name */}
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">{model.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-1">{model.name}</h3>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">{model.type}</p>
                  </div>

                  {/* Performance Metrics */}
                  <div className="mb-6 p-4 bg-white/5 rounded-xl">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Performance</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(model.performance).map(([key, value], i) => (
                        <div key={i}>
                          <div className={`text-xl font-bold bg-gradient-to-r ${model.color} bg-clip-text text-transparent`}>
                            {value}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Strengths</h4>
                    <div className="space-y-2">
                      {model.strengths.map((strength, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-300">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Use Case */}
                  <div className="p-4 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 rounded-xl">
                    <h4 className="text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">Best Use Case</h4>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">{model.useCase}</p>
                    <p className="text-xs text-gray-500 italic">{model.features}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Tab */}
      {activeTab === "comparison" && (
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Winner Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {comparisons.map((comp, idx) => (
                <div
                  key={idx}
                  className="relative p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl hover:border-green-500/50 transition-all"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{comp.metric}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          {comp.winner}
                        </span>
                        <span className="text-sm text-gray-400">• {comp.value}</span>
                      </div>
                      <p className="text-sm text-gray-400">{comp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Comparison Table */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-2xl font-bold text-white">Detailed Performance Comparison</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Metric</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-green-400 uppercase tracking-wider">Random Forest</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-yellow-400 uppercase tracking-wider">XGBoost</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-blue-400 uppercase tracking-wider">Logistic Reg.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">Accuracy</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">96.2%</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">97.1% 🏆</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">89.3%</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">Precision</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">94.8%</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">96.3% 🏆</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">87.2%</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">Recall</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">95.1%</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">96.8% 🏆</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">88.5%</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">F1-Score</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">94.9%</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">96.5% 🏆</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">87.8%</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">Training Time</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">~15 min</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">~20 min</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">~2 min 🏆</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">Interpretability</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">High 🏆</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">Medium</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-white">Very High 🏆</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-12 p-8 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Our Recommendation</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We recommend using <span className="text-cyan-400 font-semibold">Random Forest</span> for production deployment due to its excellent balance of accuracy (96.2%), interpretability, and robustness. While XGBoost achieves slightly higher accuracy (97.1%), Random Forest provides clearer feature importance insights crucial for scientific validation.
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    For rapid prototyping and baseline testing, Logistic Regression remains valuable due to its 2-minute training time and high interpretability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
