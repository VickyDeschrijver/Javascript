/*
* Filters voor NG Opleidingen
*/

oplApp.filter('getCodeFilter', function() {
    return function(input, code) {
        for(var i=0; i<input.length; i++) {
            if(input[i].code == code) {
                return input[i];
            }
        }
    }
})