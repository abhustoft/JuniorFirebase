
angular.module('testCtrl', []).controller('testController', function(saleFactory, salesService, storeSalesFactory, $firebase, $filter) {

    this.tagline = 'The sales!';
    this.storeChoice = '';
    this.fromDate = '';
    this.toDate = '';
    this.storeList = [];

    this.getStoreSales = function () {
        salesService.getStoreSales(this.storeChoice, this.fromDate, this.toDate);
    }

    this.initFB = function () {
        salesService.initDB('Storo','2013');
        salesService.initDB('Sandvika','2013');
        salesService.initDB('Storo','2014');
        salesService.initDB('Sandvika','2014');
    };
});
