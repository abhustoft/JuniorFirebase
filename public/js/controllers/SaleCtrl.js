
angular.module('SaleCtrl', []).controller('SaleController', function(saleFactory, storeSalesFactory) {

    this.tagline = 'The sales!';
    this.sales = saleFactory.query();

    this.getStoreSales = function (store) {
        this.store = angular.copy(store);
        var store = {'_store': this.store};
        this.storeSales = storeSalesFactory.query(store);
    };
});
