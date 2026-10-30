import { CONFIG } from "../config.js";

export async function apiRequest(path, body) {
  if (!CONFIG.API_BASE) {
    throw new Error("Backend is not connected yet. Set API_BASE in js/config.js after deploying your test Worker.");
  }
  const response = await fetch(`${CONFIG.API_BASE.replace(/\/$/, "")}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

export async function checkBackend() {
  if (!CONFIG.API_BASE) return false;
  try {
    const response = await fetch(`${CONFIG.API_BASE.replace(/\/$/, "")}/api/health`);
    return response.ok;
  } catch { return false; }
}