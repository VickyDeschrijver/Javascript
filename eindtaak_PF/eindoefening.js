/* JS eindoefening - webshop groentenwinkel */

var aGroenten   =   [
    ["aardappelen",0.95,"kg"],
    ["avocado",2.69,"stuk"],
    ["bloemkool",1.93,"stuk"],
    ["broccoli",1.29,"stuk"],
    ["champignons",0.89,"250g"],
    ["chinese kool",1.59,"stuk"],
    ["groene kool",1.69,"stuk"],
    ["knolselder",1.29,"stuk"],
    ["komkommer",2.49,"stuk"],
    ["kropsla",1.69,"stuk"],
    ["paprika",0.89,"net"],
    ["prei",2.99,"bundel"],
    ["princessenbonen",1,"250g"],
    ["rapen",0.99,"bundel"],
    ["kropsla",1.69,"stuk"],
    ["rode kool",1.39,"stuk"],
    ["sla iceberg",1.49,"stuk"],
    ["spinazie vers",1.89,"300g"],
    ["sjalot",0.99,"500g"],
    ["spruiten",1.86,"kg"],
    ["trostomaat",2.99,"500g"],
    ["ui",0.89,"kg"],
    ["witloof 1ste keus",1.49,"700g"],
    ["wortelen",2.59,"kg"],
    ["courgetten",1.5,"stuk"]
];

var aWinkels    =   [
    {naam:"de fruitmand",adres:"steenstraat 34", post:8000,gemeente:"Brugge",tel:"050342218",manager:"Francine Lapoule"},
    {naam:"Jos & Anneke",adres:"visserijstraat 1", post:8400,gemeente:"Oostende",tel:"059463689",manager:"Jos Leman"},
    {naam:"groene vingers",adres:"hoogstraat 108", post:9000,gemeente:"Gent",tel:"091342218"},
    {naam:"de buurtwinkel",adres:"die laene 22", post:2000,gemeente:"Antwerpen",tel:"0230342218",manager:"Bert Simoens"}
];


//--------- validation ----------------
var oFouten     =   {
    required:{
        // veld van hoeveelheid mag niet leeg zijn
        msg:    "Geef een aantal/gewicht (groter dan 0) in voor uw bestelling",
        test:   function(elem) {
            return elem.value != "" && elem.value > 0 ;
        }
    },
    winkel :{
        //er moet een winkel gekozen worden
        msg:    "Kies aub een winkel voor uw bestelling",
        test:   function(elem){
            return elem.value !="";
        }
    },
    groente:{
        // er moet een product gekozen worden
        msg:    "Gelieve een product te kiezen",
        test:   function(elem) {
            return elem.value !="";
        }
    }
}

var winkelmandArray     =   new Array();

window.onload   =   function() {

    // DOM referenties
    var eFrmBestel  =   document.frmBestel;
    var eWinkel     =   document.frmBestel.winkel;
    var eGroente    =   document.frmBestel.groente;
    var eAantal     =   document.frmBestel.aantal;
    var nAantal     =   eAantal.value;
    var eKnop       =   document.getElementById('toevoegen');


    // winkels toevoegen aan keuzelijst
    for (var i=0; i < aWinkels.length; i++) {
        var eOptionWinkel       =   document.createElement('option');
        eOptionWinkel.setAttribute("value", aWinkels[i].naam);
        eOptionWinkel.setAttribute("title", aWinkels[i].adres + ", " + aWinkels[i].post + " " + aWinkels[i].gemeente);
        var sWinkel             = document.createTextNode(aWinkels[i].naam);
        eOptionWinkel.appendChild(sWinkel);
        eWinkel.appendChild(eOptionWinkel);
    }

    // producten toevoegen aan keuzelijst
    for (var j=0; j < aGroenten.length; j++) {
        var eOptionGroente      =   document.createElement('option');
        eOptionGroente.setAttribute("value", j);
        eOptionGroente.setAttribute("title", aGroenten[j][0]);
        var sGroenten           =   document.createTextNode(aGroenten[j][0] + ": " + aGroenten[j][1] + " per " + aGroenten[j][2])
        eOptionGroente.appendChild(sGroenten);
        eGroente.appendChild(eOptionGroente);
    }

    // event handlers
    eKnop.addEventListener('click', function(e) {
        e.preventDefault();
        var bValid              = valideer(eFrmBestel);
        if(bValid === true) {toevoegen();}
    });     // Knop voegt producten bij in het mandje


}   // einde window.onload

function valideer(frm){
    var bValid = true;

    //elementen van formuler aflopen
    for(var i=0;i<frm.elements.length;i++){
        //verwijder vorige boodschappen
        hideErrors(frm.elements[i]);
        //valideer veld
        var bVeld = valideerVeld(frm.elements[i]);
        //console.log("het element %S met naam %s valideert %s",
        //    frm.elements[i].nodeName,frm.elements[i].name,bVeld);
        if(bVeld === false){
            bValid = false;
        }
    }
    return bValid;
}

