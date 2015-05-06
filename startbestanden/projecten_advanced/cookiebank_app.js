/* Cookiebank App */

var cookieBank  =   (function($) {
    // private
    var me      =   "cookieBank";
    var dNu     =   new Date();
    var oViews 	=   {
        welkom: {
            elements:{
                "root"				: $('#view_welkom'),
                "titel"				: $('#view_welkom > h4'),
                "intro"				: $('#view_welkom .intro'),
                "well"				: $('#view_welkom .well'),
                "form"				: $('#view_welkom form'),
                "btnInschrijven"	: $('#btnInschrijven'),
                "inputVoornaam"		: $('input[name=voornaam]'),
                "inputFamilienaam"	: $('input[name=familienaam]'),
                "inputEmail"		: $('input[name=email]'),
                "inputWachtwoord"	: $('input[name=wachtwoord]'),
                "btnSubmit"			: $('#btnSubmit'),
                "boodschapBox"		: $('#view_welkom div.alert')
            }
        },
        klant: {
            elements:{
                "root"				: $('#view_klant'),
                "titel"				: $('#view_klant > h4'),
                "intro"				: $('#view_klant .intro'),
                "well"				: $('#view_klant  .well'),
                "form"				: $('#view_klant form'),
                "inputSaldo"		: $('input[name=saldo]'),
                "inputBedrag"		: $('input[name=bedrag]'),
                "btnStorten"		: $('#btnStorten'),
                "btnAfhalen"		: $('#btnAfhalen'),
                "btnRekSluiten"		: $('#btnRekSluiten'),
                "boodschapBox"		: $('#view_klant div.alert')
            }

        },
        exit: {
            elements:{
                "root"				: $('#view_exit'),
                "titel"				: $('#view_exit > h4'),
                "boodschapBox"		: $('#view_exit div.alert'),
                "welleen"			: $('#view_exit  .well.een'),
                "welltwee"			: $('#view_exit  .well.twee'),
                "btnTerug"			: $('#btnTerug'),
                "btnBevestigRekSluiten"		: $('#btnBevestigRekSluiten'),
                "btnGaDoor"			: $('#btnGaDoor')
            }
        }
    }
    var oKlant  =   {};         // Data klant
    var oSettings   =   {
        defaultView:    oViews.welkom,
        currentView:    oViews.welkom,
        adminOnkosten:  {
            verrichting:    1,
            afsluiten:      5
        },
        startKapitaal:  100
    };  // standaardinstellingen


    //=========== Controllers ==============
    var Controller  =   function(name) {
        this.name   =   name;           // enkel voor debug
        this.view   =   undefined;      // een controller heeft één view
        this.boodschappen   =   {};     // object voor boodschappen
    }
    Controller.prototype.init       =   function() {};      // abstract
    Controller.prototype.updateView =   function() {};      // abstract
    Controller.prototype.debug      =   function() {
        var txt     =   "Controller " + this.name + " opgestart met view " + this.view.elements.root.attr('id');
        console.log(txt);
    };
    Controller.prototype.showView   =   function() {
        // verberg andere view indien verschillend
        if(oSettings.currentView != this.view) {
            oSettings.currentView.elements.root.hide();
        }
        // Toon deze view
        this.view.elements.root.show(300);      //JQ
        oSettings.currentView   =   this.view;
    };
    Controller.prototype.hideView   =   function() {
        this.view.rootEl.hide();                // JQ
    };
    Controller.prototype.toonBoodschappen   =   function(type) {
        /* Toont de booschappencontainer
        @type   bootstrap class: alert-error, alert-success, alert-info, alert-block
         */
        if(!$.isEmptyobject(this.boodschappen)) {
            // Lus doorheen alle berichten en produceer een unorderd list
            var str =   "";
            for(var key in this.boodschappen) {
                str +=  "<li>" + this.boodschappen[key] + "</li>";
            }
            $foutboks   =   this.view.elements.boodschapBox;
            $foutboks.removeClass("alert-error alert-success alert-info alert-block").addClass(type);       // Bootstrap class
            $foutboks.find("ul").html(str);
            $foutboks.show();
        }
    };



    //=========== Cookie functies ==============
    var leesCookie  =   function() {
        // leest JSON cookie, return boolean
        if($.cookie('klant')) {
            var oCookie     = $.cookie('klant');
            // populate oKlant object
            oKlant.voornaam     =   oCookie.voornaam;
            oKlant.familienaam  =   oCookie.familienaam;
            oKlant.email        =   oCookie.email;
            oKlant.wachtwoord   =   oCookie.wachtwoord;
            oKlant.saldo        =   oCookie.saldo;
            console.log("oKlant: " + oKlant);
            return true;
        }
        else {
            console.log('cookie niet gevonden: ');
            return false;
        }
    }

    var schrijfCookie   =   function(oKoekie) {
        // schrijft JSON cookie
        var jsonKoekie  =   JSON.stringify(oKoekie);
        console.log("oKoekie: " + oKoekie);
        $.cookie('klant', jsonKoekie);
        console.log('cookie geschreven: ' + jsonKoekie);
    }

    var verwijderCookie =   function() {
        // delete JSON cookie
        $.removeCookie('klant');
    }


    //=========== AppController ==============
    var AppController   =   function() {
        // delegeert naar viewconrollers
        if(!$.isEmptyObject(oKlant)) {
            // oKlant ingevuld klantview
            klantController.init(oViews.klant);
        }
        else {
            // geen oKlant
            var antw    =   leesCookie();
            if(antw === false) {
                // geen cookie
                welkomController.init(oViews.welkom);
            }
            else {
                // terugkerende klant
                klantController.init(oViews.klant);
            }
        }
    }


    //=========== Init ==============
    var init    =   function() {
        var tijd    =   dNu.toLocaleTimeString();
        //console.log($.fn.jquery);
        AppController();
        return me + " opgestart op " + tijd;
    }
    // het return object = public
    return {
        init:   init

    };
}(jQuery));
