/**
 * Created by cyber05 on 25/03/2015.
 */

// bepaal huidige taal

var huidigeTaal     =   "";

window.onload 	= 	function() {




    //check arrays.js geladen
    if (typeof aLijstWoorden == 'undefined') {
        throw new Error('De lijst kan niet worden gelezen!!!');
    }
    else {



        // taal bepalen
        var tl  =   "";
        var elinkNl      =   document.getElementById('NL');
        var elinkFr      =   document.getElementById('FR');
        var elinkEng     =   document.getElementById('ENG');

        elinkNl.addEventListener('click', function() { zetTaal('NL')});
        elinkFr.addEventListener('click', function() { zetTaal('FR')});
        elinkEng.addEventListener('click', function() { zetTaal('ENG')});


        huidigeTaal =   tl;

        // tag cloud zetten
        var eKader		=	document.getElementById('cloudbox');
        var nArray		=	aLijstWoorden;

        var nAantalTags2=	aLijstWoorden.length;
        tagsMaken(eKader, aLijstWoorden);

    }






}	// einde window.onload

function zetTaal(taal) {
    switch (taal){
        case 'NL':
            tl =   0;
            break;
        case 'FR':
            tl =   1;
            break;
        case 'ENG':
            tl =   2;
            break;
    }


}
//--------------------------------------------

function tagsMaken(eKader, array) {
    /*	Functie maakt span elementen aan in container
     *	zet er kleur op - fonsize
     *	Bepaalt positie
     * */

    var nBreedte	=	eKader.offsetWidth;
    var nHoogte		=	eKader.offsetHeight;
    var nAantalTags	=	array.length;
	//console.log('breedte: ' + nBreedte);
	//console.log('hoogte: ' + nHoogte);

    for (var i=0; i<nAantalTags; i++) {
        var eTag	=	document.createElement('span');
        eTag.className	=	"tag";
        eTag.innerHTML	=	array [i][huidigeTaal];
		//console.log(eTag);

        // fontsize bepalen
        var nFontSize	=	Math.floor((Math.random()*(150-76))+1);
        //console.log('fontsize: ' + nFontSize + ' - ');

        eTag.style.fontSize	=	nFontSize + "px";
        eKader.appendChild(eTag);						//	zet inhoud in tagContainer
    }

    // plaats in tagContainer bepalen van span-elementen
    var plaatsTag	=	eKader.getElementsByTagName('span');

    for (var i=0; i<plaatsTag.length; i++) {
        var nTagBreedte		=	plaatsTag[i].offsetWidth;
        var nTagHoogte		=	plaatsTag[i].offsetHeight;
        var xPos			=	Math.floor((Math.random()*(nBreedte-nTagBreedte))+1);
        var yPos			=	Math.floor((Math.random()*(nHoogte-nTagHoogte))+1);

		//console.log(aLijstWoorden[i][1] + ' - breedte tag : '+ nTagBreedte + ' - hoogte tag : '+nTagHoogte );
		//console.log('xPos: '+ xPos + ' - yPos: ' + yPos);

        plaatsTag[i].style.left	=	(xPos + "px");
        plaatsTag[i].style.top	=	(yPos + "px");

    }






}