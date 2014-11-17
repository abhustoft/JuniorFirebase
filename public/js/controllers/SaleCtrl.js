
angular.module('SaleCtrl', []).controller('SaleController', function($scope, saleFactory) {

    $scope.tagline = 'The sales!';
    $scope.sales = saleFactory.query();
    console.log($scope.sales);
});

