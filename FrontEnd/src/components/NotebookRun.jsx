import React, { useState, useEffect } from "react";
import { runNotebook, listNotebooks } from "../api";

export default function NotebookRun() {
  const [notebooks, setNotebooks] = useState([
    "Kepler_Exoplanet_Modeling_FlaskReady.ipynb",
    "K2_Exoplanet_Modeling_FlaskReady.ipynb",
    "TESS_Exoplanet_Modeling_FlaskReady.ipynb"
  ]);
  const [selectedNotebook, setSelectedNotebook] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingNotebooks, setLoadingNotebooks] = useState(true);

  useEffect(() => {
    // Try to fetch notebooks from backend
    const fetchNotebooks = async () => {
      try {
        const result = await listNotebooks();
        if (result.notebooks && result.notebooks.length > 0) {
          setNotebooks(result.notebooks);
          setSelectedNotebook(result.notebooks[0]);
        } else {
          setSelectedNotebook(notebooks[0]);
        }
      } catch (error) {
        // Fallback to default notebooks list
        setSelectedNotebook(notebooks[0]);
      } finally {
        setLoadingNotebooks(false);
      }
    };

    fetchNotebooks();
  }, []);

  const handleRunNotebook = async () => {
    if (!selectedNotebook) {
      setOutput({ error: "Please select a notebook first" });
      return;
    }

    setLoading(true);
    setOutput(null);

    try {
      const result = await runNotebook(selectedNotebook, {
        // Add any necessary parameters for running the notebook here
        
      });
      setOutput(result);
    } catch (error) {
      setOutput({ error: error.message || "Failed to execute notebook" });
    } finally {
      setLoading(false);
    }
  };

  const getNotebookDisplayName = (filename) => {
    return filename
      .replace("_Exoplanet_Modeling_FlaskReady.ipynb", "")
      .replace(/_/g, " ");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-sm text-purple-400 font-medium">
            🔬 INTERACTIVE NOTEBOOKS
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Run Jupyter Notebooks
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Execute machine learning notebooks for Kepler, K2, and TESS datasets directly from your browser
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 shadow-2xl">
        {loadingNotebooks ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Loading notebooks...</p>
          </div>
        ) : (
          <>
            {/* Notebook Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Select Dataset Notebook
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notebooks.map((notebook) => (
                  <button
                    key={notebook}
                    onClick={() => setSelectedNotebook(notebook)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedNotebook === notebook
                        ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                        : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedNotebook === notebook ? "bg-purple-500/20" : "bg-white/5"
                      }`}>
                        <svg className={`w-6 h-6 ${
                          selectedNotebook === notebook ? "text-purple-400" : "text-gray-400"
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${
                          selectedNotebook === notebook ? "text-white" : "text-gray-300"
                        }`}>
                          {getNotebookDisplayName(notebook)}
                        </div>
                        <div className="text-xs text-gray-500">Modeling Notebook</div>
                      </div>
                      {selectedNotebook === notebook && (
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunNotebook}
              disabled={loading || !selectedNotebook}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-semibold text-white transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Executing Notebook...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Run {selectedNotebook ? getNotebookDisplayName(selectedNotebook) : "Notebook"}</span>
                </>
              )}
            </button>

            {/* Output Section */}
            {output && (
              <div className="mt-8 animate-fadeIn">
                <div className={`p-6 rounded-xl border-2 ${
                  output.error 
                    ? "bg-red-500/5 border-red-500/30" 
                    : output.success 
                    ? "bg-green-500/5 border-green-500/30" 
                    : "bg-blue-500/5 border-blue-500/30"
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    {output.error ? (
                      <>
                        <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-red-300">Execution Error</h3>
                      </>
                    ) : output.success ? (
                      <>
                        <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-green-300">Execution Successful</h3>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-blue-300">Execution Output</h3>
                      </>
                    )}
                  </div>

                  {/* Display instructions if available */}
                  {output.instructions && (
                    <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold text-yellow-300 mb-2">Setup Required:</p>
                          <p className="text-sm text-gray-300 mb-2">{output.message}</p>
                          <div className="bg-black/40 rounded px-3 py-2 font-mono text-sm text-yellow-200">
                            {output.instructions}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Output content */}
                  {(output.stdout || output.stderr || output.error) && (
                    <div className="bg-black/40 rounded-lg p-4 max-h-96 overflow-auto">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                        {output.message && !output.instructions && (
                          <div className="text-yellow-300 mb-2">⚠️ {output.message}\n\n</div>
                        )}
                        {output.error && typeof output.error === 'string'
                          ? output.error 
                          : output.stderr 
                          ? output.stderr 
                          : output.stdout
                          ? output.stdout
                          : JSON.stringify(output, null, 2)
                        }
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-gray-400">
                  <p className="font-semibold text-blue-300 mb-1">Note:</p>
                  <p>Notebook execution may take several minutes depending on the dataset size and computational complexity. The backend must be running for this feature to work.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}