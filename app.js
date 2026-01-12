import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, remove, onValue, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔴 YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Create user
window.createUser = async () => {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  await set(ref(db, "users/" + u), {
    password: p,
    hwid: "",
    created_by: "admin"
  });
  alert("User Created");
};

// Generate OTP
window.generateOTP = async () => {
  const otp = "ADMIN-" + Math.random().toString(36).substring(2,10);
  await set(ref(db, "admin_otps/" + otp), true);
  document.getElementById("otp").innerText = otp;
};

// Delete user
window.deleteUser = async () => {
  const delUser = document.getElementById("delUser").value;
  await remove(ref(db, "users/" + delUser));
  alert("User Deleted");
};

// Live user count
const liveRef = ref(db, "stats/online");
onValue(liveRef, snapshot => {
  document.getElementById("live").innerText = snapshot.val() || 0;
});