function valideerVeld(elem){
    //valideert ��n veld volgens zijn class

    var aFoutBoodschappen = [];

    for(var fout in oFouten){
        var re = new RegExp("(^|\\s)" + fout + "(\\s|$)");
        //fouten class aanwezig?
        if(re.test(elem.className)){
            var bTest = oFouten[fout].test(elem);
            //console.log("het element %s met name %s wordt gevalideert voor %s: %s",
            //    elem.nodeName, elem.name, fout, bTest);
            if(bTest===false)    {
                aFoutBoodschappen.push(oFouten[fout].msg);
            }
        }
    }
    if(aFoutBoodschappen.length>0){
        showErrors(elem, aFoutBoodschappen);
    }
    return!(aFoutBoodschappen.length>0);

}

function showErrors(elem, aErrors){
    //toont alle fouten voor een element
    //@elem     : element, te valideren veld
    //@aErrors  : array met de evt fouten voor dit element
    var eBroertje           = elem.nextSibling;
    if(!eBroertje || !(eBroertje.nodeName == "UL" && eBroertje.className == "fouten")){
        eBroertje           = document.createElement('ul');
        eBroertje.className = "fouten";

        elem.parentNode.insertBefore(eBroertje, elem.nextSibling);
    }
    //fouten worden er in geplaatst
    for(var i=0;i<aErrors.length;i++){
        var eLi             = document.createElement('li');
        eLi.innerHTML       = aErrors[i];
        eBroertje.appendChild(eLi);
    }
}

function hideErrors(elem){
    //verbergt alle foutboodschappen
    var eBroertje           = elem.nextSibling;
    if(eBroertje && eBroertje.nodeName == "UL" && eBroertje.className == "fouten"){
        elem.parentNode.removeChild(eBroertje);
    }
}

function toevoegen() {
    /* toevoegen van bestellingen */

    maakArray();

    maakLijst(winkelmandArray);
    //console.log("tabel met array: " + winkelmandArray);
}

function maakArray () {
    /* een nieuwe lijn maken van een besteld product + berekenen prijs */
    var eGroenteValue   =   document.frmBestel.groente.value;
    var eGroenteNaam    =   aGroenten[eGroenteValue][0];
    var eGroentePrijs   =   aGroenten[eGroenteValue][1];
    var eAantal         =   document.getElementById('aantal');
    var pAantal         =   eAantal.value;
    var nAantal         =   parseInt(pAantal);
    var nTotaal         =   eGroentePrijs * nAantal;
    var aGroenteLijn    =   new Array(eGroenteNaam, eGroentePrijs, nAantal, nTotaal);
    // console.log('mandje: ' + aGroenteLijn);

    for (var i=0; i < winkelmandArray.length; i++) {
        if(aGroenteLijn[0] == winkelmandArray[i][0]) {
            var aantallen   =   winkelmandArray[i][2] + parseInt(aGroenteLijn[2]);
            var totalen = winkelmandArray[i][3] + parseInt(aGroenteLijn[3]);
            winkelmandArray[i][2] = aantallen;
            winkelmandArray[i][3] = totalen;
            aGroenteLijn ="";
        }
    }

    if (aGroenteLijn != "") {
        winkelmandArray.push(aGroenteLijn);
    }
}

function maakLijst(array) {
    /* maakt een tabel aan met gekozen producten en hoeveelheden + plaatst prijs
    @array      array, aangemaakte groentelijn vanuit function toevoegen
     */
    var winkelmand      =   document.getElementById('winkelmandje');
    var tabel           =   document.getElementById('leeg');
    var totaalDiv       =   document.getElementById('totaal');
    var eTotaal         =   document.getElementById('totNum');
    tabel.innerHTML     =   "";

    var nTotaal         =   0;
    var aBoodschappen   =   new Array();

    for(var i=0; i < array.length; i++) {
        var divRij    =   document.createElement('div');
        divRij.setAttribute("id", array[i][0]);
        divRij.setAttribute("class", "Rij");
        tabel.appendChild(divRij);
        nTotaal         +=  array[i][3];
        eTotaal.innerHTML   =   nTotaal.toFixed(2);         // maar twee decimalen

        for(var j=0; j < array[i].length; j++) {
            if(j == 0) {
                var spanItem      =   document.createElement('span');
                spanItem.setAttribute("class", "cellinks");
                var sItem           =   array[i][j];
                var nItem           =   document.createTextNode(sItem.toString());
                spanItem.appendChild(nItem);
                divRij.appendChild(spanItem)
            }
            else {
                spanItem          =   document.createElement('span');
                spanItem.setAttribute("class", "cellinks");
                sItem               =   parseInt(array[i][j]*100)/100;
                console.log(array[i][j] + " " + sItem);
                var nTal            =   document.createTextNode(sItem.toString());
                spanItem.appendChild(nTal);
                divRij.appendChild(spanItem);

                if(j == 3) {
                    spanItem.setAttribute("class", "celrechts");
                    spanItem.setAttribute("id", "subT");
                }

                if(j == 2) {
                    spanItem.setAttribute("id", "aanT");
                }

            }
        }
    }


}