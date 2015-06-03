/*
* VALUES, SERVICES, FACTORIES voor NG Opleidingen
*/

oplApp.factory("instructeurFactory", function() {
    var fact    =   {};
    var instructeurs    =   [
        {naam:'Adinda', stad: 'Dendermonde'},
        {naam:'Ilse', stad: 'Genk'},
        {naam:'Jan', stad: 'Oostende'},
        {naam:'Siska', stad: 'Wevelgem'},
        {naam:'Paul', stad: 'Antwerpen'}
    ];
    fact.getInstructeurs    =   function() {
        return instructeurs;
    }
    fact.postInstructeur    =   function(oInstr) {
        instructeurs.push(oInstr);
    }
    return fact;
})


oplApp.factory("opleidingFactory", ['getCodeFilterFilter', function(getCodeFilter) {
    var fact    =   {};
    var opleidingen    =   [
        {naam:'PHP', code: 750414, categorie:'ontwikkeling'},
        {naam:'Front End', code: 750415, categorie:'ontwikkeling'},
        {naam:'C# .Net', code: 750412, categorie:'ontwikkeling'},
        {naam:'Java', code: 750413, categorie:'ontwikkeling'},
        {naam:'Systeembeheerder', code: 750422, categorie:'infrastructuur'},
        {naam:'IT Medewerker', code: 750601, categorie:'infrastructuur'}
    ];
    fact.getOpleidingen    =   function() {
        return opleidingen;
    }
    fact.postOpleiding    =   function(oOpl) {
        opleidingen.push(oOpl);
    }
    fact.getOplByCode   =   function(code) {
        var opl =   getCodeFilter(opleidingen, code);
        return opl;
    }
    return fact;
}])