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

    var oSettings   =   {
        defaultView:    oViews.welkom,
        currentView:    oViews.welkom,
        adminKosten:    {
            verrichting:    1,
            afsluiten:      5
        },
        startKapitaal:  100
    };  // standaardinstellingen

    var oKlant  =   {};     // data klant

    //============ OPTIONS ===========
    var zetOpties   =   function(oDefaults, oOpties) {
        // overschrijf oSettings
        for(var key in oOpties || {}) {
            if(typeof oOpties[key] === 'object') {
                zetOpties(oDefaults[key], oOpties[key])
            }
            else {
                oDefaults[key]  =   oOpties[key];
            }
        }
    }


    //============ CONTROLLERS ===========
    var Controller      =   function(name) {
        this.name   =   name;           // enkel voor debug
        this.view   =   undefined;      // een controller heeft één view, toegekend door init functie
        this.boodschappen   =   {};
    }

    Controller.prototype.init           =   function() {};          // abstract
    Controller.prototype.updateView     =   function() {};          // abstract
    Controller.prototype.debug          =   function() {
        var txt =   "Controller " + this.name + " opgestart met view " + this.view.elements.root.attr('id');
        console.log(txt);
    };
    Controller.prototype.showView       =   function() {
        // verberg andere view indien verschillend
        if(oSettings.currentView != this.view) {
            oSettings.currentView.elements.root.hide();
        }
        // toon deze view
        this.view.elements.root.show(300);          // JQ
        oSettings.currentView   =   this.view;
        console.log("showing view: " + this.view.elements.root);
    };
    Controller.prototype.hideView       =   function() {
        this.view.rootEl.hide();            // JQ
        console.log("hiding view: " + this.view.elements.root);
    };

    Controller.prototype.toonBoodschappen       =   function(type) {
        // toont de boodschapContainer
        // @type    = Bootstrap class: alert-error, alert-success, alert-info, alert-block
        console.log(this.boodschappen);
        if(!$.isEmptyObject(this.boodschappen)) {
            // lus doorheen alle berichten en produceer een unorderd list
            var str     =   "";
            for(var key in this.boodschappen) {
                str     +=  "<li>" + this.boodschappen[key] + "</li>";
            }
            $foutBoks   =   this.view.elements.boodschapBox;
            $foutBoks.removeClass("alert-error alert-success alert-info alert-block").addClass(type);           // Bootstrap class
            $foutBoks.find('ul').html(str);
            $foutBoks.show();
        }
    };
    Controller.prototype.verbergBoodschappen    =   function() {
        // verberg boodschap container
        this.view.elements.boodschapBox.hide();
    };
    Controller.prototype.zetBoodschap           =   function(oBericht) {
        // voeg boodschap toe aan object boodschappen volgens zijn key: op die manier nooit tweemaal dezelfde
        for(var j in oBericht) {
            this.boodschappen[j]    =   oBericht[j];            // bestaande keys worden overschreven
        }
    };
    Controller.prototype.clearBoodschappen      =   function() {
        // verwijder alle boodschappen
        this.boodschappen   =   {};
    };

    Controller.prototype.validateBedrag =   function(el) {
        var sBedrag =   el.val();
        console.log("validateBedrag, sBedrag: " + sBedrag);
        // vervang belgische komma's
        var re      =   /,/;
        sBedrag     =   sBedrag.replace(re, '.');
        if($.isNumeric(sBedrag)) {
            // OK
            return parseFloat(sBedrag);
        }
        else {
            // NOK
            var oBericht    =   {};
            var sleutel     =   "numeric_" + el.attr('name');
            oBericht[sleutel]   =   "<strong>" + el.attr('name') + "</strong>: u moet een correct bedrag ingeven";
            this.zetBoodschap(oBericht);
            return false;
        }
    };
    Controller.prototype.validateTekst  =   function(el) {
        var sTekst  =   el.val();
        if(sTekst == "") {
            // NOK
            var oBericht    =   {};
            var sleutel     =   "text_ + el.attr('name";
            oBericht[sleutel]   =   "<strong>" + el.attr('name') + "</strong>: u moet een geldige tekst ingeven";
            this.zetBoodschap(oBericht);
            return false;
        }
        else {
            // OK
            return sTekst;
        }
    };
    Controller.prototype.validateEmail  =   function(el) {
        var sTekst      =   el.val();
        var emailReg    =   /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
        if(sTekst == "" || !emailReg.test(sTekst)) {
            // NOK
            var oBericht    =   {};
            var sleutel     =   "email_" + el.attr('name');
            oBericht[sleutel]   =   "<strong>" + el.attr('name') + "</strong>: dit is geen geldig emailadres";
            this.zetBoodschap(oBericht);            // post de boodschap
            return false;
        }
        else {
            // OK
            return sTekst;
        }
    };


    //++++++++++ welkomcontroller ++++++++++
    var welkomController    =   new Controller("welkomController");
    /*
    * behandelt de beginsituatie (zonder cookies) en het opstarten van de rekening
     */

    welkomController.initView   =   function() {
        /*
         initialiseert de view
         */
        // verwijder eventuele voorgaande foutboodschappen
        this.clearBoodschappen();

        var els =   this.view.elements;         // shortcut

        // dynamische startboodschap invullen
        var sWelkom =   "Nu een rekening openen = " + oSettings.startKapitaal + " &euro; startkapitaal ontvangen!";
        els.intro.html(sWelkom);

        // hide de well
        els.well.hide();

        // zet alle velden leeg
        els.inputVoornaam.val("");
        els.inputFamilienaam.val("");
        els.inputEmail.val("");
        els.inputWachtwoord.val("");
    }

    welkomController.init       =   function(view) {
        var me      =   this;           // delegation voor eventhandlers
        this.view   =   view;
        this.debug();
        var els     =   this.view.elements;         // shortcut

        // event handler 'open rekening' knop
        els.btnInschrijven.on("click", function() {
            els.well.show('slow');
        });
        // event handler 'bevestigen' knop
        els.btnSubmit.on("click", function() {
            // alles OK: save data, maak cookie
            // eerste maal?
            var voornaam    =   me.validateTekst(els.inputVoornaam);
            var familienaam =   me.validateTekst(els.inputFamilienaam);
            var email       =   me.validateEmail(els.inputEmail);
            var wachtwoord  =   me.validateTekst(els.inputWachtwoord);

            if(voornaam !== false && familienaam !== false && email != false && wachtwoord !== false) {
                oKlant.voornaam     =   voornaam;
                oKlant.familienaam  =   familienaam;
                oKlant.email        =   email;
                oKlant.wachtwoord   =   wachtwoord;
                oKlant.saldo        =   oSettings.startKapitaal;

                schrijfCookie(oKlant);
                appController();            // terug naar boven
            }
            else {
                me.toonBoodschappen("alert-error");
                return;
            }
        });

        // dynamische startboodschap
        var sWelkom     =   "Nu een rekening openen = " + oSettings.startKapitaal + " &euro; startkapitaal ontvangen!";
        els.intro.html(sWelkom);
        this.initView();
        this.showView();
    };



    //++++++++++ klantcontroller ++++++++++
    var klantController    =   new Controller("klantController");
    /*
     * behandelt alle financiële verrichtingen van de rekening
     */
    klantController.init        =   function(view) {
        var me      =   this;           // delegation voor eventhandlers
        this.view   =   view;
        this.debug();
        var els     =   this.view.elements;         // shortcut

        // event handlers knoppen
        // bedrag storten - knop '+'
        els.btnStorten.on("click", function() {
            // storten
            var el      =   els.inputBedrag;            // inputelement
            var waarde  =   me.validateBedrag(el);          // return float / false
            if (waarde === false) {
                me.toonBoodschappen("alert-error");
                el.val("");
            }
            else {
                me.clearBoodschappen();
                me.verbergBoodschappen();
                me.storten(waarde);
                me.updateView();
            }
        });

        // bedrag afhalen - knop '-'
        els.btnAfhalen.on("click", function() {
            // afhalen
            var el      =   els.inputBedrag;
            var waarde  =   me.validateBedrag(el);
            if(waarde !== false) {
                // bedrag OK
                var maxBedrag   =   me.afhalen(waarde);
                if(maxBedrag !== true) {
                    el.val(maxBedrag);
                    el.focus();
                    me.toonBoodschappen("alert-error");
                }
                else {
                    // clear alle fouten
                    me.clearBoodschappen();
                    me.verbergBoodschappen();
                    me.updateView();
                }
            }
            else {
                // bedrag NOK
                me.toonBoodschappen("alert-error");
            }
        });

        // rekening sluiten
        els.btnRekSluiten.on("click", function() {
            // rekening sluiten: over nr exitController
            exitController.init(oViews.exit);
        });

        // update view
        this.updateView();
        // dynamische startboodschap invullen
        var sWelkom =   "Cookiebank rekent" + oSettings.adminKosten.verrichting + " &euro; per verrichting";
        els.intro.html(sWelkom);
        // toon view
        this.showView();
    };

    klantController.storten     =   function(bedrag) {
        /*
        @bedrag     float, gestort bedrag
         */
        oKlant.saldo    =   oKlant.saldo + bedrag;
        schrijfCookie(oKlant);
        return true;
    };

    klantController.afhalen     =   function(bedrag) {
        /*
        @bedrag     float, gewenst bedrag
         */
        var nieuwSaldo  =   oKlant.saldo - bedrag - oSettings.adminKosten.verrichting;

        if(nieuwSaldo < 0) {
            // onvoldoende
            var mogelijkBedrag  =   oKlant.saldo - oSettings.adminKosten.verrichting;
            var strBericht      =   "Uw saldo is onvoldoende om dit bedrag af te halen. ";
            strBericht          +=  "Hou ook rekening met de administratieve kosten van " + oSettings.adminKosten.verrichting + "&euro;";
            strBericht          +=  " U kunt maximaal " + mogelijkBedrag + " &euro; afhalen.";
            var oBericht        =   {"onvoldoendeSaldo":strBericht};
            this.zetBoodschap(oBericht);
            return mogelijkBedrag;
        }
        else {
            // OK
            oKlant.saldo    =   nieuwSaldo;
            schrijfCookie(oKlant);
            console.log("bedrag afgehaald: " + bedrag);
            return true;
        }
    };

    klantController.updateView  =   function() {
        /*
        update de data, specifiek aan deze klantview
         */
        var els         =   this.view.elements;
        els.titel.html("welkom " + oKlant.voornaam);
        els.inputSaldo.val(oKlant.saldo);
        els.inputBedrag.val("");
    };

    //++++++++++ exitcontroller ++++++++++
    var exitController    =   new Controller("exitController");
    /*
     * behandelt het afsluiten van de rekening
     */
    exitController.init         =   function(view) {
        var me      =   this;           // delegation voor eventhandlers
        this.view   =   view;
        this.debug();
        var els     =   this.view.elements;         // shortcut

        // event handlers knoppen
        // cancel rek afsluiten
        els.btnTerug.on("click", function() {
            me.clearBoodschappen();
            me.verbergBoodschappen();
            appController();
        });

        // bevestig rek afsluiten
        els.btnBevestigRekSluiten.on("click", function() {
            var waarde  =   me.rekAfsluiten();
            if(waarde === true) {
                // OK
                els.welleen.hide();
                els.welltwee.show();
                me.toonBoodschappen("alert-info");
            }
            else {
                // NOK
                me.toonBoodschappen("alert-error");
            }
        });

        // ga door knop
        els.btnGaDoor.on("click", function() {
            appController();
        });
        this.showView();
    };

    exitController.rekAfsluiten =   function() {
        // rekening afsluiten en cookie verwijderen
        var restSaldo   =   oKlant.saldo - oSettings.adminKosten.afsluiten;
        if(restSaldo < 0) {
            // te weinig saldo
            var strBericht  =   "Het resterende saldo, " + oKlant.saldo;
            strBericht      +=  " (€), is onvoldoende om de administratieve kosten, " + oSettings.adminKosten.afsluiten;
            strBericht      +=  " &euro;, voor het afsluiten van uw rekening op te vangen. <br>";
            strBericht      +=  "We kunnen uw rekening helaas niet afsluiten, gelieve uw lokaal bankkantoor te raadplegen.";
            var oBericht    =   {"onvoldoendeAfsluiten": strBericht};
            this.zetBoodschap(oBericht);
            return false;
        }
        else {
            // OK
            verwijderCookie();
            oKlant  =   {};
            var strBericht  =   "Uw rekening werd afgesloten <br>";
            strBericht      +=  "U ontvangt het resterende saldo,(" + oKlant.saldo + " &euro;), minus de administratieve kosten,(" + oSettings.adminKosten.afsluiten + "&euro;)<br>";
            strBericht      +=  "Cookiebank dankt u voor het vertrouwen, hopelijk tot ziens!";
            var oBericht    =   {"afsluiten": strBericht};
            this.zetBoodschap(oBericht);
            console.log("rekening afgesloten met restbedrag: " + restSaldo);
            return true;
        }
    };



    //============ Cookie Functies ===========
    var leesCookie      =   function() {
        // leest JSON cookie, return boolean
        if($.cookie('klant')) {
            var oCookie = $.cookie('klant');
            // populatie oKlant object
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


    //============ appController ===========
    var appController   =   function() {
        // delegeert naar viewcontrollers
        if(!$.isEmptyObject(oKlant)) {
            // oKlant ingevuld: klantview
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

    //============ Init ===========
    var init    =   function(opties) {
        //console.log("test jQuery version: " + $.fn.jquery);

        // startup vars
        $.cookie.json   =   true;
        var tijd        =   dNu.toLocaleTimeString();
        zetOpties(oSettings, opties);           // overschrijf defaults
        appController();
        return me + " opgestart op " + tijd;
    }



    // het return object = public
    return {
        init:   init

    };
}(jQuery));