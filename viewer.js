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

db.ref("results").on("value", snap => {
  const list = document.getElementById("list");
  list.innerHTML = "";

  snap.forEach(item => {
    const d = item.val();
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${d.name}</b> — ${d.number}<br>
      ⏰ ${d.time}<hr>
    `;
    list.prepend(li);
  });
});
