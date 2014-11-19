
angular.module('SaleCtrl', []).controller('SaleController', function(saleFactory) {

    this.tagline = 'The sales!';
    this.sales = saleFactory.query();
    console.log(this.sales);
});
