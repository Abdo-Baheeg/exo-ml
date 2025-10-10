// Dashboard.jsx
// Plotly charts: probability histogram, label distribution pie, model counts bar.
// Place in frontend/src/components/

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

  // derived data
  const probs = preds.map((p) => (p.probability !== null ? Number(p.probability) : 0));
  const labelCounts = preds.reduce((acc, p) => {
    acc[p.label] = (acc[p.label] || 0) + 1;
    return acc;
  }, {});
  const modelCounts = preds.reduce((acc, p) => {
    acc[p.model] = (acc[p.model] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(labelCounts);
  const labelValues = labels.map((k) => labelCounts[k]);

  const models = Object.keys(modelCounts);
  const modelValues = models.map((k) => modelCounts[k]);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Insights Dashboard</h2>

      {loading ? (
        <div className="p-6 bg-[#07121b] rounded">Loading predictions...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Probability histogram */}
            <div className="bg-[#06101a] p-4 rounded">
              <h3 className="font-semibold mb-2">Probability distribution</h3>
              <Plot
                data={[
                  {
                    x: probs,
                    type: "histogram",
                    nbinsx: 20,
                    marker: { color: "#00d4ff" },
                  },
                ]}
                layout={{
                  autosize: true,
                  margin: { t: 30, l: 40, r: 10, b: 40 },
                  xaxis: { title: "Probability" },
                  yaxis: { title: "Count" },
                  paper_bgcolor: "rgba(0,0,0,0)",
                  plot_bgcolor: "rgba(0,0,0,0)",
                }}
                useResizeHandler
                style={{ width: "100%", height: "320px" }}
              />
            </div>

            {/* Label distribution */}
            <div className="bg-[#06101a] p-4 rounded">
              <h3 className="font-semibold mb-2">Label distribution</h3>
              {labels.length === 0 ? (
                <div className="text-gray-400">No predictions yet.</div>
              ) : (
                <Plot
                  data={[
                    {
                      labels,
                      values: labelValues,
                      type: "pie",
                      hole: 0.4,
                      marker: { colors: ["#00d4ff", "#805ad5", "#ff7ab6", "#ffd166"] },
                    },
                  ]}
                  layout={{
                    margin: { t: 10, l: 10, r: 10, b: 10 },
                    paper_bgcolor: "rgba(0,0,0,0)",
                    plot_bgcolor: "rgba(0,0,0,0)",
                    showlegend: true,
                  }}
                  useResizeHandler
                  style={{ width: "100%", height: "320px" }}
                />
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Model counts */}
            <div className="bg-[#06101a] p-4 rounded">
              <h3 className="font-semibold mb-2">Predictions by Model</h3>
              {models.length === 0 ? (
                <div className="text-gray-400">No model data yet.</div>
              ) : (
                <Plot
                  data={[
                    {
                      x: models,
                      y: modelValues,
                      type: "bar",
                      marker: { color: "#7c3aed" },
                    },
                  ]}
                  layout={{
                    margin: { t: 30, l: 40, r: 10, b: 40 },
                    xaxis: { title: "Model" },
                    yaxis: { title: "Count" },
                    paper_bgcolor: "rgba(0,0,0,0)",
                    plot_bgcolor: "rgba(0,0,0,0)",
                  }}
                  useResizeHandler
                  style={{ width: "100%", height: "320px" }}
                />
              )}
            </div>

            {/* Recent predictions table */}
            <div className="bg-[#06101a] p-4 rounded overflow-auto">
              <h3 className="font-semibold mb-2">Recent Predictions</h3>
              {preds.length === 0 ? (
                <div className="text-gray-400">No records yet.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-300">
                      <th className="pb-2">Time</th>
                      <th className="pb-2">Dataset</th>
                      <th className="pb-2">Model</th>
                      <th className="pb-2">Prob</th>
                      <th className="pb-2">Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preds.slice(0, 12).map((p) => (
                      <tr key={p.id} className="border-t border-gray-800">
                        <td className="py-2">{p.created_at ? new Date(p.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}</td>
                        <td className="py-2">{p.dataset || p.notebook || 'N/A'}</td>
                        <td className="py-2">{p.model}</td>
                        <td className="py-2">{Number(p.probability).toFixed(3)}</td>
                        <td className="py-2">{p.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>


        </>
      )}
    </div>
  );
}
