
angular.module('testCtrl', []).controller('TestController', function(saleFactory,
                                                                     salesService,
                                                                     storeSalesFactory,
                                                                     $firebase,
                                                                     $filter) {

    this.tagline = 'The sales!';
    this.storeChoice = '';
    this.fromDate = '';
    this.toDate = '';
    this.storeList = [];
    this.dbRef = {};

    this.getStoreSales = function () {
        this.dbsel = salesService.getStoreSales(this.storeChoice, this.fromDate, this.toDate);
    }

    this.initFB = function () {
        salesService.initDB('Storo','2013');
        salesService.initDB('Sandvika','2013');
        salesService.initDB('Storo','2014');
        salesService.initDB('Sandvika','2014');
    };

    var dbRef = new Firebase('https://junioropen.firebaseio.com/StoroSales');

    var sync = $firebase(dbRef.orderByChild("date").startAt(20140101).endAt(20140106));

    // if ref points to a data collection
    this.list = sync.$asArray();

    this.checkPoint = function () {
        console.log('checking');
        sync = $firebase(dbRef.orderByChild("date").startAt(20140112).endAt(20140114));
        this.list = sync.$asArray();
    }

});
