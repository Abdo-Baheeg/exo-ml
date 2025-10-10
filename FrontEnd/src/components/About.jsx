import React from "react";
import Footer from "./Footer";

export default function About() {
  const team = [
    {
      name: "Abdelrahman Ghazy",
      role: "Machine Learning Engineer",
      color: "from-cyan-500 to-blue-500",
      photo: "/images/abdelrahman_ghazy.jpg",
      contributions: ["Model architecture design", "XGBoost implementation", "Performance optimization"],
      skills: ["Python", "XGBoost", "Scikit-learn"]
    },
    {
      name: "Zeyad Ahmed",
      role: "Data Engineer",
      color: "from-purple-500 to-pink-500",
      photo: "/images/zeyad_ahmed.jpg",
      contributions: ["Data preprocessing pipeline", "Feature engineering", "Statistical analysis"],
      skills: ["Pandas", "NumPy", "Data Cleaning"]
    },
    {
      name: "Aly Mahmoud",
      role: "Machine Learning Engineer",
      color: "from-green-500 to-emerald-500",
      photo: "/images/aly_mahmoud.jpg",
      contributions: ["Random Forest implementation", "Model evaluation", "Hyperparameter tuning"],
      skills: ["Python", "Machine Learning", "Model Optimization"]
    },
    {
      name: "Abdelrahman Adel",
      role: "Data Analyst",
      color: "from-orange-500 to-red-500",
      photo: "/images/abdelrahman_adel.jpg",
      contributions: ["Exploratory data analysis", "Feature selection", "Data visualization"],
      skills: ["Python", "Statistics", "Visualization"]
    },
    {
      name: "Omar Marey",
      role: "Backend Developer",
      color: "from-yellow-500 to-orange-500",
      photo: "/images/omar_marey.jpg",
      contributions: ["Flask API development", "Database integration", "Notebook execution system"],
      skills: ["Flask", "Python", "REST APIs"]
    },
    {
      name: "Abdelrahman Bahig",
      role: "Frontend Developer",
      color: "from-blue-500 to-indigo-500",
      photo: "/images/abdelrahman_bahig.jpg",
      contributions: ["React UI development", "Interactive visualizations", "User experience design"],
      skills: ["React", "Tailwind CSS", "JavaScript"]
    }
  ];

  

  const technologies = [
    { name: "Python", icon: "🐍", category: "Backend" },
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Flask", icon: "🌶️", category: "Backend" },
    { name: "Scikit-learn", icon: "🤖", category: "ML" },
    { name: "XGBoost", icon: "⚡", category: "ML" },
    { name: "Pandas", icon: "🐼", category: "Data" },
    { name: "Tailwind CSS", icon: "🎨", category: "Frontend" },
    { name: "Jupyter", icon: "📓", category: "Data" }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full text-sm text-cyan-400 font-medium">
              👥 MEET THE TEAM
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              About ExoML
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A collaborative research project combining machine learning and astronomy to advance exoplanet detection and validation
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mb-6">
              To democratize exoplanet detection by developing accessible, interpretable machine learning tools that assist astronomers in validating planetary candidates from NASA's space telescope missions.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-white mb-2">Accuracy</h3>
                <p className="text-sm text-gray-400">96%+ classification accuracy across all datasets</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-bold text-white mb-2">Interpretability</h3>
                <p className="text-sm text-gray-400">Clear feature importance for scientific validation</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-lg font-bold text-white mb-2">Efficiency</h3>
                <p className="text-sm text-gray-400">Reduce manual review from days to seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The Team</h2>
            <p className="text-gray-400 text-lg">Six passionate individuals dedicated to advancing exoplanet science</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group relative p-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${member.color} rounded-t-2xl`}></div>
                
                {/* Photo */}
                <div className="mb-6 flex justify-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-cyan-500/50 transition-all duration-300">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center text-4xl font-bold text-white">
                            ${member.name.charAt(0)}
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>

                {/* Name and Role */}
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className={`text-sm font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent uppercase tracking-wider`}>
                    {member.role}
                  </p>
                </div>

                {/* Contributions */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Key Contributions</h4>
                  <div className="space-y-2">
                    {member.contributions.map((contribution, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-300">{contribution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-medium rounded-lg border border-white/10 text-gray-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Technologies */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technologies Used</h2>
            <p className="text-gray-400 text-lg">Modern tools powering our exoplanet detection system</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="group p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all text-center"
              >
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-400 uppercase tracking-wider">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Interested in collaborating or learning more about our research? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/zeyadahmedh/Exoplanets-Detection-Using-Machine-Learning"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full text-white font-semibold transition-all shadow-lg shadow-cyan-500/50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
