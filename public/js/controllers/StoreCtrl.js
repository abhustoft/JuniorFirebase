
angular.module('StoreCtrl', []).controller('StoreController', function(storeFactory, $firebase) {

    this.tagline = 'The stores!';
    //this.stores = storeFactory.query();

    var ref = new Firebase("https://junioropen.firebaseio.com/Storo/2014/Januar/");
    var sync = $firebase(ref);

    var list = sync.$asArray();
    
    list.$loaded().then(function() {

        list.forEach(function (elem) {
            console.log('Day: ' + elem.Day + ' ' + elem.Amount);
        })
    });

});

