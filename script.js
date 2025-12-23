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
  const split = 1400000;

  if (Math.random() < 0.98) {
    const t = Math.random() ** 2.5;
    return Math.floor(min + t * (Math.min(split, max) - min));
  }

  const t = Math.random() ** 4;
  return Math.floor(split + t * (max - split));
}

/* ===== QUAY ===== */
function start() {
  if (running) return;
  running = true;

  spin.pause();
  win.pause();
  spin.currentTime = 0;
  spin.play();

  interval = setInterval(() => {
    const fake = Math.floor(
      Math.random() * 1000000 + 1000000
    );
    num.innerText = fake.toLocaleString();
  }, 20);
}

/* ===== DỪNG ===== */
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
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(txt => console.log("Sheet:", txt))
  .catch(err => console.error("Sheet error:", err));
}

/* ===== SETTINGS ===== */
document.getElementById("bgInput").onchange = e => {
  const url = URL.createObjectURL(e.target.files[0]);
  document.body.style.backgroundImage = `url(${url})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
};

document.getElementById("spinInput").onchange = e => {
  spin.src = URL.createObjectURL(e.target.files[0]);
};

document.getElementById("winInput").onchange = e => {
  win.src = URL.createObjectURL(e.target.files[0]);
};
 <script>
    const container = document.querySelector('.container');
    function draw() {
      const e = document.createElement("div");
      e.classList.add("star");
      container.appendChild(e);
      
      // Sử dụng template literals đúng cách với backticks (`)
      e.style.left = `${Math.random() * window.innerWidth}px`;
      e.style.fontSize = `${Math.random() * 24}px`;
      e.style.animationDuration = `${6 + Math.random() * 3}s`;

      setTimeout(() => {
        container.removeChild(e);
      }, 15000);
    }

    setInterval(draw, 1);
</script>