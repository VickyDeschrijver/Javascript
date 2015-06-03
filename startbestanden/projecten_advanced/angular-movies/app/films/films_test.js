'use strict';

describe('movies.films module', function() {

  beforeEach(module('movies.view1'));

  describe('Film controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var FilmController = $controller('FilmController');
      expect(FilmController).toBeDefined();
    }));

  });
});