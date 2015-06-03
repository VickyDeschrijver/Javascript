/**
 * Created by cyber05 on 2/06/2015.
 */
var oplApp  =   angular.module('oplApp',['ngRoute']);
oplApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
        controller:     'InstrController',
        templateUrl:    'partials/default.html'
    })
        .when('/instructeurs', {
        controller:     'InstrController',
        templateUrl:    'partials/instr.html'
    })
        .when('/opleidingen', {
            controller:     'OplController',
            templateUrl:    'partials/opl.html'
    })
        .when('/opleidingen/:code', {
            controller:     'OplDetailController',
            templateUrl:    'partials/opldetail.html'
    })
        .otherwise({redirectTo:'/'})
})



