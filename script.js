const playlist = [
    { title:"Midnight Dreams", artist:"Electra", durationSec:184, durationStr:"3:04", emoji:"🌙" },
    { title:"Golden Hour", artist:"Aurora", durationSec:211, durationStr:"3:31", emoji:"☀️" },
    { title:"Neon Lights", artist:"Pixel", durationSec:198, durationStr:"3:18", emoji:"💡" },
    { title:"Ocean Drive", artist:"Wave", durationSec:223, durationStr:"3:43", emoji:"🌊" },
    { title:"Starlight", artist:"Cosmo", durationSec:175, durationStr:"2:55", emoji:"⭐" }
];

let currentSongIndex = 0;
let isPlaying = false;
let progressInterval = null;
let currentSeconds = 0;
let songDuration = playlist[0].durationSec;

function formatTime(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2,'0')}`;
}

function updateTimeDisplay(){
    document.getElementById("currentTime").textContent = formatTime(currentSeconds);
    document.getElementById("progress").style.width =
        `${(currentSeconds/songDuration)*100}%`;
}

function stopProgress(){
    clearInterval(progressInterval);
}

function startProgress(){
    stopProgress();

    progressInterval = setInterval(()=>{
        if(isPlaying && currentSeconds < songDuration){
            currentSeconds += 0.1;
            updateTimeDisplay();

            if(currentSeconds >= songDuration){
                nextSong();
            }
        }
    },100);
}

function loadSong(index){
    currentSongIndex = index;
    const song = playlist[index];

    currentSeconds = 0;
    songDuration = song.durationSec;

    document.getElementById("title").textContent = song.title;
    document.getElementById("artist").textContent = song.artist;
    document.getElementById("duration").textContent = song.durationStr;
    document.getElementById("cover").textContent = song.emoji;

    updatePlaylistUI();
    updateTimeDisplay();
}

function togglePlay(){
    isPlaying = !isPlaying;

    if(isPlaying){
        document.getElementById("playBtn").textContent = "⏸️";
        document.getElementById("cover").classList.add("playing-animation");
        startProgress();
    }else{
        document.getElementById("playBtn").textContent = "▶️";
        document.getElementById("cover").classList.remove("playing-animation");
        stopProgress();
    }
}

function nextSong(){
    loadSong((currentSongIndex+1)%playlist.length);
    if(isPlaying) startProgress();
}

function prevSong(){
    loadSong((currentSongIndex-1+playlist.length)%playlist.length);
    if(isPlaying) startProgress();
}

function updatePlaylistUI(){
    const container = document.getElementById("playlist");
    container.innerHTML = "";

    playlist.forEach((song,index)=>{
        const div = document.createElement("div");
        div.className = `playlist-item ${index===currentSongIndex ? "active":""}`;

        div.innerHTML = `
            <div>
                ${song.emoji} ${song.title}<br>
                <small>${song.artist}</small>
            </div>
            <span>${song.durationStr}</span>
        `;

        div.onclick = ()=> loadSong(index);

        container.appendChild(div);
    });
}

document.getElementById("playBtn").onclick = togglePlay;
document.getElementById("nextBtn").onclick = nextSong;
document.getElementById("prevBtn").onclick = prevSong;

loadSong(0);