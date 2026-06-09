// =========================
// SELECTION
// =========================
function toggleChoix(el) {
    el.classList.toggle("selected");
    console.log("clic OK");
}

// =========================
// VALIDATION Q1
// =========================
function validerQ1() {

    let choix = document.querySelectorAll("#q1 .choix");
    let bonne = true;

    choix.forEach(function(el) {

        let estSelectionne = el.classList.contains("selected");
        let estCorrect = el.dataset.correct === "true";

        if (estSelectionne !== estCorrect) {
            bonne = false;
        }
    });

    // BONNE REPONSE
    if (bonne) {

        // cacher Q1
        document.getElementById("q1").style.display = "none";

        // afficher le bloc réponse
        let bloc = document.getElementById("reponseQ1");
        bloc.style.display = "block";

        // injecter le texte
        document.getElementById("texteQ1").innerHTML =
        `Bonne réponse ! <br>Ces 4 facteurs influencent le débit d'une perfusion par gravité :<br>
        - La hauteur de la poche par rapport au patient<br>
        - Les mouvements du patient<br>
        - Les caractéristiques du perfuseur (fluage du tube)<br>
        - La présence d'éléments sur la ligne de perfusion (exemple : filtre)`;
    }

    // MAUVAISE REPONSE (tu gardes ton popup)
    else {
        ajouterPenalite(15);
        afficherPopup("Mauvaise réponse (+15 sec)");
    }
}



// =========================
// VALIDATION Q2
// =========================
function validerQ2() {
    // Validation based on placements: each .label must have been placed on the correct graduation
    // prendre toutes les étiquettes présentes dans la zone de la question (placées ou non)
    let labels = document.querySelectorAll('#q2 .label');
    let bonne = true;

    labels.forEach(function(el) {
        // placedIndex is set when a label is placed (string), convert to number for comparison
        let placed = el.dataset.placedIndex !== undefined ? parseInt(el.dataset.placedIndex, 10) : null;
        let correct = el.dataset.correctIndex !== undefined ? parseInt(el.dataset.correctIndex, 10) : null;

        if (placed !== correct) {
            bonne = false;
        }
    });

    // BONNE REPONSE
    if (bonne) {
        // cacher Q2
        document.getElementById('q2').style.display = 'none';

        // afficher le bloc réponse
        let bloc = document.getElementById('reponseQ2');
        bloc.style.display = 'block';

        // injecter le texte (réponse générique)
        document.getElementById('texteQ2').innerHTML =
        `Bonne réponse ! <br>Vous avez correctement classé les dispositifs selon leur précision.`;
    }

    // MAUVAISE REPONSE
    else {
        ajouterPenalite(15);
        afficherPopup('Mauvaise réponse (+15 sec)');
    }
}


// =========================
// PLACEMENT DES ÉTIQUETTES
// =========================
// Etiquette sélectionnée (DOM element)
let currentSelectedLabel = null;

// Sélectionne une étiquette à placer
function selectLabel(el) {
    // Désélectionne la précédente
    if (currentSelectedLabel) {
        currentSelectedLabel.classList.remove('selected-label');
    }

    // Si on reclique sur la même, on la désélectionne
    if (currentSelectedLabel === el) {
        currentSelectedLabel = null;
        return;
    }

    currentSelectedLabel = el;
    el.classList.add('selected-label');
}

// Place l'étiquette sélectionnée sur la graduation d'index donné
function placeOnGraduation(index) {
    if (!currentSelectedLabel) {
        // si aucune étiquette sélectionnée, on peut afficher un message rapide
        afficherPopup('Sélectionnez d\'abord un dispositif à placer.');
        return;
    }

    // trouver la slot correspondant à la graduation
    let slot = document.querySelector('.graduation[data-index="' + index + '"] .slot');
    if (!slot) return;

    // remettre l'étiquette dans la colonne droite si elle était déjà placée ailleurs
    // (on gère le DOM en déplaçant l'élément)
    slot.appendChild(currentSelectedLabel);

    // marquer l'index sur l'étiquette
    currentSelectedLabel.dataset.placedIndex = index;

    // style visuel: retirer sélection
    currentSelectedLabel.classList.remove('selected-label');
    currentSelectedLabel = null;
}


// =========================
// POPUP
// =========================
function afficherPopup(msg, action) {

    let popup = document.getElementById("popup");

    document.getElementById("popup-text").innerHTML = msg;
    popup.style.display = "block";

    popup.onclick = function () {
        popup.style.display = "none";

        if (action) {
            action();
        }
    };
}


function allerQ2() {

    document.getElementById("reponseQ1").style.display = "none";
    document.getElementById("q2").style.display = "block";
}

// =========================
// FIN QUIZZ → SALLE 3
// =========================
function allerSalle4() {
    window.location.href = "salle4.html";
}
