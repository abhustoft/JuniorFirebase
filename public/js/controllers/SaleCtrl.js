
angular.module('SaleCtrl', []).controller('SaleController', function(saleFactory, storeSalesFactory, $firebase) {

    this.tagline = 'The sales!';
    //this.sales = saleFactory.query();
    this.storeChoice = '';

    var year2014Ref = new Firebase("https://junioropen.firebaseio.com/Storo/2014/");
    var janRef = year2014Ref.child('January');
    var febRef = year2014Ref.child('February');

    var days = {};

    for (var i = 0; i < 32; i++) {
        days[i] = {"sale": 0};
    }

    janRef.set(days);
    febRef.set(days);

    var sync = $firebase(janRef);

    var list = sync.$asArray();

    list.$loaded().then(function() {

        list.forEach(function (elem) {
            console.log('Day: ' + elem.Day + ' ' + elem.Amount);
        })
    });

    this.janSales = list;




    this.getStoreSales = function () {
        var store = {'_store': this.storeChoice};
        this.storeSales = storeSalesFactory.query(store);
    };

    this.deleteStoreSales = function () {
        var store = {'_store': this.storeChoice};
        this.storeSales = storeSalesFactory.remove(store);
    };

});
