const tracks = [
  { name: "Time is running out/MUSE", file: "audio/MUSE - Time Is Running Out.mp3", duration: "3:56" },
  { name: "Use somebody/KOL", file: "audio/KINGS OF LEON - Use Somebody.m4a", duration: "3:50" },
  { name: "Creep(+0.5)/RADIOHEAD", file: "audio/RADIOHEAD - Creep (+0,5 ton).mp3", duration: "3:58" },
  { name: "Plug in baby/MUSE", file: "audio/MUSE - Plugin baby.mp3", duration: "3:40" },
  { name: "Can't stop/RHCP", file: "audio/RHCP - Can't Stop.mp3", duration: "4:37" },
  { name: "Lonely day(+1.5)/SOAD", file: "audio/SOAD - Lonely Day (+1,5 ton)+solo basse.mp3", duration: "2:51" },
  { name: "Shadow of the day(Version Echoes)/LINKIN PARK", file: "audio/LP - Shadow of the day (version Echoes).m4a_mixed 24.01.mp3", duration: "4:20" },
  { name: "Help(Version Echoes)/THE BEATLES", file: "audio/ZOOM0125 - THE BEATLS -Help -(Version Echoes).mp3", duration: "4:00" },
  { name: "Echoes(tu nous connais pas)/ECHOES", file: "audio/ZOOM0276 - Echoes  - Echoes - tu nous connais pas- version du 18.08.26.mp3", duration: "4:45" },
  { name: "Interlude/MUSE", file: "audio/MUSE - Interlude.mp3", duration: "0:36" },
  { name: "Hysteria/MUSE", file: "audio/MUSE - Hysteria.mp3", duration: "3:46" },
  { name: "Battez-vous/BRIGITTE", file: "audio/BRIGITTE - Battez-vous.mp3", duration: "4:04" },
  { name: "Not an addict(Intro Echoes)/KS CHOICE", file: "audio/K's CHOICE - Not an addict (Démarrage Echoes).mp3", duration: "4:43" },
  { name: "Supermassive black hole/MUSE", file: "audio/MUSE - Supermassive Black Hole.mp3", duration: "3:32" },
  { name: "Lola(structure Echoes)/SUPERBUS", file: "audio/SUPERBUS - Lola (structure finale).MP3", duration: "4:09" },
  { name: "Le Brio/BIG SOUL", file: "audio/BIG SOUL - Le Brio (version Echoes).m4a", duration: "2:10" },
  { name: "C'est comme ça(Version Echoes)/LES RITA MITSOUKO", file: "audio/ZOOM0135 - LES RITA - Cest comme ça (version Echoes).mp3", duration: "4:00" },
  { name: "Tout l'amour que j'ai pour toi(Version Echoes)/MORENO", file: "audio/MORENO - Toutt l'amour que j'ai pour toi (Version Echoes).MP3", duration: "1:59" },
  { name: "Celebrity skin/HOLE", file: "audio/HOLE - Celebrity Skin.mp3", duration: "2:43" },
  { name: "Sweet dreams/MARILYN MANSON", file: "audio/MARILYN MANSON - Sweet Dreams.mp3", duration: "4:51" },
  { name: "Nightcall(Version Echoes)/KAVINSKY", file: "audio/KAVINSKI - Nightcall (versin Echoes fin ok).mp3", duration: "5:12" },
  { name: "Aie Aie Aie/ECHOES", file: "audio/ZOOM0144 - Echoes - Aya - remixée + fin net bla.mp3", duration: "3:50" }, 
  { name: "In bloom/NIRVANA", file: "audio/NIRVANA - In Bloom.mp3", duration: "4:15" }, 
  { name: "Banquet/BLOC PARTY", file: "audio/BLOC PARTY - Banquet.m4a", duration: "3:21" }, 
  { name: "Medley 'avec solo ACDC", file: "audio/Medley - Enter rock to hell 19.08.26.mp3", duration: "6:55" }, 
  { name: "Song2(+0.5)/BLUR", file: "audio/BLUR - Song 2 (+ 0,5 ton).mp3", duration: "2:02" }, 
  { name: "Cause toujours/ECHOES", file: "audio/ZOOM0236 - Cause toujours 26.05 remixé 29.05-3.mp3", duration: "4:29" },
  { name: "The Pretender(Sans presentation Echoes)/FOO FIGHTERS", file: "audio/Foo Fighters - The Pretender (version Echoes - sans presentation).mp3", duration: "4:33" },
  { name: "Zombie/THE CRANBERRIES", file: "audio/THE CRANBERRIES - Zombie.mp3", duration: "5:07" },
  { name: "7 Nation army/THE WHITE STRIPES", file: "audio/THE WHITE STRIPES - 7 Nation army (version Echoes).MP3", duration: "3:47" },
  { name: "QGv10.1/ECHOES", file: "audio/Echoes - QG - V10.1 (record 01.09)-6db.mp3", duration: "4:22" },
  { name: "No more(Démo Corbier)/ECHOES", file: "audio/Echoes - No more necessary (CB5).mp3", duration: "3:45" },
   
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
