
angular.module('SaleCtrl', []).controller('SaleController', function(saleFactory, storeSalesFactory, $firebase) {

    this.tagline = 'The sales!';
    this.storeChoice = '';
    this.sales = {};
    var storeList = [];
    var list;

    var padDigits = function (number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    };

    var initDB = function (store, year) {

        var dbRef = new Firebase('https://junioropen.firebaseio.com/');
        var days = {};
        var dateStr = ' ';
        var date = 0;

        for (var m = 1; m < 13; m++) {
            for (var i = 1; i < 32; i++) {
                dateStr = year + padDigits(m,2) + padDigits(i,2);
                dbRef =  new Firebase('https://junioropen.firebaseio.com/' + dateStr);
                date = parseInt(dateStr,10);
                days = JSON.parse('{"sum": ' + i + ', "temp": 23,"store": "' + store + '"}');
                dbRef.set(days);
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

    /*initDB('Storo','2014');
    initDB('Storo','2013');
    initDB('Storo','2012');
    initDB('Storo','2011');
    initDB('Storo','2010');

    initDB('Sandvika','2014');
    initDB('Sandvika','2013');
    initDB('Sandvika','2012');
    initDB('Sandvika','2011');
    initDB('Sandvika','2010');*/

    var dummy = function (){
        alert('cancelled');
    };

    this.getStoreSales = function () {
        var store = this.storeChoice;
        var dbRef = new Firebase('https://junioropen.firebaseio.com/');
        var count = 0;
        var storeCount = 0;

        dbRef.child("sales").orderByChild("store").on("child_added", function(snapshot) {
            //console.log('The key: ' + snapshot.key() + ': ' + snapshot.exportVal().sale.store);

            if (snapshot.exportVal().sale.store === store){
                storeList[storeCount++] = snapshot.val();
            }
        });

        dbRef.child("sales").limitToFirst(5).on("child_added", function(snapshot) {
            /*console.log(count + ' ' +
                snapshot.key() + ' ' +
            snapshot.exportVal().sale.sum + ' ' +
            snapshot.exportVal().sale.temp + ' ' +
            snapshot.exportVal().sale.date + ' ' +
            snapshot.exportVal().sale.store);
            */

            this.sales[count++] = snapshot.exportVal().sale;
        },
        dummy,
        this);
    };

    this.testSearch = function () {
        var dbRef = new Firebase('https://junioropen.firebaseio.com/');
        var item;
        dbRef.orderByChild("sum").startAt(23).endAt(25).on("child_added", function(snapshot) {
            item= snapshot.exportVal();
            console.log('The key: ' + snapshot.key() + ' ' + item.sum);

        });
    }

    this.findStoreSales = function () {
        var count = 0;
        var salePeriod = [];

        storeList.forEach(function(item) {
            if (parseInt(item.sale.date,10) > 20130506 && parseInt(item.sale.date,10) < 20130512) {
                salePeriod[count++] = item.sale;
                console.log('Sale Period: ' + item.sale.date);
            }
        });

        var store = {'_store': this.storeChoice};
    };
    this.initFB = function () {
        initDB('Storo','2014');
        initDB('Sandvika','2013');
    };

});
