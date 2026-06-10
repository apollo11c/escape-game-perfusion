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

bloc.onclick = function () {
    allerQ2();
};
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
bloc.onclick = function () {
    allerSalle4();
};
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

// =========================
// SELECTION ETIQUETTE
// =========================
function selectLabel(el) {

    // enlever ancienne sélection
    document.querySelectorAll('.label').forEach(function(label) {
        label.classList.remove('selected-label');
    });

    // si déjà sélectionnée → désélectionner
    if (currentSelectedLabel === el) {

        currentSelectedLabel = null;
        return;
    }

    // nouvelle sélection
    currentSelectedLabel = el;

    // feedback visuel
    el.classList.add('selected-label');
}

// =========================
// PLACEMENT DES ÉTIQUETTES
// =========================
function placeOnGraduation(index) {

    // aucune étiquette sélectionnée
    if (!currentSelectedLabel) {

        afficherPopup("Sélectionnez d'abord un dispositif à placer.");
        return;
    }

    // slot cible
    let slot = document.querySelector(
        '.graduation[data-index="' + index + '"] .slot'
    );

    if (!slot) return;

    // =========================
    // si slot déjà occupé
    // =========================

    let ancienneEtiquette = slot.querySelector('.label');

    if (ancienneEtiquette) {

        // remettre ancienne étiquette dans la liste
        document.getElementById("labelList")
            .appendChild(ancienneEtiquette);

        // supprimer son placement
        delete ancienneEtiquette.dataset.placedIndex;
    }

    // =========================
    // retirer ancienne position
    // =========================

    if (currentSelectedLabel.parentElement.classList.contains('slot')) {

        currentSelectedLabel.parentElement.removeChild(currentSelectedLabel);
    }

    // =========================
    // ajouter nouvelle étiquette
    // =========================

    slot.appendChild(currentSelectedLabel);

    // mémoriser position
    currentSelectedLabel.dataset.placedIndex = index;

    // enlever sélection visuelle
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

// =========================
// REINITIALISER ETIQUETTES
// =========================
function reinitialiserEtiquettes() {

    // récupérer toutes les étiquettes
    let labels = document.querySelectorAll('.label');

    // colonne de départ
    let liste = document.getElementById("labelList");

    labels.forEach(function(label) {

        // remettre dans la liste
        liste.appendChild(label);

        // supprimer emplacement mémorisé
        delete label.dataset.placedIndex;

        // enlever sélection
        label.classList.remove('selected-label');
    });

    // plus de sélection active
    currentSelectedLabel = null;
}
