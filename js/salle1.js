// gestion des étapes
let etape = 1;

// PHASE 1 → PHASE 2
document.getElementById("consigne1").onclick = function () {
	document.getElementById("prescription").classList.remove("desactive");
    document.getElementById("consigne1").style.display = "none";
    document.getElementById("consigne2").style.display = "block";
};

// mauvaise réponse
function erreur() {
    afficherPopup("Ce n'est pas la bonne réponse (+15 sec)");
    ajouterPenalite(15);
}

// bonne réponse
function bonneReponse() {
    afficherPopup("Bonne réponse : le solvant à utiliser est du NaCl 0,9%.");
	document.getElementById("prescription").classList.add("desactive");
    etape = 2;
}

// clic popup
document.getElementById("popup").onclick = function () {

    document.getElementById("popup").style.display = "none";

    if (etape === 2) {
        passerPhase2();
    }
};

// PASSAGE PHASE 3
function passerPhase2() {

    document.getElementById("consigne2").style.display = "none";
    document.getElementById("consigne3").style.display = "block";

    document.getElementById("zoom1").style.display = "block";
    document.getElementById("zoom2").style.display = "block";

    document.getElementById("porte1").style.display = "block";
    document.getElementById("porte2").style.display = "block";
}

// choix patient
function choixPorte(p) {

    if (p === 1) {
        afficherPopup("Bon patient ! Cliquez pour continuer");

        document.getElementById("popup").onclick = function () {
            window.location.href = "salle2.html";
        };

    } else {
        afficherPopup("Mauvais patient (+15 sec)");
        ajouterPenalite(15);
    }
}

// popup générique
function afficherPopup(msg) {
    document.getElementById("popup-text").innerText = msg;
    document.getElementById("popup").style.display = "block";
}

// zoom
function zoom(image) {
    document.getElementById("zoomBloc").style.display = "block";
    document.getElementById("zoomImage").src = image;
}

function fermerZoom() {
    document.getElementById("zoomBloc").style.display = "none";
}

function ajusterTexte() {
    const box = document.getElementById("prescription");
    const text = box.querySelector(".presc-text");

    let size = 20; // taille de départ

    text.style.fontSize = size + "px";

    // on réduit jusqu'à ce que ça rentre
    while (
        (text.scrollHeight > box.clientHeight ||
         text.scrollWidth > box.clientWidth) &&
        size > 4
    ) {
        size--;
        text.style.fontSize = size + "px";
    }
}

window.addEventListener("load", ajusterTexte);
window.addEventListener("resize", ajusterTexte);


window.addEventListener("load", function() {
    document.getElementById("prescription").classList.add("desactive");
});
