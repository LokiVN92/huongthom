// 🔥 FIREBASE CONFIG (CỦA BẠN)
const firebaseConfig = {
  apiKey: "AIzaSyDaYssLoPgeyBzzBwq7DK2R-dG3uHlhp7M",
  authDomain: "lucthom19989.firebaseapp.com",
  databaseURL: "https://lucthom19989-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lucthom19989",
  storageBucket: "lucthom19989.firebasestorage.app",
  messagingSenderId: "355426108698",
  appId: "1:355426108698:web:65f928b571d9f09a93d8a3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ================= GAME =================
let player = "";
let running = false;
let timer = null;
let result = 0;

const spinMusic = document.getElementById("spinMusic");
const winMusic = document.getElementById("winMusic");

function confirmName() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return alert("Nhập tên!");

  if (confirm("Bạn có phải là: " + name + " ?")) {
    player = name;
    document.getElementById("nameBox").classList.add("hidden");
    document.getElementById("gameBox").classList.remove("hidden");
    spinMusic.play();
  }
}

function weightedRandom() {
  let min = 1000000;
  let max = 2000000;
  let r = Math.random();

  if (r < 0.98) {
    return Math.floor(min + Math.random() ** 2.5 * (1400000 - min));
  }
  return Math.floor(1400000 + Math.random() ** 4 * (max - 1400000));
}

function start() {
  if (running) return;
  running = true;
  spinMusic.currentTime = 0;
  spinMusic.play();

  timer = setInterval(() => {
    document.getElementById("number").innerText =
      weightedRandom().toLocaleString();
  }, 60);
}

function stop() {
  if (!running) return;
  running = false;
  clearInterval(timer);

  spinMusic.pause();
  winMusic.play();

  result = weightedRandom();
  document.getElementById("number").innerText = result.toLocaleString();

  sendResult();
  showPopup();
}

function sendResult() {
  db.ref("results").push({
    name: player,
    number: result,
    time: new Date().toLocaleString(),
    device: navigator.userAgent
  });
}

function showPopup() {
  document.getElementById("popupText").innerText =
    `CHÚC MỪNG ${player} ĐÃ QUAY ĐƯỢC\n${result.toLocaleString()}`;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}
