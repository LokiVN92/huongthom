/******** FIREBASE ********/
firebase.initializeApp({
  apiKey: "AIzaSyDaYssLoPgeyBzzBwq7DKR-dG3uHlhp7M",
  authDomain: "lucthom19989.firebaseapp.com",
  databaseURL: "https://lucthom19989-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lucthom19989",
});

const db = firebase.database();

/******** GAME ********/
let timer = null;
let currentNumber = 0;
let playerName = "";

/******** RANDOM ********/
function weightedRandom() {
  const r = Math.random();
  if (r < 0.6) return rand(1000000, 1300000);
  if (r < 0.9) return rand(1300001, 1600000);
  return rand(1600001, 2000000);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/******** NAME ********/
function confirmName() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return alert("Em chưa nhập tên 💖");

  if (confirm("Bạn có phải là " + name + " không?")) {
    playerName = name;
    document.getElementById("nameBox").classList.add("hidden");
    document.getElementById("gameBox").classList.remove("hidden");
  }
}

/******** START ********/
function start() {
  if (timer) return;

  stopMusic();
  const spin = document.getElementById("spinMusic");
  spin.currentTime = 0;
  spin.play().catch(()=>{});

  timer = setInterval(() => {
    currentNumber = weightedRandom();
    document.getElementById("number").innerText =
      currentNumber.toLocaleString("vi-VN");
  }, 60);
}

/******** STOP ********/
function stop() {
  if (!timer) return;

  clearInterval(timer);
  timer = null;

  stopMusic();
  const win = document.getElementById("winMusic");
  win.currentTime = 0;
  win.play().catch(()=>{});

  showPopup();
  sendResult();
}

/******** POPUP ********/
function showPopup() {
  document.getElementById("popupText").innerHTML =
    `🎉 CHÚC MỪNG ${playerName}<br><br>
     Em đã nhận được:<br>
     <span style="font-size:32px;color:#ff0080">
     ${currentNumber.toLocaleString("vi-VN")}
     </span>`;

  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

/******** MUSIC ********/
function stopMusic() {
  document.getElementById("spinMusic").pause();
  document.getElementById("winMusic").pause();
}

/******** FIREBASE SEND ********/
function sendResult() {
  db.ref("results").push({
    name: playerName,
    number: currentNumber,
    time: new Date().toLocaleString("vi-VN"),
    device: navigator.userAgent
  });
}
