
function bubbles(c){
	
	var middelpunt_x    = 20;
	var middelpunt_y    = 20;
	var straal          = 16;

	var R = 255;
	var G = 255;
	var B = 0;
	
	for (var i=0;i<11;i++){  
       		for (var j=0;j<11;j++){  
			  R = (R<0)?255: 25 * i;
			  G = (G<0)?255: 25 * j;
			  var kleur = 'rgb(' + R + ',' + G + ',' + B + ')'
			  middelpunt_x = 20+j*30;
			  middelpunt_y = 20+i*30;
			  var middelpunt 	= new Punt(middelpunt_x,middelpunt_y);
			  var bol 		= new Cirkel(middelpunt, straal, kleur, kleur, true);
			  bol.teken(c);
			} 
		}
}

//*******************CONSTRUCTORS*******************************

function Punt(x,y){
	//constructor function voor een punt object
	this.x = x;
	this.y = y;
	}
	
function Veelhoek(arrPunten,lijnKleur,vulKleur){
	//returnt een Veelhoek
	//@arrPunten, array van Punt objecten
	//@lijnKleur, vulKleur, geldige CSS kleur
	
	this.punten 	= arrPunten || [];
	this.lijnKleur 	= lijnKleur;
	this.vulKleur 	= vulKleur;
	
	}
	
Veelhoek.prototype.teken = function(c,vullen){
	
	var vullen = vullen|| false;
				
	if(c){
		var ctx = c.getContext('2d');
		ctx.lineWidth = 10;
		ctx.strokeStyle = this.lijnKleur;
		ctx.fillStyle = this.vulKleur;
		ctx.beginPath();
		ctx.moveTo(this.punten[0].x,this.punten[0].y);
		for(var i=1;i<this.punten.length;i++){
			ctx.lineTo(this.punten[i].x,this.punten[i].y)
			}
		ctx.closePath();
		if (vullen===true)	ctx.fill();
		 ctx.stroke();
		}
	}

function Cirkel(middelpunt, straal, randKleur, vulKleur, vullen) {
	/*
	@middelPunt				Puntobject
	@straal					number, een pixellengte
	@randKleur,vulKleur		string, geldige kleur
	@vullen					boolean, opvullen of enkel rand tekenen
	*/
	this.middelpunt 	= middelpunt;
	this.straal 		= straal;
	this.randKleur 		= randKleur;
	this.vulKleur 		= vulKleur;
	this.vullen 		= vullen || false;
	}
	
Cirkel.prototype.teken = function(c) {
	if(c){
		var ctx = c.getContext('2d');
		ctx.strokeStyle = this.randKleur;
		ctx.fillStyle = this.vulKleur;
		ctx.beginPath();
		ctx.arc(this.middelpunt.x, this.middelpunt.y, this.straal,0, Math.PI*2,true); // 2 PI = volledige cirkel
		if(this.vullen===true){
			ctx.fill();
		 }
		else{
			ctx.stroke();
		}
		}
	} 

//===========================

