
angular.module('SaleCtrl', []).controller('SaleController', function(saleFactory, storeSalesFactory, $firebase) {

    this.tagline = 'The sales!';
    //this.sales = saleFactory.query();
    this.storeChoice = '';
    this.janSales;
    var list;

    var initDB = function (store, year) {

        var yearRef = new Firebase('https://junioropen.firebaseio.com/' + store + '/' + year + '/');
        var days = {},
            months = {};

        for (var i = 0; i < 32; i++) {
            days[i] = {"sale": 0, "temp": 23};
        }

        for (var i = 0; i < 13; i++) {
            months[i] = days;
        }
        yearRef.set(months);



        /******   *****/
        var janRef = yearRef.child(1);
        var sync = $firebase(janRef);
        list = sync.$asArray();

        list.$loaded().then(function () {
            list.forEach(function (elem, index) {
                console.log('Day: ' + index + ' ' + elem.sale + ' ' + elem.temp);
            })
        });
    }

    initDB('Storo','2014');
    initDB('Storo','2013');
    initDB('Storo','2012');
    initDB('Storo','2011');
    initDB('Storo','2010');

    initDB('Sandvika','2014');
    initDB('Sandvika','2013');
    initDB('Sandvika','2012');
    initDB('Sandvika','2011');
    initDB('Sandvika','2010');

    this.janSales = list;

    //this.sales =....

    this.getStoreSales = function () {
        var store = {'_store': this.storeChoice};
        this.storeSales = storeSalesFactory.query(store);
    };

    this.deleteStoreSales = function () {
        var store = {'_store': this.storeChoice};
        this.storeSales = storeSalesFactory.remove(store);
    };

});
