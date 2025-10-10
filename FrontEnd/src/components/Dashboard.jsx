// Dashboard.jsx
// Enhanced dashboard with comprehensive visualizations and analytics
// Plotly charts: probability histogram, label distribution pie, model performance bar, timeline

import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getPredictions } from "../api";

export default function Dashboard() {
  const [preds, setPreds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPredictions()
      .then((data) => {
        setPreds(data.predictions || []);
      })
      .catch((err) => {
        // Error loading predictions - handle silently
        setPreds([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Derived data - probability distribution
  const probs = preds.map((p) => (p.probability !== null ? Number(p.probability) : 0));
  
  // Label distribution
  const labelCounts = preds.reduce((acc, p) => {
    acc[p.label] = (acc[p.label] || 0) + 1;
    return acc;
  }, {});
  const labels = Object.keys(labelCounts);
  const labelValues = labels.map((k) => labelCounts[k]);

  // Model usage statistics
  const modelCounts = preds.reduce((acc, p) => {
    acc[p.model] = (acc[p.model] || 0) + 1;
    return acc;
  }, {});
  const models = Object.keys(modelCounts);
  const modelValues = models.map((k) => modelCounts[k]);

  // Dataset distribution
  const datasetCounts = preds.reduce((acc, p) => {
    const dataset = p.dataset || p.notebook || 'Unknown';
    acc[dataset] = (acc[dataset] || 0) + 1;
    return acc;
  }, {});
  const datasets = Object.keys(datasetCounts);
  const datasetValues = datasets.map((k) => datasetCounts[k]);

  // Model performance by dataset (average probability as proxy for confidence)
  const modelPerformance = {};
  preds.forEach(p => {
    const key = `${p.model}_${p.dataset || p.notebook || 'Unknown'}`;
    if (!modelPerformance[key]) {
      modelPerformance[key] = { sum: 0, count: 0, model: p.model, dataset: p.dataset || p.notebook };
    }
    modelPerformance[key].sum += Number(p.probability || 0);
    modelPerformance[key].count += 1;
  });

  // Timeline data - predictions over time
  const timelinePreds = [...preds]
    .filter(p => p.created_at)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  
  const timelineData = timelinePreds.map(p => ({
    x: new Date(p.created_at),
    y: Number(p.probability),
    model: p.model,
    dataset: p.dataset || p.notebook,
    label: p.label
  }));

  // Summary statistics
  const totalPredictions = preds.length;
  const avgProbability = probs.length > 0 ? (probs.reduce((a, b) => a + b, 0) / probs.length * 100).toFixed(1) : 0;
  const exoplanetCandidates = preds.filter(p => p.label && p.label.toLowerCase().includes('exoplanet')).length;
  const falsePositives = preds.filter(p => p.label && p.label.toLowerCase().includes('false')).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Analytics Dashboard
        </h2>
        <p className="text-gray-400">Comprehensive insights from prediction history</p>
      </div>

      {loading ? (
        <div className="p-8 bg-[#07121b] rounded-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      ) : preds.length === 0 ? (
        <div className="p-12 bg-[#07121b] rounded-xl text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Data Yet</h3>
          <p className="text-gray-500">Make some predictions to see analytics here</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20">
              <div className="text-xs text-cyan-400 uppercase mb-1">Total Predictions</div>
              <div className="text-3xl font-bold text-white">{totalPredictions}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20">
              <div className="text-xs text-green-400 uppercase mb-1">Exoplanet Candidates</div>
              <div className="text-3xl font-bold text-white">{exoplanetCandidates}</div>
            </div>
            <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 p-6 rounded-xl border border-red-500/20">
              <div className="text-xs text-red-400 uppercase mb-1">False Positives</div>
              <div className="text-3xl font-bold text-white">{falsePositives}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
              <div className="text-xs text-purple-400 uppercase mb-1">Avg Confidence</div>
              <div className="text-3xl font-bold text-white">{avgProbability}%</div>
            </div>
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Probability Distribution */}
            <div className="bg-[#06101a] p-6 rounded-xl border border-gray-800">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Confidence Distribution
              </h3>
              <Plot
                data={[
                  {
                    x: probs,
                    type: "histogram",
                    nbinsx: 20,
                    marker: { 
                      color: "#00d4ff",
                      line: { color: "#0099cc", width: 1 }
                    },
                    hovertemplate: 'Probability: %{x:.2f}<br>Count: %{y}<extra></extra>'
                  },
                ]}
                layout={{
                  autosize: true,
                  margin: { t: 10, l: 50, r: 20, b: 50 },
                  xaxis: { title: "Prediction Probability", gridcolor: "#1a2332", color: "#9ca3af" },
                  yaxis: { title: "Frequency", gridcolor: "#1a2332", color: "#9ca3af" },
                  paper_bgcolor: "rgba(0,0,0,0)",
                  plot_bgcolor: "rgba(0,0,0,0)",
                  font: { color: "#9ca3af" }
                }}
                useResizeHandler
                style={{ width: "100%", height: "300px" }}
                config={{ displayModeBar: false }}
              />
            </div>

            {/* Label Distribution Pie */}
            <div className="bg-[#06101a] p-6 rounded-xl border border-gray-800">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                Classification Results
              </h3>
              {labels.length === 0 ? (
                <div className="text-gray-400 text-center py-12">No classification data</div>
              ) : (
                <Plot
                  data={[
                    {
                      labels,
                      values: labelValues,
                      type: "pie",
                      hole: 0.4,
                      marker: { 
                        colors: ["#00d4ff", "#805ad5", "#ff7ab6", "#ffd166"],
                        line: { color: "#0a1420", width: 2 }
                      },
                      textinfo: "label+percent",
                      textfont: { color: "#ffffff" },
                      hovertemplate: '%{label}<br>%{value} predictions (%{percent})<extra></extra>'
                    },
                  ]}
                  layout={{
                    autosize: true,
                    margin: { t: 10, l: 10, r: 10, b: 10 },
                    paper_bgcolor: "rgba(0,0,0,0)",
                    plot_bgcolor: "rgba(0,0,0,0)",
                    showlegend: true,
                    legend: { font: { color: "#9ca3af" }, orientation: "h", y: -0.1 }
                  }}
                  useResizeHandler
                  style={{ width: "100%", height: "300px" }}
                  config={{ displayModeBar: false }}
                />
              )}
            </div>

            {/* Model Usage Bar Chart */}
            <div className="bg-[#06101a] p-6 rounded-xl border border-gray-800">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Model Usage
              </h3>
              {models.length === 0 ? (
                <div className="text-gray-400 text-center py-12">No model data</div>
              ) : (
                <Plot
                  data={[
                    {
                      x: models,
                      y: modelValues,
                      type: "bar",
                      marker: { 
                        color: "#7c3aed",
                        line: { color: "#5b21b6", width: 1 }
                      },
                      hovertemplate: '%{x}<br>%{y} predictions<extra></extra>'
                    },
                  ]}
                  layout={{
                    autosize: true,
                    margin: { t: 10, l: 50, r: 20, b: 80 },
                    xaxis: { 
                      title: "Model", 
                      gridcolor: "#1a2332", 
                      color: "#9ca3af",
                      tickangle: -45
                    },
                    yaxis: { title: "Count", gridcolor: "#1a2332", color: "#9ca3af" },
                    paper_bgcolor: "rgba(0,0,0,0)",
                    plot_bgcolor: "rgba(0,0,0,0)",
                    font: { color: "#9ca3af" }
                  }}
                  useResizeHandler
                  style={{ width: "100%", height: "300px" }}
                  config={{ displayModeBar: false }}
                />
              )}
            </div>

            {/* Dataset Distribution */}
            <div className="bg-[#06101a] p-6 rounded-xl border border-gray-800">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Dataset Usage
              </h3>
              {datasets.length === 0 ? (
                <div className="text-gray-400 text-center py-12">No dataset data</div>
              ) : (
                <Plot
                  data={[
                    {
                      x: datasets,
                      y: datasetValues,
                      type: "bar",
                      marker: { 
                        color: "#fbbf24",
                        line: { color: "#f59e0b", width: 1 }
                      },
                      hovertemplate: '%{x}<br>%{y} predictions<extra></extra>'
                    },
                  ]}
                  layout={{
                    autosize: true,
                    margin: { t: 10, l: 50, r: 20, b: 80 },
                    xaxis: { 
                      title: "Dataset", 
                      gridcolor: "#1a2332", 
                      color: "#9ca3af",
                      tickangle: -45
                    },
                    yaxis: { title: "Count", gridcolor: "#1a2332", color: "#9ca3af" },
                    paper_bgcolor: "rgba(0,0,0,0)",
                    plot_bgcolor: "rgba(0,0,0,0)",
                    font: { color: "#9ca3af" }
                  }}
                  useResizeHandler
                  style={{ width: "100%", height: "300px" }}
                  config={{ displayModeBar: false }}
                />
              )}
            </div>
          </div>

          {/* Timeline Chart */}
          {timelineData.length > 0 && (
            <div className="bg-[#06101a] p-6 rounded-xl border border-gray-800 mb-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Prediction Timeline
              </h3>
              <Plot
                data={[
                  {
                    x: timelineData.map(d => d.x),
                    y: timelineData.map(d => d.y),
                    type: "scatter",
                    mode: "markers+lines",
                    marker: { 
                      color: timelineData.map(d => d.label && d.label.toLowerCase().includes('exoplanet') ? '#00d4ff' : '#ff7ab6'),
                      size: 8,
                      line: { color: '#ffffff', width: 1 }
                    },
                    line: { color: '#4a5568', width: 1 },
                    hovertemplate: '<b>%{x|%b %d, %H:%M}</b><br>Probability: %{y:.2%}<extra></extra>'
                  }
                ]}
                layout={{
                  autosize: true,
                  margin: { t: 10, l: 50, r: 20, b: 80 },
                  xaxis: { 
                    title: "Time", 
                    gridcolor: "#1a2332", 
                    color: "#9ca3af",
                    tickangle: -45
                  },
                  yaxis: { 
                    title: "Confidence", 
                    gridcolor: "#1a2332", 
                    color: "#9ca3af",
                    tickformat: ".0%"
                  },
                  paper_bgcolor: "rgba(0,0,0,0)",
                  plot_bgcolor: "rgba(0,0,0,0)",
                  font: { color: "#9ca3af" }
                }}
                useResizeHandler
                style={{ width: "100%", height: "300px" }}
                config={{ displayModeBar: false }}
              />
            </div>
          )}

          {/* Recent Predictions Table */}
          <div className="bg-[#06101a] p-6 rounded-xl border border-gray-800">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Predictions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Dataset</th>
                    <th className="pb-3 font-medium">Model</th>
                    <th className="pb-3 font-medium">Confidence</th>
                    <th className="pb-3 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {preds.slice(0, 15).map((p) => (
                    <tr key={p.id} className="border-t border-gray-800 hover:bg-white/5 transition-colors">
                      <td className="py-3 text-gray-300">
                        {p.created_at ? new Date(p.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs">
                          {p.dataset || p.notebook || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 text-gray-300">{p.model}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 max-w-[100px] bg-gray-800 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${Number(p.probability) * 100}%` }}
                            />
                          </div>
                          <span className="text-gray-300 text-xs">{(Number(p.probability) * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          p.label && p.label.toLowerCase().includes('exoplanet')
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {p.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

