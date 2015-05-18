/**
 * RequireJS entry point
 */

requirejs.config({
    baseUrl:    'js/lib',
    paths:      {
        app:    '../app',
        jquery: 'jquery-2.1.4.min',
        'underscore':   'underscore/underscore-min',
        'backbone': 'backbone/backbone',
        'backbone.localstorage':    'backbone/backbone.localStorage-min'
    },
    shim:   {
        underscore: {
            exports:    "_"
        },
        backbone:   {
            deps:   ['underscore', 'jquery'],
            exports:    'Backbone'
        },
        'backbone.localstorage':    {
            deps:   ['backbone'],
            exports:    'Backbone'
        }
    }
});
console.log('main.js gestart');

// start de app
require(['domReady!', 'app/todo'], function(doc, todo) {
        todo.start();       // start de app
});