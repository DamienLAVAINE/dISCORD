const tracks = [
  { name: "66", file: "audio/66 V4.mp3", duration: "4:06" },
  { name: "66 avec bass Dam 20.01.26 +10dB", file: "audio/66 avec bass Dam 20.01.26 +10dB.mp3", duration: "4:05" },
  { name: "67 V1", file: "audio/67 V1.mp3", duration: "2:56" },
  { name: "68 V0", file: "audio/68 V0.mp3", duration: "2:54" },
  { name: "69 V0", file: "audio/69 V0.mp3", duration: "2:58" },
  { name: "70 V0 chant", file: "audio/70 V0 chant.mp3", duration: "2:49" },
  { name: "74 V0", file: "audio/74 V0.mp3", duration: "0:41" },
  { name: "76 V0", file: "audio/76 V0.mp3", duration: "3:57" },
  { name: "77 V0", file: "audio/77 V0.mp3", duration: "2:21" },
  { name: "80 v5", file: "audio/80 v5.mp3", duration: "4:00" },
  { name: "81 v3", file: "audio/81 v3.mp3", duration: "4:13" },
  { name: "83 V0", file: "audio/83 V0.mp3", duration: "3:57" },
  { name: "84 V0", file: "audio/84 V0.mp3", duration: "2:30" },
  { name: "86 v6 ", file: "audio/86 v6 .mp3", duration: "3:31" },
  { name: "87 v3", file: "audio/87 v3.mp3", duration: "3:39" },
  { name: "88 v1", file: "audio/88 v1.mp3", duration: "3:16" },
  { name: "90 V2 maquette", file: "audio/90 V2 maquette.mp3", duration: "2:35" },
  { name: "91", file: "audio/91.mp3", duration: "3:48" },

   
];


let current = 0;
let repeatMode = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playlistDiv = document.getElementById("playlist");
const searchInput = document.getElementById("search");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const progressHandle = document.getElementById("progress-handle");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let isDragging = false;

/* -------------------------
   BUILD PLAYLIST SIDEBAR
--------------------------*/
tracks.forEach((t, i) => {
  const div = document.createElement("div");

  div.className = "track";
  div.innerText = t.name;

  div.onclick = () => playTrack(i);

  div.id = "track-" + i;

  playlistDiv.appendChild(div);
});

/* -------------------------
   PLAYER CONTROLS
--------------------------*/
function playTrack(i) {
  current = i;

  audio.src = tracks[i].file;

  title.innerText = tracks[i].name;

  // retire ancienne sélection
  document.querySelectorAll(".track").forEach(track => {
    track.classList.remove("active");
  });

  // sélection active
  const activeTrack = document.getElementById("track-" + i);

  activeTrack.classList.add("active");

  // scroll automatique
  activeTrack.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  audio.play();
}

function playPause() {
  if (!audio.src) {
    playTrack(current);
    return;
  }

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextTrack() {
  current = (current + 1) % tracks.length;
  playTrack(current);
}

function prevTrack() {
  current = (current - 1 + tracks.length) % tracks.length;
  playTrack(current);
}

function skip(seconds) {

  audio.currentTime += seconds;

  // sécurité
  if (audio.currentTime < 0) {
    audio.currentTime = 0;
  }

  if (audio.currentTime > audio.duration) {
    audio.currentTime = audio.duration;
  }
}

audio.addEventListener("ended", () => {

  if (repeatMode) {

    audio.currentTime = 0;
    audio.play();

  } else {

    nextTrack();

  }

});

function toggleRepeat() {

  repeatMode = !repeatMode;

  const btn = document.getElementById("repeat-btn");

  if (repeatMode) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
}

/* -------------------------
   PLAYLIST DURATION
--------------------------*/
function calculatePlaylistDuration() {
  let totalSeconds = 0;

  tracks.forEach(track => {
    const [min, sec] = track.duration.split(":").map(Number);
    totalSeconds += min * 60 + sec;
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let text = "";
  if (hours > 0) text += hours + " h ";
  text += minutes + " min";

  document.getElementById("playlist-duration").innerText = text;
}

calculatePlaylistDuration();

/* -------------------------
   PROGRESS BAR
--------------------------*/
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  if (isDragging || !audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;

  progressBar.style.width = percent + "%";
  progressHandle.style.left = percent + "%";

  currentTimeEl.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return mins + ":" + (secs < 10 ? "0" : "") + secs;
}

/* -------------------------
   SEEK + DRAG
--------------------------*/
progressContainer.addEventListener("click", seek);

progressHandle.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", drag);

function seek(e) {
  const rect = progressContainer.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;

  audio.currentTime = percent * audio.duration;
}

function drag(e) {
  if (!isDragging) return;

  const rect = progressContainer.getBoundingClientRect();
  let percent = (e.clientX - rect.left) / rect.width;

  percent = Math.max(0, Math.min(1, percent));

  progressBar.style.width = percent * 100 + "%";
  progressHandle.style.left = percent * 100 + "%";

  audio.currentTime = percent * audio.duration;
}

/* -------------------------
   MOBILE TOUCH SUPPORT
--------------------------*/
progressHandle.addEventListener("touchstart", () => {
  isDragging = true;
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const touch = e.touches[0];
  const rect = progressContainer.getBoundingClientRect();

  let percent = (touch.clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));

  progressBar.style.width = percent * 100 + "%";
  progressHandle.style.left = percent * 100 + "%";

  audio.currentTime = percent * audio.duration;
});

searchInput.addEventListener("keyup", filterTracks);

function filterTracks() {

  const value = searchInput.value.toLowerCase();

  const tracksElements = document.querySelectorAll(".track");

  tracksElements.forEach(track => {

    const text = track.textContent.toLowerCase();

    if (text.indexOf(value) > -1) {
      track.style.display = "";
    } else {
      track.style.display = "none";
    }

  });

}

function toggleFullscreen() {

  const container = document.querySelector(".container");

  if (!document.fullscreenElement) {

    container.requestFullscreen();

  } else {

    document.exitFullscreen();

  }
}
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

// Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 64;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// resize canvas
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function draw() {

  requestAnimationFrame(draw);

  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / bufferLength;

  // 🔊 calcul énergie globale
  let energy = 0;

  for (let i = 0; i < bufferLength; i++) {
    energy += dataArray[i];
  }

  energy = energy / bufferLength;

  // 🎨 couleur selon énergie
  let color = "#00ff88"; // 🟢 vert doux

  if (energy > 170) {
    color = "#ff3b3b"; // 🔴 rouge
  } else if (energy > 100) {
    color = "#ffb300"; // 🟠 orange
  }

  // 🎵 dessin des barres
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {

    const barHeight = dataArray[i] / 2;

    ctx.fillStyle = color;

    ctx.fillRect(
      x,
      canvas.height - barHeight,
      barWidth - 2,
      barHeight
    );

    x += barWidth;
  }
}

draw();

document.addEventListener("click", () => {
  audioCtx.resume();
}, { once: true });
