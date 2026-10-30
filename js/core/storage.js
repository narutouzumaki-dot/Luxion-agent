import { CONFIG } from "../config.js";
export function loadState() {
  try { return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)) || { conversations: [], memories: [] }; }
  catch { return { conversations: [], memories: [] }; }
}
export function saveState(state) { localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state)); }
