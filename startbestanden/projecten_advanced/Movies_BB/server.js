/*
REST server.js voor Movies_BB
met Express en MongoDB
 */

// dependencies
var application_root    =   __dirname,
    express     =   require('express'),
    path        =   require('path'),
    mongoose    =   require('mongoose')

// server
var app =   express();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, 'app')));            // map van waaruit static content getoond moet worden
    app.use(express.errorHandler({dempExceptions: true, showStack: true}));         // toon alle fouten
})

// connect to mongodb met mongoose
mongoose.connect('mongodb://localhost/filmotheek');

// Film schema
var Cast    =   new mongoose.Schema({
    acteur:     String
})

var Film    =   new mongoose.Schema({
    filmNr:     Number,
    titel:      String,
    beschrijving:   String,
    genre:      String,
    duur:       String,
    regisseur:  String,
    release:    Date,
    foto:       String,
    cast:       [Cast]
})



//MongoDB Model
var FilmModel   =   mongoose.model('Film', Film);

// ROUTES ==============

// GET /api: een test
app.get('/api', function(request, response) {
    response.send('Filmotheek is actief');
})

// GET /api/films: alle films tonen
app.get('/api/films', function(request, response) {
    return FilmModel.find(function(err, films) {
        if(!err) {
            response.send(films);
        } else {
            return console.log(err);
        }
    })
})

// GET /api/films/id: get een enkele film bij id
app.get('/api/films/:id', function(request, response) {
    if(!err) {
        response.send(film);            // één film
    } else {
        return console.log(err);
    }
})

// POST /api/films: film toevoegen
app.post('/api/films', function(request, response) {
    var film    =   new FilmModel({
        filmId:     request.body.filmId,
        titel:      request.body.titel,
        beschrijving:      request.body.beschrijving,
        genre:      request.body.genre,
        duur:       request.body.duur,
        regisseur:  request.body.regisseur,
        release:    request.body.release,
        foto:       request.body.foto,
        cast:       request.body.cast
    });

    film.save(function(err) {
        if(!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    })
    return response.send(film);
});

// UPDATE /api/films/id: update een film
app.post('/api/films/:id', function(request, response) {
    console.log('updating film ' + request.body.titel);
    return FilmModel.findById(request.params.id, function (err, film) {
            film.filmId     = request.body.filmId,
            film.titel      = request.body.titel,
            film.beschrijving = request.body.beschrijving,
            film.genre      = request.body.genre,
            film.duur       = request.body.duur,
            film.regisseur  = request.body.regisseur,
            film.release    = request.body.release,
            film.foto       = request.body.foto,
            film.cast       = request.body.cast

        return film.save(function (err) {
            if (!err) {
                console.log('film geupdated');
                return response.send(film);
            } else {
                return console.log(err);
            }
        });
    })
})

// VERWIJDER /api/films/id verwijder via id
app.delete('/api/films/:id', function(request, response) {
    console.log('verwijderen film met id ' + request.params.id);
    return FilmModel.findById(request.params.id, function(err, film) {
        return film.remove(function(err) {
            if(!err) {
                console.log('film gewist');
                return response.send('');
            } else {
                return console.log(err);
            }
        })
    })
})


// start server
var port    =   4711;
app.listen(port, function() {
    console.log('Express server luistert op poort %d in %s mode', port, app.settings.env);
})