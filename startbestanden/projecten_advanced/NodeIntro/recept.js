/**
 * Created by cyber05 on 19/05/2015.
 */

var recepten    =   require('./data/recepten').data;

exports.list    =   function(req, res) {
    res.render('recepten.ejs', {
        title:      'Sofies keuken - recepten',
        recepten:   recepten
    });
};

exports.single  =   function(req, res) {
    var data    =   recepten.filter(function(recept) {
        return (recept.url === req.params.title);
    });

    if(data.length > 0) {
        data = data[0];
        data.title  =   'Sofies keuken - een recept';
        res.render('recept.ejs', data);
    } else {
        res.status(404).render('error.ejs', {title: 'recept niet gevonden'});
    }
}

exports.suggest =   function(req, res) {
    res.render('suggest_results.ejs', {
        title:  'Sofies keuken - dankjewel',
        name:   req.body.name,
        ingredients:    req.body.ingredients,
        directions: req.body.directions
    })
}
