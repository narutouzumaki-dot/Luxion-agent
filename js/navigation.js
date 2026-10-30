export function setupNavigation(onNavigate){
 const sidebar=document.querySelector("#sidebar"),backdrop=document.querySelector("#sidebarBackdrop");
 const close=()=>{sidebar.classList.remove("open");backdrop.classList.remove("show");};
 document.querySelector("#menuBtn").addEventListener("click",()=>{sidebar.classList.add("open");backdrop.classList.add("show");});
 backdrop.addEventListener("click",close);
 document.querySelectorAll("[data-page]").forEach(btn=>btn.addEventListener("click",()=>{onNavigate(btn.dataset.page);close();}));
 document.querySelector("#newChatBtn").addEventListener("click",()=>{onNavigate("chat");close();});
}
