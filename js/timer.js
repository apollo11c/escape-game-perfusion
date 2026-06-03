let timerInterval;

function startGame() {
    console.log("Bouton cliqué");

    localStorage.setItem("startTime", Date.now());
    window.location.href = "salle1.html";
}

function updateTimer() {
    let startTime = localStorage.getItem("startTime");

    if (!startTime) return;

    let now = Date.now();
    let elapsed = Math.floor((now - startTime) / 1000);

    let minutes = Math.floor(elapsed / 60);
    let seconds = elapsed % 60;

    let el = document.getElementById("timerDisplay");

    if (el) {
        el.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
}

window.onload = function () {
    if (document.getElementById("timerDisplay")) {
        timerInterval = setInterval(updateTimer, 1000);
    }
};

function ajouterPenalite(seconds) {
    let startTime = localStorage.getItem("startTime");

    startTime = parseInt(startTime) - (seconds * 1000);

    localStorage.setItem("startTime", startTime);
}
