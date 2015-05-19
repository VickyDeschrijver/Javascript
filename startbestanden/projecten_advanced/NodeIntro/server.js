/** server.js NodeIntro **/

var express     =   require('express');
var bodyParser  =   require('body-parser');
var engine      =   require('ejs-locals');
var recept      =   require('./recept');
var app         =   express();

app.use(express.static(__dirname + '/public'));     // root van static files
app.engine('ejs', engine);                          // gebruik ejs-locals voor alle ejs templates
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Routes
app.get('/', function(req, res) {
    //res.send('Hello World');
    res.render('index.ejs', {title: 'Sofies keuken'});  //v2
});
app.get('/recepten', recept.list);
app.get('/recepten/suggest', function(req, res) {
    res.render('suggest.ejs', {title: 'doe een suggestie'})
});
app.get('/recepten/:title', recept.single);
app.get('/*', function(req, res) {
    res.send('sorry, de pagina ' + req.path + ' is niet beschikbaar');
});

app.post('/recepten/suggest', recept.suggest);  // dank pagina

// start server
var port        =   3000;
var server      =   app.listen(port, function() {
    console.log('Server luistert op poort %d', port);
})