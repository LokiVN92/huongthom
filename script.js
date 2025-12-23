let running = false;
let interval;

const num = document.getElementById("number");
const spin = document.getElementById("spin");
const win = document.getElementById("win");

/* GOOGLE SHEET URL */
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzQ0LdUuAsGhU2slQ_FyQuqKdgg-fcXCre8bAFXMQ7DyA3ndgs6-3B2Aijuo9C-BRFG/exec";

/* RANDOM CÓ TỶ LỆ */
function weightedRandom(min, max) {
  const split = 1400000;
  if (Math.random() < 0.98) {
    const t = Math.random() ** 2.5;
    return Math.floor(min + t * (Math.min(split, max) - min));
  }
  const t = Math.random() ** 4;
  return Math.floor(split + t * (max - split));
}

/* NHẠC QUAY AUTO KHI LOAD WEB */
window.addEventListener("load", () => {
  spin.loop = true;
  spin.play().catch(() => {
    console.log("Browser yêu cầu tương tác để play nhạc. Bấm quay sẽ tự động play.");
  });
});

/* QUAY */
function start() {
  if (running) return;
  running = true;
  spin.play();
  interval = setInterval(() => {
    const fake = Math.floor(Math.random() * 1000000 + 1000000);
    num.innerText = fake.toLocaleString();
  }, 60);
}

/* DỪNG */
function stop() {
  if (!running) return;
  running = false;
  clearInterval(interval);
  spin.pause();

  const result = weightedRandom(1000000, 2000000);
  num.innerText = result.toLocaleString();

  win.currentTime = 0;
  win.play();

  sendToSheet(result);
  showNotify(result);
}

/* GỬI GOOGLE SHEET */
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

/* HIỂN THỊ NOTIFY */
function showNotify(result) {
  const notify = document.getElementById("notify");
  const notifyNum = document.getElementById("notify-number");
  notifyNum.innerText = result.toLocaleString();
  notify.style.display = "flex";

  setTimeout(() => {
    notify.style.display = "none";
  }, 3000);
}

/* SETTINGS */
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

/* RAINBOW TEXT */
const rainbowColors = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#8B00FF"];
let rainbowIndex = 0;

function rainbowText() {
  const title = document.querySelector("#container h1");
  title.style.color = rainbowColors[rainbowIndex];
  num.style.color = rainbowColors[(rainbowIndex + 3) % rainbowColors.length];
  rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
}

setInterval(rainbowText, 100);
