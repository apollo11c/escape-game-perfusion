// =========================
// VARIABLES DE POSITION
// =========================
let positionPompe = null;
let positionValve = null;


// =========================
// PLACEMENT POMPE
// =========================
function placerPompe(zone) {
    positionPompe = zone;

    let pompe = document.getElementById("pompe");

    if (zone === "voie1") {
        pompe.style.top = "60%";
        pompe.style.left = "8%";
    }

    if (zone === "voie2") {
        pompe.style.top = "74%";
        pompe.style.left = "8%";
    }
}


// =========================
// PLACEMENT VALVE
// =========================
function placerValve(zone) {
    positionValve = zone;

    let valve = document.getElementById("valve");

    if (zone === "siteA") {
        valve.style.top = "57%";
        valve.style.left = "50%";
    }

    if (zone === "siteB") {
        valve.style.top = "70%";
        valve.style.left = "50%";
    }
}


// =========================
// VALIDATION
// =========================
document.getElementById("valider").onclick = function () {

    let popup = document.getElementById("popup");
    let texte = document.getElementById("popup-text");

    popup.style.display = "block";

    // CAS BON
    if (positionPompe === "voie2" && positionValve === "siteB") {

        texte.innerText = "Bien joué !";

        // modification visuelle de la valve
        let valve = document.getElementById("valve");

        valve.style.top = "72.2%";   // à ajuster
        valve.style.left = "38.2%";  // à ajuster
        valve.style.width = "1.7%"; // nouvelle taille

	document.getElementById("voie1").style.display = "none";
	document.getElementById("siteA").style.display = "none";

	let siteB = document.getElementById("siteB");
   	let dot = siteB.querySelector(".dot");

    	if (dot) {
        	dot.style.visibility = "hidden";
    	}

	document.getElementById("valider").style.display = "none";

	
	document.getElementById("voie2").onclick = null;
	document.getElementById("siteB").onclick = null;


        // clic popup → page suivante
        popup.onclick = function () {

    		popup.style.display = "none";
		document.querySelector(".bloc").style.display = "none";

    		// afficher le bloc intermédiaire
    		let transition = document.getElementById("transitionBloc");
    		transition.style.display = "block";

    		// clic flèche → page suivante
    		transition.querySelector(".arrow").onclick = function () {
        		window.location.href = "quizz1.html";
    		};
	};

    }

    // CAS MAUVAIS
    else {

        texte.innerText = "Mauvaise configuration (+15 sec)";

        ajouterPenalite(15);

        // clic popup → fermer
        popup.onclick = function () {
            popup.style.display = "none";
        };
    }
};