// JavaScript Document
// Image_gallery_versie1.js

var versie		=	" - Versie 3.0";

window.onload 	= 	function() {
	
	// noscript verbergen
	var eNoScript		=	document.getElementById('noscript');
	eNoScript.style.display	=	"none";
	
	// array geladen?
	if(typeof aModernArt == "undifined") {
		throw new Error("array aModernArt niet gevonden");
	}
	else {
		console.log("test - " + aModernArt[0][0]);		// is ModernArt aanwezig?
	}
	
	// Versie info
	var eKop			=	document.querySelector('h1');
	eKop.innerHTML		=	eKop.innerHTML + versie;
	
	// Plaatshouder
	var eImg			=	document.getElementById('plaatshouder');
	
	// Dynamische keuzelijst 
	var eKeuzelijst 	=	maakKeuzelijst(aModernArt);
	var eSidebar		=	document.querySelector('aside');
	eSidebar.appendChild(eKeuzelijst);
	eKeuzelijst.addEventListener("change", function(e) {
		var waarde 		=	this.value;
		console.log(waarde);
		if(waarde!="" && waarde!=null) {
			toonFoto(waarde, eImg)
		}
	});
	
} // einde window.onload

function maakKeuzelijst(a) {
	/* return SELECT element
	@	array van images */
	var nArt			=	a.length;
	var eSelect			=	document.createElement('select');
	eSelect.id			=	"keuzelijst";
	
	// Standard option element
	var eOption			=	document.createElement('option');
	eOption.innerHTML	=	"Maak een keuze";
	eOption.setAttribute("value", "");
	eSelect.appendChild(eOption);
	
	// Andere option elementen met artiesten
	for (var i = 0; i < nArt; i++) {
		var eOption			=	document.createElement('option');
		eOption.innerHTML	=	a[i][2];
		eOption.value		=	i;
		eSelect.appendChild(eOption);	
	}
	return eSelect;
	
}

function toonFoto(nIndex, eImg) {
	/* wisselt de bron van het src attribuut van de img#beeld
	@	nIndex, een hyperlink element
	@	eImg, plaatshouder img 
	@ 	aModernArt, array, global 	*/
	
	var aArt		=	aModernArt[nIndex];		// subarray
	var sPad		=	aArt[0];				// Source
	var sInfo		=	aArt[1];				// info
	var sNaam		= 	aArt[2];				// naam
	
	console.log(sPad, sInfo, sNaam);
	
	eImg.src	=	"../images/art/" + sPad;
	var eInfo	=	document.getElementById('info');
	
	if (eInfo) {
		// wijzig info
		eInfo.innerHTML		=	sInfo;
	}
	else {
		// maak nieuwe p#info aan
		var eInfo			=	document.createElement('p');
		eInfo.id			=	'info';
		eInfo.innerHTML		=	sInfo;
		eImg.parentNode.insertBefore(eInfo, eImg.parentNode.firstChild);
	}
}

