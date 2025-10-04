import React, { useState } from "react";
import { predict } from "../api";

export default function DataInput(){
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  async function handlePredict(e){
    e.preventDefault();
    // input expected as CSV line or JSON array
    let parsed;
    try{
      if(input.trim().startsWith("[")) parsed = JSON.parse(input);
      else parsed = input.split(",").map(s => parseFloat(s));
    }catch(err){
      alert("Invalid input format");
      return;
    }
    const res = await predict("CNN", parsed);
    setResult(res);
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#061020] p-6 rounded">
      <h3 className="text-2xl mb-2">Data Input & Prediction</h3>
      <form onSubmit={handlePredict}>
        <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="e.g. 0.1,0.2,0.3" className="w-full p-3 rounded bg-[#020617]" />
        <div className="mt-3">
          <button className="bg-blue-600 px-4 py-2 rounded">Predict</button>
        </div>
      </form>

      {result && (
        <div className="mt-4 bg-[#021424] p-3 rounded">
          <div>Probability: <strong>{result.probability}</strong></div>
          <div>Label: <strong>{result.label}</strong></div>
          <pre className="mt-2 text-xs">{JSON.stringify(result.raw, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
