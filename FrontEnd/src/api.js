// Determine API base URL based on environment
// const API_BASE = import.meta.env.VITE_API_BASE_URL ||
//   (import.meta.env.DEV
//     ? 'http://localhost:5000/api'
//     : 'https://exo-ml-production.up.railway.app/api');

const API_BASE = 'https://exo-ml-production.up.railway.app/api';

export async function listNotebooks() {
  const res = await fetch(`${API_BASE}/list-notebooks`);
  if (!res.ok) throw new Error(`Failed to list notebooks: ${res.statusText}`);
  return res.json();
}

export async function runNotebook(notebook, parameters = {}) {
  const res = await fetch(`${API_BASE}/run-notebook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notebook, parameters })
  });
  if (!res.ok) throw new Error(`Failed to run notebook: ${res.statusText}`);
  return res.json();
}

export async function predict(model, features, dataset = null) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model,
      dataset: dataset || model,
      features: features
    })
  });
  if (!res.ok) throw new Error(`Failed to predict: ${res.statusText}`);
  return res.json();
}

export async function getPredictions() {
  const res = await fetch(`${API_BASE}/predictions`);
  if (!res.ok) throw new Error(`Failed to get predictions: ${res.statusText}`);
  return res.json();
}

export async function getModelFeatures(modelName) {
  const res = await fetch(`${API_BASE}/model-features/${modelName}`);
  if (!res.ok) throw new Error(`Failed to get model features: ${res.statusText}`);
  return res.json();
}

export async function healthCheck() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return res.json();
}

// Export API_BASE for components that need it
export { API_BASE };
