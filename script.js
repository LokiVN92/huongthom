// 🔥 FIREBASE CONFIG
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

// ===== BIẾN =====
let player = "";
let running = false;
let timer = null;
let result = 0;

const spinMusic = document.getElementById("spinMusic");
const winMusic = document.getElementById("winMusic");

// ===== NHẬP TÊN =====
function confirmName() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return alert("Nhập tên trước nha!");

  if (confirm("Bạn có phải là " + name + " ?")) {
    player = name;
    document.getElementById("nameBox").classList.add("hidden");
    document.getElementById("gameBox").classList.remove("hidden");
  }
}

// ===== RANDOM CÓ TỶ LỆ (SỐ NHỎ RA NHIỀU HƠN)
// ===== 4 SỐ CUỐI LUÔN = 8386
function weightedRandom() {
  const min = 1000000;
  const max = 2000000;
  const pivot = 1400000;

  let r = Math.random();
  let baseNumber;

  if (r < 0.98) {
    // 98% nghiêng mạnh về số nhỏ
    baseNumber = Math.floor(
      min + Math.pow(Math.random(), 2.5) * (pivot - min)
    );
  } else {
    // 2% cho vùng số lớn
    baseNumber = Math.floor(
      pivot + Math.pow(Math.random(), 4) * (max - pivot)
    );
  }

  // Ép 4 số cuối = 8386
  return Math.floor(baseNumber / 10000) * 10000 + 8386;
}

// ===== START =====
function start() {
  if (running) return;
  running = true;

  spinMusic.currentTime = 0;
  spinMusic.play().catch(() => {});

  timer = setInterval(() => {
    document.getElementById("number").innerText =
      weightedRandom().toLocaleString();
  }, 60);
}

// ===== STOP =====
function stop() {
  if (!running) return;
  running = false;

  clearInterval(timer);
  spinMusic.pause();

  result = weightedRandom();
  document.getElementById("number").innerText = result.toLocaleString();

  winMusic.currentTime = 0;
  winMusic.play().catch(() => {});

  sendResult();
  showPopup();
}

// ===== GỬI FIREBASE =====
function sendResult() {
  db.ref("results").push({
    name: player,
    number: result,
    time: new Date().toLocaleString(),
    device: navigator.userAgent
  });
}

// ===== POPUP =====
function showPopup() {
  document.getElementById("popupText").innerText =
    `CHÚC MỪNG EM YÊU 💖\n\nĐÃ QUAY ĐƯỢC\n${result.toLocaleString()}`;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("number").innerText = "------";
  winMusic.pause();
}
