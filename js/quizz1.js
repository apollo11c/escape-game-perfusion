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
        `Bonne réponse ! <br>La stabilité d'un médicament à perfuser dépend de l'exposition à la lumière, de la concentration, du solvant de dilution, mais aussi de la température, des matériaux plastiques (absorption sur PVC et PUR de la trinitrine, désorption PVC avec le paclitaxel), des autres médicaments, et d'une éventuelle nutrition parentérale.`;
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

    let choix = document.querySelectorAll("#q2 .choix");
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

        // cacher Q2
        document.getElementById("q2").style.display = "none";

        // afficher le bloc réponse
        let bloc = document.getElementById("reponseQ2");
        bloc.style.display = "block";

        // injecter le texte
        document.getElementById("texteQ2").innerHTML =
        `Bonne réponse ! <br>Plusieurs facteurs influencent le délai du médicament pour attendre le patient :<br>
Le montage de la perfusion : résistances dues aux dispositifs utilisés (longueurs et diamètres des tubulures; présence de filtre, de valve, ...)<br>
La pression vasculaire du patient : artérielle ou veineuse, administration sur voie centrale ou périphérique<br>
La solution de perfusion utilisée : viscosité du liquide à injecter (fonction de sa température)<br>
Et aussi de débit de la perfusion`;
    }

    else {
        ajouterPenalite(15);
        afficherPopup("Mauvaise réponse (+15 sec)");
    }
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
function allerSalle3() {
    window.location.href = "salle3.html";
}
