
angular.module('AdminCtrl', []).controller('AdminController', function($scope,
                                                                       nerdFactory,
                                                                       storeFactory,
                                                                       saleFactory) {

    $scope.user = {};
    $scope.saveUser = function (user) {
        $scope.user = angular.copy(user);
        console.log($scope.user.firstName);
        var nerd = {'name': $scope.user.firstName,'street': $scope.user.street};
        console.log(nerd);
        nerdFactory.save(nerd);
    };

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