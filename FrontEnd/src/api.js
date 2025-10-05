const API_BASE = 'https://exo-ml-production.up.railway.app/api';

export async function listNotebooks() {
  const res = await fetch(`${API_BASE}/list-notebooks`);
  return res.json();
}

export async function runNotebook(notebook, parameters = {}) {
  const res = await fetch(`${API_BASE}/run-notebook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notebook, parameters })
  });
  return res.json();
}

export async function predict(model, input, notebook = null) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notebook, model, input })
  });
  return res.json();
}

export async function getPredictions() {
  const res = await fetch(`${API_BASE}/predictions`);
  return res.json();
}
