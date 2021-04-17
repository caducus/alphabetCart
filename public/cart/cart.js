const cartApp = angular.module("cart", ["ngRoute"]);

cartApp.config(["$routeProvider", function ($routeProvider) {

// Redirect to cart
  $routeProvider.when("/cart", {
    templateUrl: "public/cart/cart.html",
    Controller: "CartCtrl"
  });
}]);

cartApp.controller("CartCtrl", ["$scope", "$http", "CommonProperty", function($scope, $http, CommonProperty) {

const controller = this;
$scope.cartData = CommonProperty.getItems();

// function to call data from the dababase
  this.initialItems = function () {
    $http({
      method: "GET",
      url: "/items"
    }).then(function(response) {
      $scope.cartData = response.data;
    }, function(error) {
      console.log(error);
    });
  };

// Adds prices of selected items in cart
  $scope.total = function() {
    let cartTotal = 0;
    for (let i in $scope.cartData) {
      cartTotal += parseInt($scope.cartData[i].itemSelected);
    };
    CommonProperty.setTotal(cartTotal);
    return CommonProperty.getTotal();
  };

// Watch and update changes to the items in cart
  $scope.$watch("cartData", function() {
    CommonProperty.setItems($scope.cartData);
  });

  // If the current cart already exists, keep it
  // If the current cart does not exist, call the initial items from the database
  if(!$scope.cartData) {
    this.initialItems();
  };

}]);

// Populating radio buttons for multiple price options
cartApp.directive("checkList", function() {
  return {
    restrict: "E",
    scope: {
      prices: "=",
      name: "=",
      selected: "="
    },
    template: function(elem, attr) {
      return '<div ng-repeat="i in prices">\
                <label><input type="radio" name="{{name}}" ng-value="{{i.itemPrice}}" ng-model="$parent.selected">{{i.itemQuantity}} for ${{i.itemPrice}}</label>\
              </div>'
    }
  };
});

// CommonProperty gets and sets items, gets and sets total, and stores this information for use across multiple routes
cartApp.service("CommonProperty", function() {
  let items = "";
  let Total = 0;

  return {
    getItems: function() {
      return items;
    },
    setItems: function(value) {
      items = value;
    },
    getTotal: function() {
      return Total;
    },
    setTotal: function(value) {
      Total = value;
    }
  };
});
