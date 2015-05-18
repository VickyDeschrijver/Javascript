/** FILMS **/

define(['ldsh!selectFilms'], function(selectFilms) {
    console.log("function: films.keuzelijst");
    // return object met functies
    return {
        keuzelijst: function() {
            // maakt de keuzelijsten
            //var arrFilms    =   ["De Smurfen", "Zero Dark Thirty", "Heidi in Tirol"];
            //var oAttributen =   {"class":"mijnSelect", "id":id};
            //var $lijst      =   Html.makeSelect(arrFilms, oAttributen);

            var data    =   {
                'id':   'films',
                'films':    [
                    {number: 1, name: 'De Smurfen'},
                    {number: 2, name: 'Zero Dark Thirty'},
                    {number: 3, name: 'Heidi in Tirol'},
                    {number: 4, name: 'Starwars 7'}
                ]
            }
            var $lijst  =   $(selectFilms(data));
            return $lijst;
        }
    }
});