
angular.module('SaleCtrl', []).controller('SaleController', function(saleFactory, storeSalesFactory) {

    this.tagline = 'The sales!';
    this.sales = saleFactory.query();
    this.storeChoice = '';

    this.getStoreSales = function () {
        var store = {'_store': this.storeChoice};
        this.storeSales = storeSalesFactory.query(store);
    };

    this.deleteStoreSales = function () {
        var store = {'_store': this.storeChoice};
        this.storeSales = storeSalesFactory.remove(store);
    };
});
