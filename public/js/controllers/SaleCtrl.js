
angular.module('SaleCtrl', []).controller('SaleController', function(saleFactory, storeSalesFactory, $firebase) {

    this.tagline = 'The sales!';
    //this.sales = saleFactory.query();
    this.storeChoice = '';
    this.janSales;
    var list;

    var initDB = function (store, year) {

        var dbRef = new Firebase('https://junioropen.firebaseio.com/');
        var days = {};


        for (var m = 1; m < 13; m++) {
            for (var i = 1; i < 32; i++) {
                days = {sale: 0, temp: 23, date: i + '-' + m + '-' + year, store: store};
                dbRef.push(days);
            }
       }


        /******   *****/
        var janRef = dbRef.child(1);
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

    this.sales = {};
    var ff = [];
    var dummy = function (){
        alert('cancelled');
    };

    this.getStoreSales = function () {
        var store = {'_store': this.storeChoice};
        var dbRef = new Firebase('https://junioropen.firebaseio.com/');
        var count = 0;
        dbRef.orderByChild("date").on("child_added", function(snapshot) {
            //console.log(snapshot.key() + " was " + snapshot.val().temp + " meters tall");
            console.log(count + ' ' + snapshot.exportVal().date + ' ' +  snapshot.exportVal().store);
            this.sales[count++] = snapshot.exportVal();
        },
        dummy,
        this);
    };

    this.deleteStoreSales = function () {
        var store = {'_store': this.storeChoice};
        this.storeSales = storeSalesFactory.remove(store);
    };

});
