const songs = [
    { title: "Гангстер", artist: "Xcho", file: "gangster.mp3", duration: "2:39" },
    { title: "Лондон", artist: "Xcho", file: "london.mp3", duration: "2:46" },
];

const audio = document.querySelector("#audio");
const qoshiqNomi = document.querySelector(".qoshiq-nomi");
const ijrochi = document.querySelector(".ijrochi");
const joriyVaqt = document.querySelector("#joriy-vaqt");
const umumiyVaqt = document.querySelector("#umumiy-vaqt");
const jarayon = document.querySelector("#jarayon");
const playPauseBtn = document.querySelector("#play-pause");
const pleerPanel = document.querySelector("#pleer-panel");
const volumeSlider = document.createElement("input");
volumeSlider.type = "range";
volumeSlider.min = 0;
volumeSlider.max = 1;
volumeSlider.step = 0.01;
volumeSlider.value = 1;
pleerPanel.appendChild(volumeSlider);

let index = 0;
let isPlaying = false;

function playSong(songIndex) {
    index = songIndex;
    pleerPanel.style.display = "block";
    const song = songs[index];
    audio.src = song.file;
    qoshiqNomi.textContent = song.title;
    ijrochi.textContent = song.artist;
    audio.load();
    audio.play().catch(() => {
        alert("Qo‘shiqni o‘ynatishda xato! Faylni tekshiring.");
    });
    isPlaying = true;
    playPauseBtn.textContent = "⏸️";
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = "▶️";
    } else {
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = "⏸️";
    }
}

function nextSong() {
    index = (index + 1) % songs.length;
    playSong(index);
}

function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    playSong(index);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0;
    jarayon.value = (currentTime / duration) * 100 || 0;
    joriyVaqt.textContent = formatTime(currentTime);
    umumiyVaqt.textContent = formatTime(duration) || songs[index].duration;
});

audio.addEventListener("ended", () => {
    nextSong();
});

jarayon.addEventListener("input", () => {
    const duration = audio.duration || 0;
    audio.currentTime = (jarayon.value / 100) * duration;
});

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        playPause();
    } else if (e.code === "ArrowRight") {
        nextSong();
    } else if (e.code === "ArrowLeft") {
        prevSong();
    }
});