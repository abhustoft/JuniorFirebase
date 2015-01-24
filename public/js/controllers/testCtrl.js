
angular.module('testCtrl', []).controller('TestController', function(saleFactory,
                                                                     storeSalesFactory,
                                                                     $firebase,
                                                                     firebaseService) {
    this.tagline = 'The sales!';
    this.storeChoice = '';
    this.fromDate = '';
    this.toDate;
    this.data = [];

    var datapoint = 1;  // Used in addSale - index of graph data
    var currentSaleDOY = 0;

    var dbRef = new Firebase('https://junioropen.firebaseio.com/StoroSales');
    var sync = $firebase(dbRef.orderByChild("date").startAt(20140101).endAt(20140106));

    // if ref points to a data collection
    this.list = sync.$asArray();

    this.checkPoint = function () {
        console.log('checking');
    };

    /**
     * Read sales data from Firebase, load graph data
     */
    this.getStoreSales = function () {
        firebaseService.getStoreSales(this);
        this.options = firebaseService.graphOptions(this.storeChoice);
    };
});
