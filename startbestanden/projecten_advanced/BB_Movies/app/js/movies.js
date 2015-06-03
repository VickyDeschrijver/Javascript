/* Movies module:  movies.js */

console.log('movies.js geladen');

define([
    'jquery',
    'underscore',
    'backbone',
    'films'
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

    // COLLECTION: Filmcollectie
    var FilmCollectie   =   Backbone.Collection.extend({
        model:  Film,
        url:    "/api/films"
    })

    // VIEW: ��n film
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
            'dblclick *':       'edit',
            'keypress .edit':   'updateOnEnter',
            'blur .edit':       'close'
        },
        deleteFilm: function(e) {
            this.model.destroy();
            this.remove();
        },
        edit:   function(e) {
            e.stopPropagation();
            var elm         =   e.currentTarget;
            var $elm        =   $(elm);
            var waarde      =   $elm.html();
            var veldNaam    =   $elm.data('id');
            if(typeof veldNaam !== 'undefined') {
                this.edits[veldNaam]            =   {};
                this.edits[veldNaam].origVal    =   waarde;
                this.edits[veldNaam].editor     =   this.createTextarea(waarde);
                $elm.html('').append(this.edits[veldNaam].editor);
                this.edits[veldNaam].editor.focus();
            }
        },
        createTextarea: function(waarde) {
            return $("<textarea />").addClass('edit').val(waarde);
        },
        updateOnEnter:  function(e) {
            // Als je enter drukt is editing klaar
            if(e.keyCode == 13) {
                this.close(e)
            }
        },
        close:  function(e) {
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
    var FilmlijstView   =   Backbone.View.extend({
        el: $('#films'),
        initialize: function(films) {
            //this.collection =   new FilmCollectie(films);       // data: object of JSON
            this.collection =   new FilmCollectie();
            this.collection.fetch({reset:true});
            this.$lijst     =   this.get$Lijst();               // maak ref naar lijst
            //this.render();
            this.listenTo(this.collection, 'add', this.renderFilm);
            this.listenTo(this.collection, 'reset', this.render);
            this.listenToOnce(this.collection, 'reset', this.addSelect);
            this.listenTo(this.collection, 'sync', this.storeBaseCollection);
            this.listenTo(this, "change:filterType", this.filterByType);
        },
        get$Lijst:  function() {
            return this.$el.find('.lijst')
        },
        render:     function() {
            this.$lijst.empty();
            _.each(this.collection.models, function(item) {
                this.renderFilm(item);
            }, this);
            console.log("rendering collection: ", this.collection);
        },
        renderFilm: function(item) {
            var filmView    =   new FilmView({
                model: item
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
            this.collection.create(formData);   // REST api
            $velden.each(function(i, el) {
                $(el).val('');
            });
            console.log('addFilm formData: ', formData);
        },
        events: {
            "change #genres":   "setFilter",
            "click #voegtoe":   "addFilm"
        },
        getGenres:  function() {
            return _.uniq(this.collection.pluck("genre"), false, function(genre) {
                return genre.toLowerCase();
            });
        },
        createSelect:   function() {
            var select  =   $("<select id='genres'> <option value='all'> All </option> </select>");
            _.each(this.getGenres(), function(item) {
                var option  =   $("<option />", {
                    value:  item,
                    text:   item
                }).appendTo(select);
            });
            return select;
        },
        addSelect:  function() {
            $("#filter").append(this.createSelect());       // select toevoegen
        },
        storeBaseCollection:    function() {
            this.baseCollection     =   new Backbone.Collection(this.collection.models);
            console.log('storebasecollection: ', this.baseCollection);
        },
        setFilter:  function(e) {
            this.filterType = e.currentTarget.value;
            console.log('setFilter:', this.filterType);
            this.trigger("change:filterType");
        },
        filterByType:   function() {
            if(this.filterType === "all") {
                this.collection.reset(this.baseCollection.models)
            } else {
                this.collection.reset(this.baseCollection.models, {silent: true})
                var filtered    =   this.collection.where({genre: this.filterType})
                this.collection.reset(filtered);
            }
        }
    });

    return {
        start: function() {
            console.log('movies.start()')
            var films   =   new FilmlijstView(arrFilms);
        }
    };
});
