/** Movies module: movies.js **/

console.log('movies.js geladen');

define([
    'jquery',
    'underscore',
    'backbone'
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
            foto:       "noimage.jpg",
            cast:       []
        },
        idAttribute:    "_id"
    })

    // COLLECTION: FilmCollectie
    var FilmCollectie   =   Backbone.Collection.extend({
        model:  Film,
        url:    "/api/films"
    })

    // VIEW: één film
    var FilmView    =   Backbone.View.extend({
        tagName:    "div",
        className:  "film cf",
        template:   $("#filmTemplate").html(),
        initialize: function() {
            this.edits  =   {}
        },
        render:     function() {
            var tmpl    = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        },
        events: {
            'click .delete':    'deleteFilm',
            "dblclick *":       "edit",
            "keypress .edit":   "updateOnEnter",
            "blur .edit":       "close"
        },
        deleteFilm: function(e) {
            this.model.destroy();
            this.remove();
        },
        edit:       function(e) {
            //console.log('FilmView start editing: ', this.model);
            e.stopPropagation();
            var elm     =   e.currentTarget;
            //console.log('currentTarget: ' + elm);
            var $elm    =   $(elm);
            //console.log('$elm: ' + $elm);
            var waarde  =   $elm.html();
            var veldNaam    =   $elm.data('id');
            //console.log('veldnaam: ' + veldNaam);
            if(typeof veldNaam !== 'undefined') {
                this.edits[veldNaam]            =   {};
                this.edits[veldNaam].origVal    =   waarde;
                this.edits[veldNaam].editor     =   this.createTextarea(waarde);
                $elm.html('').append(this.edits[veldNaam].editor);
                this.edits[veldNaam].editor.focus();
            }
            //console.log('waarde: ' + waarde);
        },
        createTextarea: function(waarde) {
            return $("<textarea />").addClass('edit').val(waarde);
        },
        updateOnEnter:  function(e) {
            // als je enter drukt, is editing klaar
            if(e.keyCode == 13) {
                this.close(e);
            }
        },
        close:      function(e) {
            // afsluiten editing
            var elm     =   e.currentTarget;
            var $elm    =   $(elm);
            var veldNaam    =   $elm.parent().data('id');
            var waarde  =   $elm.val();

            if(waarde !== this.edits[veldNaam].origVal) {
                var oTemp   =   {};
                oTemp[veldNaam] =   waarde;
                this.model.save(oTemp);
                $elm.parent().html(waarde);
            } else {
                $elm.parent().html(this.edits[veldNaam].origVal);
            }
            $elm.remove();
            this.edits[veldNaam]    =   null;
        }
    })

    // VIEW: filmoverzicht
    var FilmLijstView   =   Backbone.View.extend({
        el: $("#films"),
        initialize: function(films) {
            var that    =   this;
            this.collection =   new FilmCollectie();
            this.collection.fetch({reset:true});
            //this.collection =   new FilmCollectie(films);           // data: object of JSON
            this.$lijst     =   this.get$Lijst();                    // maak ref naar lijst
            this.listenTo(this.collection, 'add', this.renderFilm);
            this.listenTo(this.collection, 'reset', this.render);
            //this.render();
        },
        get$Lijst:  function() {
            return this.$el.find('.lijst')
        },
        render:     function() {
            _.each(this.collection.models, function(item) {
                this.renderFilm(item);
            }, this);
            console.log("rendering collection: ", this.collection);
        },
        renderFilm: function(item) {
            var filmView    =   new FilmView({
                model:  item
            });
            this.$lijst.append(filmView.render().el);
        },
        addFilm:    function(e) {
            e.preventDefault();
            var formData    =   {};
            $velden         =   $('#frmFilm').find('input, textarea');
            $velden.each(function(i, el) {
                if($(el).val()!= '') {
                    formData[el.name]   =   $(el).val();
                }
            })

            if(formData.foto) {
                fotoFullPath    =   formData.foto;
                formData.foto   =   /([^\\]+)$/.exec(fotoFullPath)[1];
            }
            // split veld Cast in acteurs op basis van komma
            arrTemp =   []
            _.each(formData.cast.split(','), function(acteur) {
                arrTemp.push({'acteur': acteur});
            });
            formData.cast   =   arrTemp;
            //this.collection.add(new Film(formData));
            this.collection.create(formData);
            $velden.each(function(i, el) {
                $(el).val('');
            });
            console.log('addFilm formData: ', formData);
        },
        events: {
            "click #voegtoe":   "addFilm"
        }
    });

    return {
        start: function() {
            console.log('movies.start()')
            var films   =   new FilmLijstView();
        }
    };
});

