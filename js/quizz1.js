// =========================
// MAUVAISE REPONSE
// =========================
function mauvaise() {
    ajouterPenalite(15);
    alert("❌ Mauvaise réponse (+15 sec)");
}

// =========================
// BONNE REPONSE Q1
// =========================
function bonneQ1() {
    document.getElementById("q1").style.display = "none";
    document.getElementById("r1").style.display = "block";
}

// =========================
// PASSAGE Q2
// =========================
function afficherQ2() {
    document.getElementById("r1").style.display = "none";
    document.getElementById("q2").style.display = "block";
}

// =========================
// BONNE REPONSE Q2
// =========================
function bonneQ2() {
    document.getElementById("q2").style.display = "none";
    document.getElementById("r2").style.display = "block";
}

// =========================
// FIN
// =========================
function fin() {
    window.location.href = "salle3.html"; // ou autre
}