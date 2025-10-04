import React, { useState } from "react";
import { runNotebook } from "../api";

const NOTEBOOK_OPTIONS = [
  "Kepler_notebook.ipynb",
  "K2.ipynb",
  "Tess_Notebook.ipynb",
  "Light_curve_notebook.ipynb"
];

export default function NotebookRun() {
  const [selectedNotebook, setSelectedNotebook] = useState(NOTEBOOK_OPTIONS[0]);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunNotebook = async () => {
    setLoading(true);
    setOutput(null);

    try {
      const result = await runNotebook(selectedNotebook, {});
      setOutput(result);
    } catch (error) {
      setOutput({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Run Jupyter Notebooks</h2>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Notebook
          </label>
          <select
            value={selectedNotebook}
            onChange={(e) => setSelectedNotebook(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {NOTEBOOK_OPTIONS.map(notebook => (
              <option key={notebook} value={notebook}>{notebook}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleRunNotebook}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Running Notebook..." : `Run ${selectedNotebook}`}
        </button>

        {output && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-cyan-500">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Execution Output</h3>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              {JSON.stringify(output, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}