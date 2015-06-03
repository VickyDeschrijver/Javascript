'use strict';

// Declare app level module which depends on views, and components
angular.module('movies', [
  'ngRoute',
    'ngResource',
    'ui.utils',
  'movies.films',
    'movies.filmservices'
])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      $routeProvider
          .when('/films', {
            templateUrl:  'films/films.html',
            controller:   'FilmController'
          })
          .when('/films/new', {
            templateUrl:  'films/filmform.html',
            controller:   'FilmEditController'
          })
          .when('/films/:_id', {
            templateUrl:  'films/filmdetails.html',
            controller:   'FilmDetailController'
          })
          .when('/films/edit/:_id', {
            templateUrl:  'films/filmform.html',
            controller:   'FilmEditController'
          })
      .otherwise({redirectTo: '/films'});
}])
.controller('SiteController', ['$scope', function($scope) {
  $scope.titel = "Ladies at the Movies";
}]);
