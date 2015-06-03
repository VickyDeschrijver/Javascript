'use strict';

/* Services */
angular.module('movies.filmservices', ['ngResource'])
.factory('filmService', ['$resource', function($resource) {
        var urlBase =   'api/films';
        var Film    =   $resource(
            urlBase + '/:_id',
            {_id: '@_id'},
            {
                update: {method: 'PUT'}
            }
        )
        return Film;
    }])