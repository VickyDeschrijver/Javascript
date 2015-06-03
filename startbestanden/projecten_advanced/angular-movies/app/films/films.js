'use strict';

angular.module('movies.films', [])
// versie 1 JSON bestand
    .controller('FilmController', ['$scope', 'filmService', function($scope, filmService) {
        $scope.subtitel = "Filmlijst";
        $scope.movies   =   filmService.query();
        /*$http.get('movies.json').success(function(data) {
            $scope.movies   =   data
        })*/
    }])

    .controller('FilmDetailController', ['$scope', '$routeParams', 'filmService', function($scope, $routeParams, filmService) {
    $scope.subtitel     =   'Film Detail';
    $scope.movie        =   filmService.get({}, {'_id':$routeParams._id});
    }])

    .controller('FilmEditController', ['$scope', '$routeParams', '$window', 'filmService', function($scope, $routeParams, $window, filmService) {
        $scope.subtitel     =   "Edit een film";
        $scope.movie        =   filmService.get({},{'_id':$routeParams._id})
        $scope.save         =   function(movie) {
            console.log(movie);
            if($scope.movie._id) {
                // update
                console.log(movie._id);
                filmService.update({_id:$scope.movie._id}, $scope.movie);
            } else {
                // nieuwe movie
                $scope.movie.$save()
            }
            window.location.assign('/');
        }
    }])


