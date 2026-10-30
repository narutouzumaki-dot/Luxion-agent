export function renderModule(page){
 const data={
 tools:["AI TOOLS","Utilities and AI workflows will be added when their real providers are connected.","Available starter: prompt drafting in the AI Chat module."],
 study:["STUDY MODE","Learn concepts, revise topics and practice step by step.","Use this workspace to prepare a learning question."],
 coding:["CODING LAB","Code assistance is available through AI Chat after the backend is connected.","Code execution is intentionally not enabled. Never run untrusted code on the main server."],
 files:["FILE MANAGER","Select a local text file to preview its contents in this browser.","Cloud file storage and AI document analysis are not connected yet."],
 studio:["AI STUDIO","Creative tools require a supported generation provider.","No fake image, video or audio generation is shown."],
 gallery:["GALLERY","Generated assets will appear here after a real creative provider is integrated.","No generated assets yet."],
 research:["WEB RESEARCH","Research requires a search provider or an explicitly connected browsing service.","This starter does not claim to browse websites."],
 history:["CONVERSATION HISTORY","Your chat history is saved locally in this browser.","Cross-device sync will require authentication and database integration."],
 memory:["LUXION MEMORY","Manage notes stored locally on this device.","Do not save sensitive information here."],
 settings:["SETTINGS","Configure the app and backend connection.","Backend URL is configured in js/config.js."]
 };
 const [title,desc,note]=data[page]||data.tools;
 if(page==="files")return `<div class="module-header"><h1>${title}</h1><p>${desc}</p></div><div class="panel"><input id="localFile" type="file" class="field" accept=".txt,.md,.json,.csv,.html,.css,.js"><pre id="filePreview" class="code-output" style="margin-top:15px">Choose a text file to preview it locally.</pre></div>`;
 if(page==="memory")return `<div class="module-header"><h1>${title}</h1><p>${desc}</p></div><div class="panel module-form"><textarea id="memoryInput" class="field" placeholder="Write a non-sensitive note..."></textarea><button id="saveMemory" class="primary-button">Save note</button><div id="memoryList"></div></div>`;
 if(page==="settings")return `<div class="module-header"><h1>${title}</h1><p>${desc}</p></div><div class="panel"><p>${note}</p><p style="margin-top:12px">Edit <code>API_BASE</code> in <code>js/config.js</code> after deploying your test Worker.</p><button id="checkApi" class="secondary-button" style="margin-top:15px">Check backend</button><p id="apiResult" class="muted" style="margin-top:10px"></p></div>`;
 return `<div class="module-header"><h1>${title}</h1><p>${desc}</p></div><div class="module-grid"><div class="panel"><h3>Workspace</h3><p class="muted">${note}</p></div><div class="panel"><h3>Next step</h3><p class="muted">The interface is ready for a tested integration. See README.md for setup instructions.</p></div></div>`;
}
export function initGeneric(page){
 if(page==="files"){document.querySelector("#localFile")?.addEventListener("change",async e=>{const f=e.target.files?.[0];if(!f)return;const text=await f.text();document.querySelector("#filePreview").textContent=text.slice(0,20000);});}
 if(page==="memory"){const key="luxion_local_notes";const list=document.querySelector("#memoryList");const draw=()=>{const notes=JSON.parse(localStorage.getItem(key)||"[]");list.innerHTML=notes.map((n,i)=>`<div class="panel" style="margin-top:8px">${escapeHtml(n)} <button data-delete="${i}" class="secondary-button">Delete</button></div>`).join("")||'<p class="muted">No notes saved.</p>';list.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>{const a=JSON.parse(localStorage.getItem(key)||"[]");a.splice(+b.dataset.delete,1);localStorage.setItem(key,JSON.stringify(a));draw();});};document.querySelector("#saveMemory").onclick=()=>{const v=document.querySelector("#memoryInput").value.trim();if(!v)return;const a=JSON.parse(localStorage.getItem(key)||"[]");a.push(v);localStorage.setItem(key,JSON.stringify(a));document.querySelector("#memoryInput").value="";draw();};draw();}
 if(page==="settings"){document.querySelector("#checkApi")?.addEventListener("click",async()=>{const el=document.querySelector("#apiResult");try{const {checkBackend}=await import("../core/api.js");el.textContent=await checkBackend()?"Backend is reachable.":"Backend is not configured or unreachable.";}catch{el.textContent="Backend check failed.";}});}
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
