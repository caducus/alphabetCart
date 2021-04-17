const checkoutApp = angular.module("checkout", ["ngRoute"]);

checkoutApp.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.when("/checkout", {
    templateUrl: "public/checkout/checkout.html",
    Controller: "CheckoutCtrl"
  });
}]);

checkoutApp.controller("CheckoutCtrl", ["$scope", "CommonProperty", function($scope, CommonProperty) {

  $scope.selectedItems = CommonProperty.getItems();
  $scope.checkoutTotal = CommonProperty.getTotal();

}]);
