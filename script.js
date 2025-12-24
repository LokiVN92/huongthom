// 🔥 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaYssLoPgeyBzzBwq7DKR-dG3uHlhp7M",
  authDomain: "lucthom19989.firebaseapp.com",
  databaseURL: "https://lucthom19989-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lucthom19989",
  storageBucket: "lucthom19989.appspot.com",
  messagingSenderId: "355426108698",
  appId: "1:355426108698:web:65f928b571d9f09a93d8a3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let timer = null;
let current = 0;
let player = "";

function weightedRandom() {
  const r = Math.random();
  if (r < 0.6) return rand(1_000_000, 1_300_000);
  if (r < 0.9) return rand(1_300_001, 1_600_000);
  return rand(1_600_001, 2_000_000);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.confirmName = () => {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return alert("Nhập tên trước nha 💖");

  if (confirm(`Bạn có phải là ${name} không?`)) {
    player = name;
    document.getElementById("nameBox").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
  }
};

window.start = () => {
  document.getElementById("number").classList.remove("glow");
  if (timer) return;

  timer = setInterval(() => {
    current = weightedRandom();
    document.getElementById("number").innerText =
      current.toLocaleString("vi-VN");
  }, 60);
};

window.stop = () => {
  if (!timer) return;
  clearInterval(timer);
  timer = null;

  const numberEl = document.getElementById("number");
  numberEl.classList.add("glow");

  document.getElementById("finalNumber").innerText =
    current.toLocaleString("vi-VN");

  document.getElementById("popup").classList.remove("hidden");

  push(ref(db, "results"), {
    name: player,
    result: current,
    time: new Date().toLocaleString("vi-VN"),
    device: navigator.userAgent
  });
};

window.closePopup = () => {
  document.getElementById("popup").classList.add("hidden");
};
