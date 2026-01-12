import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
 getDatabase, ref, get, set, update
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
 apiKey: "YOUR_API_KEY",
 databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
 projectId: "YOUR_PROJECT"
};

const WEBHOOK = "YOUR_DISCORD_WEBHOOK_URL";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function discord(title,msg){
 fetch(WEBHOOK,{
  method:"POST",
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
   embeds:[{
    title:title,
    description:msg,
    color:0x5865F2,
    timestamp:new Date()
   }]
  })
 });
}

window.adminLogin = async ()=>{
 const s = await get(ref(db,"admins/"+aid.value));
 if(!s.exists()||s.val().otp!==otp.value) return alert("Invalid");

 adminName.innerText="Admin: "+s.val().name;
 login.classList.add("hidden");
 panel.classList.remove("hidden");

 discord("🔐 Admin Login",s.val().name);
};

window.createUser = ()=>{
 const exp=Math.floor(Date.now()/1000)+(d.value*86400);
 set(ref(db,"users/"+u.value),{
  password:p.value,
  expire:exp,
  hwid:"",
  admin:adminName.innerText
 });
 discord("👤 User Created",u.value);
};

window.resetHWID = ()=>{
 update(ref(db,"users/"+ru.value),{hwid:""});
 discord("🔄 HWID Reset",ru.value);
};
