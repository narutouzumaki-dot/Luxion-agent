export function renderHome() {
 return `<div class="welcome"><span class="edition">HYPERVISION EDITION</span><h1>WELCOME TO <span>LUXION AI</span></h1><p>Your intelligent workspace. One powerful assistant.</p></div>
 <div class="core-wrap"><div class="core-ring r1"></div><div class="core-ring r2"></div><div class="core-ring r3"></div><div class="core">L</div></div>
 <div class="core-state"><span class="status-dot"></span> SYSTEM READY</div>
 <h3 class="section-heading">QUICK ACCESS</h3>
 <div class="action-grid">
 ${card("AI CHAT","Start a conversation","chat","message-square")}
 ${card("VOICE","Talk with LUXION","voice","audio-lines")}
 ${card("STUDY","Learn something new","study","graduation-cap")}
 ${card("CODING","Build your projects","coding","code-2")}
 ${card("FILES","Analyze documents","files","folder-open")}
 ${card("AI STUDIO","Creative workspace","studio","images")}
 </div>
 <div class="dashboard-extra">
 <div class="panel"><h3>Recent conversations</h3><p class="muted">Your saved chats will appear here on this device.</p></div>
 <div class="panel"><h3>System status</h3><p class="muted">Interface ready. AI backend connection must be configured separately.</p></div>
 </div>`;
}
function card(title,desc,page,icon){return `<button class="action-card" data-page="${page}"><strong>${title}</strong><small>${desc}</small></button>`;}
