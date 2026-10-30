const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json",...corsHeaders}});}
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(request.method==="OPTIONS")return new Response(null,{headers:corsHeaders});
  if(url.pathname==="/api/health"&&request.method==="GET")return json({ok:true,service:"LUXION Worker",time:new Date().toISOString()});
  if(url.pathname==="/api/chat"&&request.method==="POST"){
   if(!env.GEMINI_API_KEY)return json({error:"Worker secret GEMINI_API_KEY is not configured."},503);
   let body;try{body=await request.json();}catch{return json({error:"Invalid JSON body."},400);}
   const message=typeof body.message==="string"?body.message.trim():"";
   if(!message)return json({error:"Message is required."},400);
   if(message.length>12000)return json({error:"Message is too long."},413);
   const history=Array.isArray(body.history)?body.history.slice(-12):[];
   const contents=history.filter(m=>["user","assistant"].includes(m.role)&&typeof m.text==="string").map(m=>({role:m.role==="assistant"?"model":"user",parts:[{text:m.text.slice(0,12000)}]}));
   if(!contents.length||contents[contents.length-1].role!=="user")contents.push({role:"user",parts:[{text:message}]});
   const model=env.GEMINI_MODEL||"gemini-2.5-flash";
   const endpoint=`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;
   try{
    const upstream=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents,generationConfig:{temperature:0.7,maxOutputTokens:2048}})});
    const result=await upstream.json();
    if(!upstream.ok)return json({error:result.error?.message||"Gemini request failed."},upstream.status);
    const text=result.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();
    if(!text)return json({error:"Gemini returned no text."},502);
    return json({text});
   }catch{return json({error:"Could not reach Gemini service."},502);}
  }
  return json({error:"Route not found."},404);
 }
};