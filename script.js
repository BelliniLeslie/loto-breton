const audioFiles = [
    "audio/Arbre de vie.mp3",
    "audio/Bigouden.mp3",
    "audio/Biniou.mp3",
    "audio/Breizh.mp3",
    "audio/Breton.mp3",
    "audio/Brocéliande.mp3",
    "audio/Carnac.mp3",
    "audio/Cidre.mp3",
    "audio/Cités.mp3",
    "audio/Contes de Korrigen.mp3",
    "audio/Crêpe au froment.mp3",
    "audio/Croix celtique.mp3",
    "audio/Druides.mp3",
    "audio/Far breton.mp3",
    "audio/Fest-Noz.mp3",
    "audio/Fontaine de Jouvence.mp3",
    "audio/Fruits de mer.mp3",
    "audio/Galette.mp3",
    "audio/Gwenn ha du.mp3",
    "audio/Hermine.mp3",
    "audio/Jeanne d'Arc.mp3",
    "audio/Kouign Amann.mp3",
    "audio/Légende.mp3",
    "audio/Menhir.mp3",
    "audio/Merlin.mp3",
    "audio/runes.mp3",
    "audio/Saint-Brieuc.mp3",
    "audio/Saint-Malo.mp3",
    "audio/Trinité.mp3",
    "audio/Triskell.mp3"
];

const playButton = document.getElementById("playButton");
const audioPlayer = document.getElementById("audioPlayer");

function playRandomAudio() {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    audioPlayer.src = audioFiles[randomIndex];
    audioPlayer.play().catch(error => {
        console.log("Erreur de lecture :", error);
    });
}

playButton.addEventListener("click", playRandomAudio);

