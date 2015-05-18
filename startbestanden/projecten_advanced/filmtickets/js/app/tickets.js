/** TICKETS **/

define(['app/cinemas', 'app/films', 'app/makeHtml'], function(cinemas, films, Html) {
    // return object met properties en functies
    return {
        elements:   { },
        koopModule: function() {
            // maakt de keuzelijsten
            console.log("Function: koopModule");
            var me  =   this;
            this.elements.cinemas   =   cinemas.keuzelijst("cin");
            this.elements.films     =   films.keuzelijst("films");
            this.elements.aantal    =   Html.makeInput({"id":"aantal","class":"mijnInput","type":"number"});
            this.elements.knop      =   Html.makeButton("Koop tickets",{"id":"deKnop","class":"mijnKnop","type":"button"});
            this.elements.knop.on("click", function() {
                me.bestel(this);
            })
            return $("<div>").append(this.elements.cinemas, this.elements.films, this.elements.aantal, this.elements.knop);
        },
        bestel:     function(el) {
            // bestelfunctie
            var welkeCinema     =   this.elements.cinemas.val();
            var welkeFilm       =   this.elements.films.val();
            var aantal          =   this.elements.aantal.val();
            console.log("u kocht " + aantal + " tickets voor de film '" + welkeFilm + "' in " + welkeCinema);
        }
    }
});