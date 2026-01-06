const audioFiles = [
    "final/10.m4a",
    "final/11.m4a",
    "final/12.m4a",
    "final/breton.m4a",
    "final/14.m4a",
    "final/15.m4a",
    "final/16.m4a",
    "final/hermine.m4a",
    "final/18.m4a",
    "final/19.m4a",
    "final/20.m4a",
    "final/21.m4a",
    "final/jouv.m4a",
    "final/23.m4a",
    "final/24.m4a",
    "final/25.m4a",
    "final/26.m4a",
    "final/27.m4a",
    "final/28.m4a",
    "final/29.m4a",
    "final/30.m4a",
    "final/bigouden.mp3",
    "final/broceliande.mp3",
    "final/cidre.mp3",
    "final/crepe.mp3",
    "final/far.mp3",
    "final/fest.mp3",
    "final/kouign.mp3",
    "final/menhir.mp3",
    "final/sarrasin.mp3"
];

const playButton = document.getElementById("playButton");
const audioPlayer = document.getElementById("audioPlayer");
const status = document.getElementById("status");

let remainingAudios = [...audioFiles];

function playRandomAudioOnce() {
    if (remainingAudios.length === 0) {
        remainingAudios = [...audioFiles]; 
        status.textContent = "Tous les sons ont été joués, on recommence !";
    }

    const randomIndex = Math.floor(Math.random() * remainingAudios.length);
    const selectedAudio = remainingAudios[randomIndex];

    audioPlayer.src = selectedAudio;
    audioPlayer.play().catch(err => console.log("Erreur audio :", err));

    remainingAudios.splice(randomIndex, 1);

    status.textContent = "Écoute le son et clique sur la bonne case.";
}

playButton.addEventListener("click", playRandomAudioOnce);

