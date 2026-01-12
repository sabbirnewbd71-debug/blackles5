import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgcOMktV2WUxwJoh0ySBPzfhwicxxb7sM",
  authDomain: "admin-4bc65.firebaseapp.com",
  projectId: "admin-4bc65"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function rand() {
  return Math.random().toString(36).substring(2,10).toUpperCase();
}

window.genKey = async () => {
  const k = "KEY-" + rand();
  await setDoc(doc(db,"licenses",k),{
    used:false,
    hwid:"",
    expire:document.getElementById("expire").value
  });
  document.getElementById("out").innerText = k;
};

window.genOTP = async () => {
  const o = Math.floor(100000+Math.random()*900000).toString();
  await setDoc(doc(db,"otps",o),{ used:false });
  alert("OTP: "+o);
};
