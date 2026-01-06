const audioFiles = [
    "final/10.m4a",
    "final/11.m4a",
    "final/12.m4a",
    "final/13@.m4a",
    "final/14.m4a",
    "final/15.m4a",
    "final/16.m4a",
    "final/17@.m4a",
    "final/18.m4a",
    "final/19.m4a",
    "final/20.m4a",
    "final/21.m4a",
    "final/22@.m4a",
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

/***************
 * DONNÉES
 ***************/
const vocabulary = [
  { text: "Un far breton", audio: "final/far.mp3" },
  { text: "Brocéliande", audio: "final/broceliande.mp3" },
  { text: "Une galette au sarrasin", audio: "final/sarrasin.mp3" },
  { text: "Un kouign amann", audio: "final/kouign.mp3" },
  { text: "Un menhir", audio: "final/menhir.mp3" },
  { text: "Un chapeau bigouden", audio: "final/bigouden.mp3" },
  { text: "Le Fest-noz", audio: "final/fest.mp3" },
  { text: "Un cidre", audio: "final/cidre.mp3" },
  { text: "Une crêpe au froment", audio: "final/crepe.mp3" }
];

/***************
 * PARAMÈTRES
 ***************/
const size = 3; // change ici si tu veux (3, 4, 5…)
const grid = document.getElementById("grid");
const status = document.getElementById("status");
const audioPlayer = document.getElementById("audioPlayer");

let currentAudio = null;
let marked = Array(size * size).fill(false);

/***************
 * OUTILS
 ***************/
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

/***************
 * CRÉATION DE LA GRILLE
 ***************/
function renderGrid() {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    const items = shuffle([...vocabulary]).slice(0, size * size);

    items.forEach((item, index) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = item.text;
        cell.dataset.audio = item.audio;

        cell.addEventListener("click", () => handleClick(index, cell));

        grid.appendChild(cell);
    });
}

/***************
 * AUDIO
 ***************/
document.getElementById("playButton").onclick = () => {
    const choice = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    currentAudio = choice.audio;
    audioPlayer.src = choice.audio;
    audioPlayer.play();
    status.textContent = "Écoute et clique sur la bonne case.";
};

/***************
 * CLIC SUR CASE
 ***************/
function handleClick(index, cell) {
    if (!currentAudio || marked[index]) return;

    if (cell.dataset.audio === currentAudio) {
        cell.classList.add("marked");
        marked[index] = true;
        status.textContent = "Bonne réponse ✅";
        checkLoto();
    } else {
        cell.classList.add("wrong");
        status.textContent = "Mauvaise réponse ❌";
        setTimeout(() => cell.classList.remove("wrong"), 700);
    }
}

/***************
 * DÉTECTION LOTO
 ***************/
function checkLoto() {
    // lignes
    for (let r = 0; r < size; r++) {
        if (marked.slice(r * size, r * size + size).every(Boolean)) {
            highlightLine(r);
        }
    }

    // colonnes
    for (let c = 0; c < size; c++) {
        let col = [];
        for (let r = 0; r < size; r++) col.push(marked[r * size + c]);
        if (col.every(Boolean)) highlightColumn(c);
    }

    // diagonales
    let diag1 = [], diag2 = [];
    for (let i = 0; i < size; i++) {
        diag1.push(marked[i * size + i]);
        diag2.push(marked[i * size + (size - 1 - i)]);
    }

    if (diag1.every(Boolean)) highlightDiagonal(1);
    if (diag2.every(Boolean)) highlightDiagonal(2);
}

/***************
 * MISE EN ÉVIDENCE
 ***************/
function highlightLine(row) {
    status.textContent = "🎉 LOTO !";
    for (let c = 0; c < size; c++) {
        grid.children[row * size + c].classList.add("loto");
    }
}

function highlightColumn(col) {
    status.textContent = "🎉 LOTO !";
    for (let r = 0; r < size; r++) {
        grid.children[r * size + col].classList.add("loto");
    }
}

function highlightDiagonal(type) {
    status.textContent = "🎉 LOTO !";
    for (let i = 0; i < size; i++) {
        const index = type === 1
            ? i * size + i
            : i * size + (size - 1 - i);
        grid.children[index].classList.add("loto");
    }
}

/***************
 * INIT
 ***************/
renderGrid();
