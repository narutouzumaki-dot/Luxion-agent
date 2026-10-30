import { setupNavigation } from "./navigation.js";
import { renderHome } from "./modules/home.js";
import { renderChat, initChat } from "./modules/chat.js";
import { renderVoice, initVoice } from "./modules/voice.js";
import { renderModule, initGeneric } from "./modules/generic.js";
const workspace=document.querySelector("#workspace"),title=document.querySelector("#pageTitle");
const titles={home:"Home",chat:"AI Chat",voice:"Voice Assistant",tools:"AI Tools",files:"Files",study:"Study Mode",coding:"Coding Lab",studio:"AI Studio",gallery:"Gallery",research:"Web Research",history:"History",memory:"Memory",settings:"Settings"};
function navigate(page){if(!titles[page])page="home";title.textContent=titles[page];document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));workspace.innerHTML=page==="home"?renderHome():page==="chat"?renderChat():page==="voice"?renderVoice():renderModule(page);if(page==="chat")initChat();if(page==="voice")initVoice();if(!["home","chat","voice"].includes(page))initGeneric(page);if(window.lucide)window.lucide.createIcons();workspace.focus();history.replaceState(null,"",`#${page}`);}
setupNavigation(navigate);
document.querySelector("#searchBtn").addEventListener("click",()=>{const q=prompt("Search within LUXION (local chat search will be added later):");if(q)alert("Search is not implemented yet.");});
document.querySelector("#themeBtn").addEventListener("click",()=>document.body.classList.toggle("high-contrast"));
if("serviceWorker"in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
navigate(location.hash.slice(1)||"home");
