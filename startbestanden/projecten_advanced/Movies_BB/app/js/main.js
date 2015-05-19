/**
 * main.js entry point voor Movies app
 */

requirejs.config({
    paths:  {
        'jquery':       '../bower_components/jquery/jquery.min',
        'underscore':   '../bower_components/underscore/underscore',
        'backbone':     '../bower_components/backbone/backbone'
    },
    shim:   {
        underscore:     {
            exports:    "_"
        },
        backbone:       {
            deps:       ['underscore', 'jquery'],
            exports:    'Backbone'
        }
    }
});

// Require laadt de app
require(['movies'], function(movies) {
    console.log('movies kan gestart worden');
    movies.start()          // start de movies app
});
