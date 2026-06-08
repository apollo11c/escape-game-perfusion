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

    let popup = document.getElementById("popup");
    let texte = document.getElementById("popup-text");

    ronds.forEach(function(el) {

        let selectionne = el.classList.contains("selected");
        let correct = el.dataset.correct === "true";

        if (selectionne !== correct) {
            bonne = false;
        }
    });

    // BONNE REPONSE
    if (bonne) {

        // cacher ronds et bouton
        document.querySelectorAll(".zone-rond").forEach(el => el.style.display = "none");
        document.getElementById("valider").style.display = "none";

        // afficher bloc
        texte.innerHTML =
        `Bien vu ! Vous avez relevé les erreurs suivantes :<br>
        - Écriture au marqueur directement sur les poches<br>
        - Chambre compte-goutte pas assez remplie et prise d’air ouverte<br>
        - Bulles d’air dans la ligne<br>
        - Mauvaise étiquette sur la seringue<br>
        - Pansement opaque<br>
        - Aiguille qui traine`;
        popup.style.display = "block";

	
	document.getElementById("zone-rond-1").onclick = null;
	document.getElementById("zone-rond-2").onclick = null;
    document.getElementById("zone-rond-3").onclick = null;
    document.getElementById("zone-rond-4").onclick = null;
    document.getElementById("zone-rond-5").onclick = null;
    document.getElementById("zone-rond-6").onclick = null;
    document.getElementById("zone-rond-7").onclick = null;


        // clic popup → page suivante
        popup.onclick = function () {

    		popup.style.display = "none";
		document.querySelector(".bloc").style.display = "none";

    		// afficher le bloc intermédiaire
    		let transition = document.getElementById("transitionBloc");
    		transition.style.display = "block";

    		// clic flèche → page suivante
    		transition.querySelector(".arrow").onclick = function () {
        		window.location.href = "salle4.html";
    		};
        }
    }

    // MAUVAISE REPONSE
    else {

        texte.innerText = "Mauvaise configuration (+15 sec)";
        popup.style.display = "block";

        ajouterPenalite(15);

        // clic popup → fermer
        popup.onclick = function () {
            popup.style.display = "none";
        };
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
