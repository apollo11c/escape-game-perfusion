
// =========================
// SELECTION MEDICAMENT
// =========================
function selectionMedicament(el) {

    // enlever ancienne sélection
    document.querySelectorAll(".medicament").forEach(function(med) {
        med.classList.remove("selected");
    });

    // ajouter sélection
    el.classList.add("selected");

    // vérifier bonne réponse
    let correct = el.dataset.correct === "true";

// ✅ BONNE REPONSE
if (correct) {

    // popup succès
    afficherPopup("Bien joué, rentrez maintenant le bon débit");

    // afficher visuel 2 DIRECTEMENT
    document.getElementById("fenetre-pse").innerHTML = `

    <div class="titre-ligne">
        <span>DONNEES DE PERFUSION</span>

        <span class="petit-titre">
            CONT | CHLORYDRATE DE MORPHINE | 10 mg/ml
        </span>
    </div>

    <div class="contenu-perfusion">

        <div class="case-debit"
             onclick="ouvrirDebit()">

            <div class="texte-vert">
                Débit
            </div>

            <div class="rond-vert"></div>

        </div>

        <div class="colonne-droite">

            <div class="petite-case">
                <div class="texte-vert">
                    VAP
                </div>
            </div>

            <div class="petite-case">
                <div class="texte-vert">
                    Temps de perfusion
                </div>
            </div>

        </div>

    </div>

    <div class="menu-pse">

        <div class="menu-inactif">
            MEDICAMENT
        </div>

        <div class="menu-inactif">
            PATIENT
        </div>

        <div class="menu-actif">
            PERFUSION
        </div>

        <div class="menu-inactif">
            DEMARRER PERFUSION
        </div>

    </div>
    `;
}

    // ❌ MAUVAISE REPONSE
    else {
        ajouterPenalite(15);
        afficherPopup("Mauvais médicament (+15 sec)");
    }
}

// =========================
// VISUEL SAISIE DEBIT
// =========================
function ouvrirDebit() {

    // nouveau popup
    afficherPopup("Rentrez le débit calculé");

    // afficher visuel 3
    document.getElementById("fenetre-pse").innerHTML = `

    <div class="titre-ligne">
        <span>Débit</span>

        <span class="petit-titre">
            CONT | CHLORYDRATE DE MORPHINE | 10 mg/ml
        </span>
    </div>

    <!-- écran saisie -->
    <div class="zone-saisie">

        <div class="case-clavier-effacer"
             onclick="effacerDebit()">
            <div>X</div>
            <div class="mini-texte">Effacer</div>
        </div>

        <div class="case-input"
             onclick="selectionCase(this)">_</div>

        <div class="case-input"
             onclick="selectionCase(this)">_</div>

        <div class="case-input"
             onclick="selectionCase(this)">_</div>

        <div class="point">.</div>

        <div class="case-input"
             onclick="selectionCase(this)">_</div>

        <div class="case-input"
             onclick="selectionCase(this)">_</div>

        <div class="mlh">ml/h</div>

    </div>

    <!-- clavier -->
<div class="clavier" id="clavier" style="display:none;">

    <div class="touche"
         onclick="fermerClavier()">
         ✕
    </div>

    <div class="touche" onclick="entrerChiffre('0')">0</div>
    <div class="touche" onclick="entrerChiffre('1')">1</div>
    <div class="touche" onclick="entrerChiffre('2')">2</div>
    <div class="touche" onclick="entrerChiffre('3')">3</div>
    <div class="touche" onclick="entrerChiffre('4')">4</div>
    <div class="touche" onclick="entrerChiffre('5')">5</div>
    <div class="touche" onclick="entrerChiffre('6')">6</div>
    <div class="touche" onclick="entrerChiffre('7')">7</div>
    <div class="touche" onclick="entrerChiffre('8')">8</div>
    <div class="touche" onclick="entrerChiffre('9')">9</div>

</div>

    <!-- menu -->
    <div class="menu-pse">

        <div class="menu-inactif">
            RETOUR
        </div>

        <div class="menu-inactif"></div>

        <div class="menu-confirm"
             onclick="validerDebit()">
            CONFIRMER
        </div>

    </div>
    `;
}

let caseActive = null;

