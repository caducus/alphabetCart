const app = angular.module("barebonesCart", [
  "ngRoute",
  "cart",
  "checkout"
]);

app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: "/cart"
  });
}]);
