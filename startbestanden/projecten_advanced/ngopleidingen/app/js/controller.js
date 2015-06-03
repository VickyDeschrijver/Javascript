var controllers =   {};
controllers.InstrController =   function($scope, instructeurFactory) {
    $scope.getInstructeurs  =   instructeurFactory.getInstructeurs();
        /*[
        /!*{naam:'Adinda', stad: 'Dendermonde', indienst:'2001-08-01'},
        {naam:'Ilse', stad: 'Genk',indienst:'1999-05-26'},
        {naam:'Jan', stad: 'Oostende',indienst:'1996-02-12'},
        {naam:'Siska', stad: 'Wevelgem',indienst:'2004-12-31'},
        {naam:'Bjorn', stad: 'Leuven',indienst:'2015-01-01'}*!/
    ];*/
    $scope.addInstructeur   =   function() {
        instructeurFactory.postInstructeur({
            naam:   $scope.nieuw.naam,
            stad:   $scope.nieuw.stad
        })
        //$scope.instructeurs.push({naam: $scope.nieuw.naam, stad: $scope.nieuw.stad})
    }
};

controllers.OplController   =   function($scope, $location, opleidingFactory) {
    $scope.getOpleidingen  =   opleidingFactory.getOpleidingen();
        /*[
        {naam:'PHP', code: 750414, categorie:'ontwikkeling'},
        {naam:'Front End', code: 750415, categorie:'ontwikkeling'},
        {naam:'C# .Net', code: 750412, categorie:'ontwikkeling'},
        {naam:'Java', code: 750413, categorie:'ontwikkeling'},
        {naam:'Systeembeheerder', code: 750422, categorie:'infrastructuur'},
        {naam:'IT Medewerker', code: 750601, categorie:'infrastructuur'}
    ];*/
    $scope.addOpleiding   =   function() {
        opleidingFactory.postOpleiding({
            naam:   $scope.nieuw.naam,
            code:   $scope.nieuw.code,
            categorie:  $scope.nieuw.categorie
        })
        //$scope.opleidingen.push({naam: $scope.nieuw.naam, code: $scope.nieuw.code, categorie:$scope.nieuw.categorie})
    };
    $scope.toonDetailOpl    =   function() {
        if($scope.selectedItem != null) {
            var code    =   $scope.selectedItem.code;
            var urlDetail   =   '/opleidingen/' + code;
            $location.path(urlDetail);
        }
    }
};

controllers.OplDetailController =   function($scope, $routeParams, opleidingFactory) {
    var code    =   $routeParams.code;
    $scope.opleidingen= opleidingFactory.getOplByCode(code);
};

oplApp.controller(controllers);




/*oplApp.controller('InstrController', function($scope) {
    $scope.instructeurs=[
        {naam:'vicky', stad: 'Dendermonde', indienst:'2001-08-01'},
        {naam:'Ilse', stad: 'Genk',indienst:'1999-05-26'},
        {naam:'Jan', stad: 'Oostende',indienst:'1996-02-12'},
        {naam:'Siska', stad: 'Wevelgem',indienst:'2004-12-31'},
        {naam:'Bjorn', stad: 'Leuven',indienst:'2015-01-01'}
    ]
    $scope.functie='It-instructeur';

    var _MS_PER_YEAR    =   1000*60*60*24*365;
    $scope.nu   =   new Date();

    $scope.berekenJaren =   function(strInDienst) {
        var dInDienst   =   new Date(strInDienst);
        var nu          =   $scope.nu;
        var utcNu       =   Date.UTC(nu.getFullYear(), nu.getMonth(), nu.getDate());
        var utcId       =   Date.UTC(dInDienst.getFullYear(), dInDienst.getMonth(), dInDienst.getDate());
        //console.log('dInDienst: ' + dInDienst + ' nu: ' + nu + ' utcNu: ' + utcNu + ' utcId: ' + utcId);
        return Math.floor((utcNu - utcId) / _MS_PER_YEAR);


    }
    $scope.instructeursNieuw    =   function() {
        var aInstrNieuw =   $scope.instructeurs;
        for(var i=0; i<aInstrNieuw.length; i++) {
            aInstrNieuw[i].jaren    =   $scope.berekenJaren(aInstrNieuw[i].indienst)
        }
        return aInstrNieuw;
    }
})*/

