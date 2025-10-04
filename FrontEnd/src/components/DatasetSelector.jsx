import React, { useState } from "react";

const DATASETS = [
  { id: "Kepler_notebook.ipynb", title: "Kepler" },
  { id: "K2_notebook.ipynb", title: "K2" },
  { id: "Tess_Notebook.ipynb", title: "TESS" },
  { id: "Light_Curve_notebook.ipynb", title: "Light Curve" },
];

export default function DatasetSelector(){
  const [selected, setSelected] = useState(DATASETS[0].id);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl mb-4">Dataset & Model Selection</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {DATASETS.map(ds => (
          <div key={ds.id} className={`p-6 rounded-lg bg-[#081225] hover:shadow-lg transition`}>
            <h3 className="font-semibold text-cyan-300">{ds.title}</h3>
            <p className="text-gray-400 mt-2">Use ML models trained on {ds.title} data.</p>
            <div className="mt-4">
              <input type="radio" name="dataset" value={ds.id} checked={selected===ds.id} onChange={()=>setSelected(ds.id)} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button className="bg-cyan-500 px-5 py-2 rounded">Run Model (selected: {selected})</button>
      </div>
    </div>
  );
}
