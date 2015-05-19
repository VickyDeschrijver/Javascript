/** Movies module: movies.js **/

console.log('movies.js geladen');

define([
    'jquery',
    'underscore',
    'backbone',
    'app/films'
], function($, _, Backbone, films) {
    // MODEL: film
    var Film    =   Backbone.Model.extend({
        defaults:   {
            filmNr:     0,
            titel:      "",
            beschrijving:   "",
            genre:      "",
            duur:       "",
            regisseur:  "",
            release:    "",
            foto:       "noimage.jpg"
        }
    })

    // COLLECTION: FilmCollectie
    var FilmCollectie   =   Backbone.Collection.extend({
        model:  Film
    })

    return {
        start: function() {
            console.log('movies.start()')
            var films   =   new FilmLijstView(arrFilms);
        }
    };
});
