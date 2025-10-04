import React, { useState } from "react";
import { predict } from "../api";

export default function PredictPage() {
    const [dataType, setDataType] = useState("csv");
    const [inputData, setInputData] = useState("");
    const [selectedModel, setSelectedModel] = useState("CNN");
    const [selectedDataset, setSelectedDataset] = useState("Kepler");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const models = ["CNN", "Random Forest", "SVM", "XGBoost"];
    const datasets = [
        { id: "Kepler_notebook.ipynb", name: "Kepler" },
        { id: "K2.ipynb", name: "K2" },
        { id: "Tess_Notebook.ipynb", name: "TESS" },
        { id: "Light_curve_notebook.ipynb", name: "Light Curve" }
    ];

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setInputData(event.target.result);
            };
            reader.readAsText(uploadedFile);
        }
    };

    const handlePredict = async () => {
        setLoading(true);
        setResult(null);

        try {
            let parsedData;
            if (dataType === "csv") {
                parsedData = inputData.split(",").map(s => parseFloat(s.trim()));
            } else if (dataType === "json") {
                parsedData = JSON.parse(inputData);
            } else {
                parsedData = inputData.split(/\s+/).map(s => parseFloat(s.trim()));
            }

            const res = await predict(selectedModel, parsedData, selectedDataset);
            setResult(res);
        } catch (err) {
            setResult({ error: "Invalid input format or prediction failed: " + err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                            EXOPLANET PREDICTION
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Upload your data or enter it manually to detect exoplanets using AI models
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Panel - Input Section */}
                    <div className="space-y-6">
                        {/* Dataset Selection */}
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Select Dataset</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {datasets.map((dataset) => (
                                    <button
                                        key={dataset.id}
                                        onClick={() => setSelectedDataset(dataset.id)}
                                        className={`p-4 rounded-xl border-2 transition-all ${selectedDataset === dataset.id
                                                ? "border-cyan-400 bg-cyan-400/10 text-white"
                                                : "border-white/20 bg-white/5 text-gray-400 hover:border-white/40"
                                            }`}
                                    >
                                        <div className="font-semibold">{dataset.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Model Selection */}
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Select Model</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {models.map((model) => (
                                    <button
                                        key={model}
                                        onClick={() => setSelectedModel(model)}
                                        className={`p-4 rounded-xl border-2 transition-all ${selectedModel === model
                                                ? "border-cyan-400 bg-cyan-400/10 text-white"
                                                : "border-white/20 bg-white/5 text-gray-400 hover:border-white/40"
                                            }`}
                                    >
                                        <div className="font-semibold">{model}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Data Input Type */}
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Data Input Type</h3>
                            <div className="flex space-x-3">
                                {["csv", "json", "text"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setDataType(type)}
                                        className={`flex-1 py-3 rounded-lg border-2 transition-all uppercase text-sm font-semibold ${dataType === type
                                                ? "border-cyan-400 bg-cyan-400/10 text-white"
                                                : "border-white/20 bg-white/5 text-gray-400 hover:border-white/40"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Upload File</h3>
                            <label className="block">
                                <div className="flex items-center justify-center w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-cyan-400 transition-all cursor-pointer group">
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-400">
                                            {file ? file.name : "Click to upload or drag and drop"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">CSV, JSON, or TXT files</p>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".csv,.json,.txt"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </div>

                        {/* Manual Input */}
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Or Enter Data Manually</h3>
                            <textarea
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                placeholder={
                                    dataType === "csv"
                                        ? "e.g., 0.1, 0.2, 0.3, 0.4, 0.5"
                                        : dataType === "json"
                                            ? 'e.g., [0.1, 0.2, 0.3, 0.4, 0.5]'
                                            : "e.g., 0.1 0.2 0.3 0.4 0.5"
                                }
                                className="w-full h-32 p-4 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono text-sm resize-none"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Enter your data in {dataType.toUpperCase()} format
                            </p>
                        </div>

                        {/* Predict Button */}
                        <button
                            onClick={handlePredict}
                            disabled={loading || !inputData}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Analyzing...</span>
                                </div>
                            ) : (
                                "Run Prediction"
                            )}
                        </button>
                    </div>

                    {/* Right Panel - Output Section */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl min-h-[600px]">
                            <h3 className="text-2xl font-bold text-white mb-6">Prediction Results</h3>

                            {!result ? (
                                <div className="flex flex-col items-center justify-center h-96 text-center">
                                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                        <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500">
                                        Run a prediction to see results here
                                    </p>
                                </div>
                            ) : result.error ? (
                                <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <h4 className="text-red-400 font-semibold mb-1">Error</h4>
                                            <p className="text-red-300 text-sm">{result.error}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Probability Score */}
                                    <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-gray-400 text-sm uppercase tracking-wider">Probability Score</h4>
                                            <span className="text-3xl font-bold text-white">{(result.probability * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${result.probability * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Classification */}
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                        <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-3">Classification</h4>
                                        <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${result.label === "Exoplanet"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                            }`}>
                                            {result.label}
                                        </div>
                                    </div>

                                    {/* Model Details */}
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                        <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-3">Model Information</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Model:</span>
                                                <span className="text-white font-semibold">{result.model || selectedModel}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Dataset:</span>
                                                <span className="text-white font-semibold">{datasets.find(d => d.id === selectedDataset)?.name}</span>
                                            </div>
                                            {result.raw?.confidence && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Confidence:</span>
                                                    <span className="text-white font-semibold">{(result.raw.confidence * 100).toFixed(2)}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Raw Output */}
                                    {result.raw && (
                                        <div className="p-6 bg-black/40 border border-white/10 rounded-xl">
                                            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-3">Raw Output</h4>
                                            <pre className="text-xs text-gray-300 overflow-x-auto font-mono whitespace-pre-wrap">
                                                {JSON.stringify(result.raw, null, 2)}
                                            </pre>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setResult(null)}
                                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white font-medium transition-all"
                                        >
                                            Clear Results
                                        </button>
                                        <button
                                            onClick={() => {
                                                const dataStr = JSON.stringify(result, null, 2);
                                                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                                                const url = URL.createObjectURL(dataBlob);
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.download = `exoml-prediction-${Date.now()}.json`;
                                                link.click();
                                            }}
                                            className="flex-1 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg text-cyan-400 font-medium transition-all"
                                        >
                                            Export Results
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
