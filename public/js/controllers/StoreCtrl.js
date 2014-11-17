
angular.module('StoreCtrl', []).controller('StoreController', function($scope, storeFactory) {

    $scope.tagline = 'The stores!';
    $scope.stores = storeFactory.query();
   // var kk = {'id': '54610d5c6de1237c1017d147' };
    //$scope.abh = nerdFactory.get(kk);
    console.log($scope.stores);
});

