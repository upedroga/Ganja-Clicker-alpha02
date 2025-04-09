let ganjas = 0;
let clickPower = 1;
let becks = 0, estufas = 0, fazendas = 0;
let gps = 0, totalUpgrades = 0, playTime = 0;
let musicOn = "true";


let becksCost = 50;
let estufaCost = 250;
let fazendaCost = 1000;


const saved = JSON.parse(localStorage.getItem("saveData"));
if (saved) {
  ganjas = saved.ganjas || 0;
  clickPower = saved.clickPower || 1;
  becks = saved.becks || 0;
  estufas = saved.estufas || 0;
  fazendas = saved.fazendas || 0;
  gps = saved.gps || 0;
  totalUpgrades = saved.totalUpgrades || 0;
  playTime = saved.playTime || 0;
  becksCost = saved.becksCost || 50;
  estufaCost = saved.estufaCost || 250;
  fazendaCost = saved.fazendaCost || 1000;
}

const counter = document.getElementById("counter");
const clickImg = document.getElementById("clickImg");
const clickPowerDisplay = document.getElementById("clickPower");
const gpsDisplay = document.getElementById("gps");

const buyBecks = document.getElementById("buyBecks");
const buyEstufa = document.getElementById("buyEstufa");
const buyFazenda = document.getElementById("buyFazenda");

const becksDisplay = document.getElementById("becks");
const estufaDisplay = document.getElementById("estufas");
const fazendaDisplay = document.getElementById("fazendas");

const becksCostDisplay = document.getElementById("becksCost");
const estufaCostDisplay = document.getElementById("estufaCost");
const fazendaCostDisplay = document.getElementById("fazendaCost");

const notification = document.getElementById("notification");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const resetBtn = document.getElementById("resetBtn");
const toggleMusicBtn = document.getElementById("toggleMusicBtn");
const saveBtn = document.getElementById("saveBtn");

const statsBtn = document.getElementById("statsBtn");
const statsModal = document.getElementById("statsModal");
const statsGps = document.getElementById("statsGps");
const playTimeDisplay = document.getElementById("playTime");
const totalUpgradesDisplay = document.getElementById("totalUpgrades");

const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.2;
bgMusic.play().catch(() => {});
toggleMusicBtn.textContent = "Desativar Música";

function updateMusicState() {
  if (musicOn === "true") {
    bgMusic.play().catch(() => {});
    toggleMusicBtn.textContent = "Desativar Música";
  } else {
    bgMusic.pause();
    toggleMusicBtn.textContent = "Ativar Música";
  }
}

toggleMusicBtn.addEventListener("click", () => {
  musicOn = musicOn === "true" ? "false" : "true";
  updateMusicState();
});

function updateDisplays() {
  counter.textContent = Math.floor(ganjas);
  clickPowerDisplay.textContent = clickPower.toFixed(1);
  gpsDisplay.textContent = gps.toFixed(2);

  becksDisplay.textContent = becks;
  estufaDisplay.textContent = estufas;
  fazendaDisplay.textContent = fazendas;

  becksCostDisplay.textContent = Math.floor(becksCost);
  estufaCostDisplay.textContent = Math.floor(estufaCost);
  fazendaCostDisplay.textContent = Math.floor(fazendaCost);

  statsGps.textContent = gps.toFixed(2);
  totalUpgradesDisplay.textContent = totalUpgrades;

  const d = Math.floor(playTime / 86400);
  const h = Math.floor((playTime % 86400) / 3600);
  const m = Math.floor((playTime % 3600) / 60);
  const s = playTime % 60;
  playTimeDisplay.textContent = `${d}d ${h}h ${m}m ${s}s`;

  document.getElementById("becksProd").textContent = `+${(becks * (0.1 + Math.floor(becks / 10) * 0.05)).toFixed(2)} GPS (${becks} unidades)`;
  document.getElementById("estufaProd").textContent = `+${(estufas * 0.25).toFixed(2)} GPS (${estufas} unidades)`;
  document.getElementById("fazendaProd").textContent = `+${(fazendas * 1.5).toFixed(2)} GPS (${fazendas} unidades)`;
}

function showNotification(text) {
  notification.textContent = text;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}

clickImg.addEventListener("click", () => {
  ganjas += clickPower;
  updateDisplays();
});

buyBecks.addEventListener("click", () => {
  if (ganjas >= becksCost) {
    ganjas -= becksCost;
    becks++;
    totalUpgrades++;
    gps += 0.1 + Math.floor(becks / 10) * 0.05;
    becksCost = Math.floor(becksCost * 1.15);
    showNotification("Becks comprado!");
    updateDisplays();
  } else {
    showNotification("Ganjas insuficientes!");
  }
});

buyEstufa.addEventListener("click", () => {
  if (ganjas >= estufaCost) {
    ganjas -= estufaCost;
    estufas++;
    totalUpgrades++;
    gps += 0.25;
    estufaCost = Math.floor(estufaCost * 1.15);
    showNotification("Estufa comprada!");
    updateDisplays();
  } else {
    showNotification("Ganjas insuficientes!");
  }
});

buyFazenda.addEventListener("click", () => {
  if (ganjas >= fazendaCost) {
    ganjas -= fazendaCost;
    fazendas++;
    totalUpgrades++;
    gps += 1.5;
    fazendaCost = Math.floor(fazendaCost * 1.15);
    showNotification("Fazenda comprada!");
    updateDisplays();
  } else {
    showNotification("Ganjas insuficientes!");
  }
});


setInterval(() => {
  ganjas += gps / 10;
  updateDisplays();
}, 100);


setInterval(() => {
  playTime++;
  updateDisplays();
}, 1000);


setInterval(() => {
  const save = {
    ganjas,
    clickPower,
    becks,
    estufas,
    fazendas,
    gps,
    totalUpgrades,
    playTime,
    becksCost,
    estufaCost,
    fazendaCost
  };
  localStorage.setItem("saveData", JSON.stringify(save));
}, 10000);


settingsBtn.addEventListener("click", () => {
  settingsModal.style.display = settingsModal.style.display === "block" ? "none" : "block";
  statsModal.style.display = "none";
});

statsBtn.addEventListener("click", () => {
  statsModal.style.display = statsModal.style.display === "block" ? "none" : "block";
  settingsModal.style.display = "none";
});

resetBtn.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja resetar seu progresso?")) {
    ganjas = 0;
    clickPower = 1;
    becks = 0;
    estufas = 0;
    fazendas = 0;
    gps = 0;
    totalUpgrades = 0;
    playTime = 0;
    becksCost = 50;
    estufaCost = 250;
    fazendaCost = 1000;
    localStorage.removeItem("saveData");
    updateDisplays();
    showNotification("Progresso resetado!");
  }
});

saveBtn.addEventListener("click", () => {
  const save = {
    ganjas,
    clickPower,
    becks,
    estufas,
    fazendas,
    gps,
    totalUpgrades,
    playTime,
    becksCost,
    estufaCost,
    fazendaCost
  };
  localStorage.setItem("saveData", JSON.stringify(save));
  showNotification("Progresso salvo!");
});
