/******** FIREBASE ********/
firebase.initializeApp({
  apiKey: "AIzaSyDaYssLoPgeyBzzBwq7DKR-dG3uHlhp7M",
  authDomain: "lucthom19989.firebaseapp.com",
  databaseURL: "https://lucthom19989-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lucthom19989"
});

const db = firebase.database();

/******** STATE ********/
let timer = null;
let currentNumber = 0;
let playerName = "";

/******** RANDOM: SỐ NHỎ RA NHIỀU ********/
function weightedRandom() {
  const min = 1000000;
  const max = 2000000;

  // càng lớn → số lớn càng hiếm
  const exponent = 3.2;

  const r = Math.random();
  const biased = Math.pow(r, exponent);

  return Math.floor(min + biased * (max - min));
}

/******** NAME ********/
function confirmName() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) {
    alert("Em chưa nhập tên 💖");
    return;
  }

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
     Em đã quay được:<br>
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

/******** FIREBASE ********/
function sendResult() {
  db.ref("results").push({
    name: playerName,
    number: currentNumber,
    time: new Date().toLocaleString("vi-VN"),
    device: navigator.userAgent
  });
}