// =========================
// SELECTION CASE
// =========================
function selectionCase(el) {

    // enlever ancienne sélection
    document.querySelectorAll(".case-input").forEach(function(c) {
        c.classList.remove("active");
    });

    // nouvelle sélection
    el.classList.add("active");

    caseActive = el;

    // afficher clavier
    document.getElementById("clavier").style.display = "flex";
}

// =========================
// FERMER CLAVIER
// =========================
function fermerClavier() {
    document.getElementById("clavier").style.display = "none";
}

// =========================
// ENTRER CHIFFRE
// =========================
function entrerChiffre(chiffre) {

    if (!caseActive) {
        return;
    }

    // mettre chiffre
    caseActive.innerHTML = chiffre;

    // récupérer cases
    let cases = document.querySelectorAll(".case-input");

    // remplir les cases à droite avec 0
    let remplir = false;

    cases.forEach(function(c) {

        if (c === caseActive) {
            remplir = true;
            return;
        }

        if (remplir && c.innerHTML.trim() === "_") {
    c.innerHTML = "0";
}
    });

    // remplacer les zéros inutiles par _
    cases.forEach(function(c, index) {

        let gaucheVide = true;

        for (let i = 0; i < index; i++) {

            if (cases[i].innerHTML.trim() !== "_") {
                gaucheVide = false;
            }
        }

        if (gaucheVide && c.innerHTML.trim() === "0") {
            c.innerHTML = "_";
        }
    });
}

// =========================
// EFFACER
// =========================
function effacerDebit() {

    document.querySelectorAll(".case-input").forEach(function(c) {
        c.innerHTML = "_";
    });
}

function validerDebit() {

    let cases = document.querySelectorAll(".case-input");

    let valeur =
        cases[0].innerHTML +
        cases[1].innerHTML +
        cases[2].innerHTML +
        "." +
        cases[3].innerHTML +
        cases[4].innerHTML;

    console.log(valeur);

    // ✅ BONNE REPONSE
    if (valeur === "__2.00") {

        afficherPopup(
            "Bonne réponse, vous pouvez maintenant démarrer la perfusion"
        );

        // visuel 4
        document.getElementById("fenetre-pse").innerHTML = `

    <div class="titre-ligne">
        <span>DONNEES DE PERFUSION</span>

        <span class="petit-titre">
            CONT | CHLORYDRATE DE MORPHINE | 10 mg/ml
        </span>
    </div>

    <div class="contenu-perfusion">

        <div class="case-debit-finale">

            <div class="texte-vert">
                Débit
            </div>
		
		<div class="debit-centre">
                	2 ml/h
            	</div>
</div>

        <div class="colonne-droite">

            <div class="petite-case">
                <div class="texte-vert">
                    VAP
                </div>
            </div>

            <div class="petite-case">
                <div class="texte-vert">
                    Temps de perfusion
                </div>
            </div>

        </div>

    </div>

    <div class="menu-pse">

        <div class="menu-inactif">
            MEDICAMENT
        </div>

        <div class="menu-inactif">
            PATIENT
        </div>

        <div class="menu-actif">
            PERFUSION
        </div>

        
<!-- bouton vert -->
        <div class="menu-demarrer"
             onclick="demarrerPerfusion()">

            DEMARRER PERFUSION

        </div>


    </div>

        `;
    }

    // ❌ FAUX
    else {
        ajouterPenalite(15);
        afficherPopup("Mauvais débit (+15 sec)");
    }
}

// =========================
// DEMARRER PERFUSION
// =========================
function demarrerPerfusion() {

    // mémoriser le temps final
    let tempsFinal = document.getElementById("timerDisplay").innerText;

    localStorage.setItem("tempsFinal", tempsFinal);

    // aller à la page de fin
    window.location.href = "fin.html";
}

// =========================
// POPUP
// =========================
function afficherPopup(msg, action) {

    let popup = document.getElementById("popup");

    document.getElementById("popup-text").innerHTML = msg;

    popup.style.display = "block";

    // ✅ si action = popup cliquable
    if (action) {

        popup.onclick = function () {

            popup.style.display = "none";
            action();
        };
    }

    // ✅ sinon popup non cliquable
    else {
        popup.onclick = null;
    }
}