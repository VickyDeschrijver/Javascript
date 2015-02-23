// JavaScript Document
// Feature Sensing


window.onload 	= 	function() {
	// Versie info
	var eKop			=	document.getElementById('browserversion');
	var eVersion		=	navigator.appVersion;
	eKop.innerHTML		=	eKop.innerHTML + "Uw browser: " + "<b>" + eVersion + "</b>";
	
	// noscript verbergen
	var eNoScript		=	document.getElementById('noscript');
	eNoScript.style.display	=	"none";
	
	// array laden	
	if(typeof aLijstFeatures == "undifined") {
		throw new Error("array aModernArt niet gevonden");
	}
	else {
		console.log("test - " + aLijstFeatures[0]);		// is arrayLijst aanwezig?	
	}
	
	var eOutput			=	document.querySelector('table');
	var antwoord 		= 	checkFeatures();
	eOutput.innerHTML	=	antwoord;
	
	
	
}	// einde window.onload

function checkFeatures(i, eCheck) {
	var lijstAantal		=	aLijstFeatures.length;
	
	// array inlezen
	for (var i=0; i < lijstAantal; i++) {
		var aLijst		=	aLijstFeatures[i][0];
		
		if (eval(aLijst)){		 						// eval = positief
			
			
			
							
			console.log("check" + (eval(aLijst)));
		} else { 										// eval = negatief
		
		console.log("CHOCK" + (eval(aLijst)));
		}

		//console.log(aLijst);
	}
	
	// tabel opmaken
	
	
	
	
}

