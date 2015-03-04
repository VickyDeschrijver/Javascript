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
	
	//check aLijstFeatures array geladen
  	if (typeof aLijstFeatures == 'undefined') {
    	throw new Error('aLijstFeatures array komt er niet door!!!');
 	 } else {
    
	//elements
    var eOutput = document.getElementById('lijst');
    var eList = document.createElement('ul');
	
	//Doorloop aLijstFeatures
    for (var i = 0; i < aLijstFeatures.length; i++) {
      //maak lijstItem
      var eItem = document.createElement('li');
      var featureSpan = document.createElement('span');
      var supportedSpan = document.createElement('span');
      featureSpan.className = 'col1';
      featureSpan.innerHTML = aLijstFeatures[i][1];
      supportedSpan.className = 'col2';
      //kolom toevoegen eItem
      eItem.appendChild(featureSpan);
      eItem.appendChild(supportedSpan);
      //check feature
      if (aLijstFeatures[i][0]) {
        //feature supported
        //add Yes to col2
        supportedSpan.innerHTML = 'JA het werkt!';
        //add .support class to eItem
        eItem.className = 'JA';
      } else {
        //feature not supported
        //add No to col2
        supportedSpan.innerHTML = 'NEE het werkt hier niet.';
        //add .nosupport class to eItem
        eItem.className = 'NEE';
      }
      //add eItem to eList
      eList.appendChild(eItem);
    }
    //output eList
    eOutput.appendChild(eList);
  }

	
}	// einde window.onload

