import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


const firebaseConfig = {
apiKey: "YOUR_FIREBASE_API_KEY",
databaseURL: "YOUR_DATABASE_URL",
projectId: "YOUR_PROJECT_ID"
};
const DISCORD_WEBHOOK = "YOUR_DISCORD_WEBHOOK";


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


function discordLog(title,msg){
fetch(DISCORD_WEBHOOK,{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({embeds:[{title,description:msg,color:0x00ffcc,timestamp:new Date()}]})});
}


window.adminLogin = async ()=>{
const s = await get(ref(db,"admins/"+aid.value));
if(!s.exists() || s.val().otp!==otp.value) return alert("Invalid OTP");
aname.innerText = "Admin: "+s.val().name;
login.classList.add("hide"); panel.classList.remove("hide");
await remove(ref(db,"admins/"+aid.value+"/otp"));
discordLog("🔐 Admin Login", s.val().name);
};


window.createUser = ()=>{
const exp = Math.floor(Date.now()/1000)+(d.value*86400);
set(ref(db,"users/"+u.value),{password:p.value,expire:exp,hwid:"",createdBy:aname.innerText});
discordLog("👤 User Created", u.value);
};


window.resetHWID = ()=>{
update(ref(db,"users/"+ru.value),{hwid:""});
discordLog("🔄 HWID Reset", ru.value);
};


window.deleteUser = async ()=>{
if(!confirm("Confirm delete")) return;
await remove(ref(db,"users/"+du.value));
discordLog("❌ User Deleted", du.value);
};


onValue(ref(db,"stats/online"),s=>online.innerText=s.val()||0);
