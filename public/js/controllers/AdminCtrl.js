
angular.module('AdminCtrl', []).controller('AdminController', function($scope,
                                                                       storeFactory,
                                                                       saleFactory) {
    $scope.store = {};
    $scope.saveStore = function (store) {
        $scope.store = angular.copy(store);
        console.log($scope.store.name);
        var store = {'name': $scope.store.name,'manager': $scope.store.manager};
        console.log(store);
        storeFactory.save(store);
    };

    $scope.sale = {};
    $scope.saveSale = function (sale) {
        $scope.sale = angular.copy(sale);
        console.log($scope.sale.amount);
        var sale = {'amount': $scope.sale.amount,'date': $scope.sale.date};
        console.log(sale);
        saleFactory.save(sale);
    };

});