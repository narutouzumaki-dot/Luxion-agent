import { apiRequest } from "../core/api.js";
import { loadState, saveState } from "../core/storage.js";
export function renderChat(){return `<div class="chat-layout"><div class="chat-head"><strong>LUXION AI CHAT</strong><p>Messages are saved in this browser. Connect the Worker to enable AI replies.</p></div><div class="chat-messages" id="chatMessages"><div class="message assistant">Hello. I'm LUXION AI. Connect the backend to start real AI conversations.</div></div><form class="chat-composer" id="chatForm"><textarea id="chatInput" aria-label="Message" placeholder="Message LUXION..." required></textarea><button type="submit" aria-label="Send"><i data-lucide="send"></i></button></form><div class="chat-note">Do not enter passwords, private keys or sensitive personal information.</div></div>`;}
export function initChat(){
 const form=document.querySelector("#chatForm"), input=document.querySelector("#chatInput"), box=document.querySelector("#chatMessages");
 if(!form)return;
 const state=loadState(); let current=state.conversations[0]||{id:Date.now(),messages:[]};
 if(!state.conversations.length){state.conversations.unshift(current);saveState(state);}
 current.messages.forEach(m=>append(m.role,m.text));
 form.addEventListener("submit",async e=>{
  e.preventDefault();const text=input.value.trim();if(!text)return;input.value="";
  current.messages.push({role:"user",text});append("user",text);saveState(state);
  const pending=append("assistant","Thinking…");
  try{const result=await apiRequest("/api/chat",{message:text,history:current.messages.slice(-12)});pending.textContent=result.text||"The AI returned an empty response.";current.messages.push({role:"assistant",text:pending.textContent});}
  catch(err){pending.textContent=`Connection error: ${err.message}`;}
  saveState(state);box.scrollTop=box.scrollHeight;
 });
 function append(role,text){const el=document.createElement("div");el.className=`message ${role}`;el.textContent=text;box.append(el);box.scrollTop=box.scrollHeight;return el;}
}
