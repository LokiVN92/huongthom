let running=false;
let interval;
let playerName="";

/* Firebase config */
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "https://xxx.firebaseio.com",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* DOM */
const num = document.getElementById("number");
const spin = document.getElementById("spin");
const win = document.getElementById("win");

/* RANDOM có tỷ lệ */
function weightedRandom(min,max){
  const split=1400000;
  if(Math.random()<0.98){ const t=Math.random()**2.5; return Math.floor(min+t*(Math.min(split,max)-min)); }
  const t=Math.random()**4;
  return Math.floor(split+t*(max-split));
}

/* QUAY */
function start(){
  const input = document.getElementById("playerName");
  if(!input.value.trim()){ alert("Nhập tên bạn trước khi quay!"); return; }
  playerName=input.value.trim();
  document.getElementById("nameInputContainer").style.display="none";

  running=true;
  spin.play();
  interval=setInterval(()=>{
    const fake=Math.floor(Math.random()*1000000+1000000);
    num.innerText=fake.toLocaleString();
  },60);
}

/* DỪNG */
function stop(){
  if(!running) return;
  running=false;
  clearInterval(interval);
  spin.pause();

  const result=weightedRandom(1000000,2000000);
  num.innerText=result.toLocaleString();

  win.currentTime=0;
  win.play();

  sendResult(result);
  showNotify(result);
}

/* SEND FIREBASE */
function sendResult(result){
  db.ref("results").push({
    name: playerName,
    number: result,
    time: new Date().toLocaleString(),
    ua: navigator.userAgent
  });
}

/* SHOW/HIDE NOTIFY */
function showNotify(result){
  const notify=document.getElementById("notify");
  document.getElementById("notify-number").innerText=result.toLocaleString();
  notify.style.display="flex";
}
function hideNotify(){ document.getElementById("notify").style.display="none"; }

/* SETTINGS */
document.getElementById("bgInput").onchange=e=>{
  const url=URL.createObjectURL(e.target.files[0]);
  document.body.style.backgroundImage=`url(${url})`;
};
document.getElementById("spinInput").onchange=e=>{
  spin.src=URL.createObjectURL(e.target.files[0]); spin.loop=true; spin.play();
};
document.getElementById("winInput").onchange=e=>{
  win.src=URL.createObjectURL(e.target.files[0]);
};

/* Rainbow Text */
const rainbowColors=["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#8B00FF"];
let rainbowIndex=0;
setInterval(()=>{
  const title=document.querySelector("#container h1");
  title.style.color=rainbowColors[rainbowIndex];
  num.style.color=rainbowColors[(rainbowIndex+3)%rainbowColors.length];
  rainbowIndex=(rainbowIndex+1)%rainbowColors.length;
},100);
