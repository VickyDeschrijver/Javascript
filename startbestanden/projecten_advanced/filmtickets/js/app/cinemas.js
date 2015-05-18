/** CINEMAS **/

define(function() {
    console.log("Function : cinemas.keuzelijst");

    // return object met functies
    return {
        keuzelijst: function() {
            var data    =   {
                'id':       'cin',
                'zalen':    [
                    {number: 1, name: 'Brugge'},
                    {number: 2, name: 'Gent'},
                    {number: 3, name: 'Antwerpen'},
                    {number: 4, name: 'Diksmuide'}
                ]
            };
            var tpl     =   "<select name='<%= id %>' id='<%= id %>'> <%_.forEach(zalen, function(zaal) { %> <option value='<%= zaal.number %>'> <%= zaal.name %> </option> <% }); %> </select>";
            var compiled    = _.template(tpl);
            var lijst   =   compiled(data);
            var $lijst  =   $(lijst);
            return $lijst;
        }
    }
});