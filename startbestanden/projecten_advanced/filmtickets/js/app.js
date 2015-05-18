/**
 * Created by cyber05 on 18/05/2015.
 */

requirejs.config({
    baseUrl:    'js/lib',
    paths:      {
        app:    '../app',
        jquery: 'jquery-2.1.4.min',
        lodash: 'lodash',
        ldsh:   'loader'
    },
    lodashLoader: {
        ext:    '.tpl',
        root:   'js/tpl',
        templateSettings: {}
    }
});
console.log('app.js bezig');

// start de app
require(['domReady!', 'jquery', 'app/tickets'], function(doc, $, tickets) {
        $('#test').html('hallo, mijn app is hier');
        $('#ticketKopen').append(tickets.koopModule());
});