
angular.module('testCtrl', []).controller('testController', function(saleFactory, storeSalesFactory, $firebase, $filter) {

    this.tagline = 'The sales!';
    this.storeChoice = '';
    this.fromDate = '';
    this.toDate = '';
    this.storeList = [];
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
                dbRef =  new Firebase('https://junioropen.firebaseio.com/' + store + 'Sales');
                date = parseInt(dateStr,10);
                days = JSON.parse('{"sum": ' + i + ', "temp": 23,"store": "' + store + '","date":' + date + '}');
                dbRef.push(days);
            }
       }
    };

    var dummy = function (){
        alert('cancelled');
    };

    this.getStoreSales = function () {
        var store = this.storeChoice;
        var storeCount = 0;

        var from = moment(this.fromDate).format("YYYYMMDD");
        var to = moment(this.toDate).format("YYYYMMDD");

        var intfrom = parseInt(from,10);
        var intto = parseInt(to,10)

        var dbRef = new Firebase('https://junioropen.firebaseio.com/' + store + 'Sales');
        dbRef.orderByChild("date").startAt(intfrom).endAt(intto).on("child_added", function(snapshot) {
            console.log('The key: ' + snapshot.key() + ' ' +
            snapshot.exportVal().sum + ' ' +
            snapshot.exportVal().date + ' ' +
            snapshot.exportVal().store);

            this.storeList[storeCount++] = snapshot.val();
        },
        dummy,
        this);
    }


    this.listStoreSales = function () {
        var count = 0;
        var salePeriod = [];

        this.storeList.forEach(function(item) {
            console.log('Sale: ' + item.sum + ' Date:' + item.date + ' ' + item.store);
        });

        var store = {'_store': this.storeChoice};
    };


    this.initFB = function () {
        initDB('Storo','2013');
        initDB('Sandvika','2013');
        initDB('Storo','2014');
        initDB('Sandvika','2014');
    };

});
