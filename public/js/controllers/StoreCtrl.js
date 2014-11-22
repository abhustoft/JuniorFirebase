
angular.module('StoreCtrl', []).controller('StoreController', function(storeFactory) {

    this.tagline = 'The stores!';
    this.stores = storeFactory.query();
   // var kk = {'id': '54610d5c6de1237c1017d147' };
    //$scope.abh = nerdFactory.get(kk);
    console.log(this.stores);


});

