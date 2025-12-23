let running = false;
let interval;

const num = document.getElementById("number");
const spin = document.getElementById("spin");
const win = document.getElementById("win");

/* ===== GOOGLE SHEET URL ===== */
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzQ0LdUuAsGhU2slQ_FyQuqKdgg-fcXCre8bAFXMQ7DyA3ndgs6-3B2Aijuo9C-BRFG/exec";

/* ===== RANDOM CÓ TỶ LỆ ===== */
function weightedRandom(min, max) {
  const split = 2000000;
  if (Math.random() < 0.5) {
    const t = Math.random() ** 2.5;
    return Math.floor(min + t * (Math.min(split, max) - min));
  }
  const t = Math.random() ** 4;
  return Math.floor(split + t * (max - split));
}

/* ===== TỰ ĐỘNG PHÁT NHẠC QUAY KHI LOAD WEB ===== */
window.addEventListener("load", () => {
  spin.loop = true;
  spin.play().catch(() => {
    console.log("Browser yêu cầu tương tác để play nhạc. Bấm quay sẽ tự động play.");
  });
});

/* ===== QUAY ===== */
function start() {
  if (running) return;
  running = true;

  spin.play(); // play nhạc quay

  interval = setInterval(() => {
    const fake = Math.floor(Math.random() * 1000000 + 1000000);
    num.innerText = fake.toLocaleString();
  }, 60);
}

/* ===== DỪNG ===== */
function stop() {
  if (!running) return;
  running = false;

  clearInterval(interval);
  spin.pause(); // ngắt nhạc quay

  const result = weightedRandom(1000000, 2000000);
  num.innerText = result.toLocaleString();

  win.currentTime = 0;
  win.play(); // play nhạc thắng

  sendToSheet(result);
}

/* ===== GỬI GOOGLE SHEET ===== */
function sendToSheet(result) {
  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({
      time: new Date().toLocaleString(),
      result: result,
      ua: navigator.userAgent
    }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(txt => console.log("Sheet:", txt))
  .catch(err => console.error("Sheet error:", err));
}

/* ===== SETTINGS (thay đổi nhạc & background trực tiếp) ===== */
document.getElementById("bgInput").onchange = e => {
  const url = URL.createObjectURL(e.target.files[0]);
  document.body.style.backgroundImage = `url(${url})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
};

document.getElementById("spinInput").onchange = e => {
  spin.src = URL.createObjectURL(e.target.files[0]);
  spin.loop = true;
  spin.play();
};

document.getElementById("winInput").onchange = e => {
  win.src = URL.createObjectURL(e.target.files[0]);
};
/* ===== HIỆU ỨNG CHỮ NHIỀU MÀU ===== */
const rainbowColors = [
  "#FF0000", "#FF7F00", "#FFFF00", "#00FF00",
  "#0000FF", "#4B0082", "#8B00FF"
];

let rainbowIndex = 0;

function rainbowText() {
  // Thay đổi màu tiêu đề
  const title = document.querySelector("#container h1");
  title.style.color = rainbowColors[rainbowIndex];

  // Thay đổi màu chữ số
  num.style.color = rainbowColors[(rainbowIndex + 3) % rainbowColors.length];

  rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
}

// Chạy liên tục mỗi 100ms
setInterval(rainbowText, 100);