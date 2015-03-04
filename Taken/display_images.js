// Taalkeuze array
var aTalen = [
["Verberg foto","Toon Foto", "Verberg alle foto's","Toon alle foto's"],
["Cashez photo","Montrez photo", "Cacher toutes les photos","Montrer toutes les photos"],
["Hide pics","Show pics", "Hide all pics","Show all pics"]
];
var huidigeTaal= 0;


window.onload = function() {
	
	// noscript hide
	var eNoScript	=	document.getElementById('noscript');
	eNoScript.style.display	=	"none";
	
	//dom
	var pics 			= 	document.getElementsByClassName("screenshot");
	var hoofdknop 		= 	document.getElementById("hoofdknop");
	var onepic			=	document.getElementsByClassName("onepic");

	
	hoofdknop.status=1;
	
	//inhoud startpositie hoofdknop
	hoofdknop.innerHTML	=	aTalen[huidigeTaal][2]; 			// verberg alle foto's
	
	//create buttons
	for (i=0;i<pics.length;i++){
		var knop		=	document.createElement("button");
		knop.innerHTML 	=	aTalen[huidigeTaal][0]; 			//Verberg foto
		knop.setAttribute("id","knop"+i);
		knop.setAttribute("class","onepic");
		var targetnode 	=	pics[i].parentNode;
		targetnode.appendChild(knop);
	}
	
	//set onclick events	
	for (i=0;i<onepic.length;i++) {
		var item 		=	document.getElementById("knop"+i);
		item.onclick 	= 	function(){
		knopid 			= 	this.id;
		HidePic(knopid);
		}
	}
	hoofdknop.onclick	= 	function() {
	HideAll(pics,hoofdknop,onepic)
	}


	// ------- FUNCTIONS ------------
	// toon / verberg alles
	function HideAll(pics, hoofdknop){
		for (i=0;i<pics.length;i++){
			var items 		=	pics[i];
			if (hoofdknop.status==1){
				items.style.display =	"none";
			}
			else {
				items.style.display =	"block";
			}
		}

		//hoofdknop.status fix
		if (hoofdknop.status==1){
			hoofdknop.status	=	0;
			hoofdknop.innerHTML =	aTalen[huidigeTaal][3];		// "Toon alle fotos"
			for (i=0;i<onepic.length;i++){
				var item 			=	onepic[i];
				item.innerHTML 		=	aTalen[huidigeTaal][1];		// "Toon foto";
			}
		}
		else {
			hoofdknop.status	=	1;
			hoofdknop.innerHTML	=	aTalen[huidigeTaal][2];		//"Verberg alle fotos";
			for (i=0;i<onepic.length;i++){
				var item 		=	onepic[i];
				item.innerHTML 	=	aTalen[huidigeTaal][0];		//"Verberg foto";
			}
		}
		return hoofdknop;
	}

} //einde window.onload

// toon / verberg per foto
function HidePic(knopid) {
	var targetknop 	=	document.getElementById(knopid);
	var targetnode	= 	targetknop.parentNode.firstChild;
	if (targetnode.style.display != "none"){
		targetnode.style.display ="none";
		targetknop.innerHTML =	aTalen[huidigeTaal][1];		//"Toon foto";
	}
	else { targetnode.style.display =	"block";
		targetknop.innerHTML =	aTalen[huidigeTaal][0];		//"Verberg foto";
}
}