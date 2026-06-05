// =========================
// SELECTION ROND
// =========================
function toggleRond(el) {
    el.classList.toggle("selected");
}

// =========================
// VALIDATION
// =========================
function validerRonds() {

    let ronds = document.querySelectorAll(".zone-rond");
    let bonne = true;

    ronds.forEach(function(el) {

        let selectionne = el.classList.contains("selected");
        let correct = el.dataset.correct === "true";

        if (selectionne !== correct) {
            bonne = false;
        }
    });

    // ✅ BONNE REPONSE
    if (bonne) {

        // cacher ronds et bouton
        document.querySelectorAll(".zone-rond").forEach(el => el.style.display = "none");
        document.getElementById("valider").style.display = "none";

        // afficher bloc
        let bloc = document.getElementById("reponseSalle3");
        bloc.style.display = "block";

        document.getElementById("texteSalle3").innerHTML =
        `Bonne réponse !<br><br>
        Plusieurs erreurs pouvaient être identifiées sur la ligne de perfusion.
        Il est essentiel de vérifier chaque élément du montage afin d'assurer la sécurité du patient.`;
    }

    // ❌ MAUVAISE REPONSE
    else {
        ajouterPenalite(15);
        afficherPopup("Mauvaise réponse (+15 sec)");
    }
}

// =========================
// POPUP ERREUR
// =========================
function afficherPopup(msg) {

    let popup = document.getElementById("popup");

    document.getElementById("popup-text").innerHTML = msg;
    popup.style.display = "block";

    popup.onclick = function () {
        popup.style.display = "none";
    };
}

// =========================
// SUIVANT
// =========================
function allerSalle4() {
    window.location.href = "salle4.html";
}
``