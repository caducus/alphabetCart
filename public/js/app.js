const app = angular.module("AlphabetCart", []);

app.controller("MainCtrl", ["$http", "$scope", function($http, $scope) {
  const controller = this;
  this.showNewForm = false;
  this.showLogInForm = false;
  this.indexOfEditForm;
  $scope.numberOfItems = 0;
  $scope.totalCost = 0;
  $scope.currentCart = [];
  $scope.thankYouMessage = "";

  // partial navigation
  this.includePath = "partials/shop.html"
  this.shopView = true;

  this.changeInclude = (path) => {
    this.includePath = "partials/" + path + ".html"
  };

  // seed data
  // const seedItems = [
  //   {name: "The Letter A", alphabetID: 1, selected: 0, description: "The essential start of any alphabet.", image: "images/the_letter_a.jpeg", price: 5, stockQuantity: 5},
  //   {name: "The Letter B", alphabetID: 2, selected: 0, description: "Second in line, but nonetheless a curvaceous beauty.", image: "images/the_letter_b.jpeg", price: 3, stockQuantity: 3},
  //   {name: "The Letter C", alphabetID: 3, selected: 0, description: "The third time is always a charm at a bargain of a price.", image: "images/the_letter_c.gif", price: 1, stockQuantity: 10},
  //   {name: "The Letter D", alphabetID: 4, selected: 0, description: "Insert generic text here about how awesome the D is.", image: "images/the_letter_d.gif", price: 7, stockQuantity: 3},
  //   {name: "The Letter E", alphabetID: 5, selected: 0, description: "Like all vowels (except U, nobody likes U), this letter is far more versatile and useful than you would ever know.", image: "images/the_letter_e.png", price: 8, stockQuantity: 10},
  //   {name: "The Letter F", alphabetID: 6, selected: 0, description: "One of the most popular letters, you'll rarely find it in stock.", image: "images/the_letter_f.png", price: 10, stockQuantity: 0},
  //   {name: "The Letter G", alphabetID: 7, selected: 0, description: "Not the most popular letter, but it's still quite good.", image: "images/the_letter_g.png", price: 3, stockQuantity: 7},
  //   {name: "The Letter H", alphabetID: 8, selected: 0, description: "What does this letter even do?", image: "images/the_letter_h.jpeg", price: 1, stockQuantity: 8},
  //   {name: "The Letter M", alphabetID: 13, selected: 0, description: "Like the mountain, this letter comes with some peaks.", image: "images/the_letter_m.gif", price: 4, stockQuantity: 3},
  //   {name: "The Letter S", alphabetID: 19, selected: 0, description: "Extremely versatile, extra curvy, and entirely sibilant.", image: "images/the_letter_s.jpeg", price: 5, stockQuantity: 5},
  //   {name: "The Letter U", alphabetID: 21, selected: 0, description: "Although it rarely stands on its own, in combination this letter is most compelling.", image: "images/the_letter_u.png", price: 3, stockQuantity: 3}
  // ];

  // user functions
  this.createUser = function () {
    $http({
      method: "POST",
      url: "/users",
      data: {
              username: this.createdUsername,
              password: this.createdPassword,
              isAdmin: false
      }
    }).then(function(response) {
      console.log(response.data);
      controller.createdUsername = null;
      controller.createdPassword = null;
      controller.showNewForm = false;
    }, function(error) {
      console.log(error);
    });
  };

  this.logIn = function () {
    $http({
      method: "POST",
      url: "/sessions",
      data: {
              username: this.username,
              password: this.password
      }
    }).then(function(response) {
      console.log(response.data);
      controller.isLoggedIn();
      controller.username = null;
      controller.password = null;
      controller.showLogInForm = false;
    }, function(error) {
      console.log(error);
    });
  };

  this.logOut = function () {
    $http({
      method: "DELETE",
      url: "/sessions"
    }).then(function(response) {
      console.log(response.data);
      controller.loggedInUser = null;
      controller.userIsAdmin = null;
      // if user is in cart, switch back to shop
      controller.includePath = "partials/shop.html"
      controller.shopView = true;
      // if user is admin and has an edit form open, close edit form
      controller.indexOfEditForm = null;
    }, function(error) {
      console.log(error);
    });
  };

  this.isLoggedIn = function () {
    $http({
      method: "GET",
      url: "/loggedin"
    }).then(function(response) {
      console.log("I am a user, hear me roar!");
      controller.loggedInUser = response.data.username;
      controller.userIsAdmin = response.data.isAdmin;
    }, function(error) {
      console.log(error);
    });
  };

  // item functions
  this.getItems = function () {
    $http({
      method: "GET",
      url: "/items"
    }).then(function(response) {
      controller.items = response.data;
    }, function(error) {
      console.log(error);
    });
  };

  this.addItem = function () {
    $http({
      method: "POST",
      url: "/items",
      data: {
        name: this.name,
        alphabetID: this.alphabetID,
        description: this.description,
        image: this.image,
        price: this.price,
        stockQuantity: this.stockQuantity
      }
    }).then(function(response) {
      console.log(response.data);
      // empty form upon submit
      controller.name = null;
      controller.alphabetID = null;
      controller.description = null;
      controller.image = null;
      controller.price = null;
      controller.stockQuantity = null;
      // update the items displayed on the page
      controller.getItems();
    }, function(error) {
      console.log(error);
    });
  };

  this.editItem = function (item) {
    $http({
      method: "PUT",
      url: "/items/" + item._id,
      data: {
        name: this.updatedName,
        alphabetID: this.updatedAlphabetID,
        description: this.updatedDescription,
        image: this.updatedImage,
        price: this.updatedPrice,
        stockQuantity: this.updatedQuantity
      }
    }).then(function(response) {
      // update the items displayed on the page
      controller.getItems();
      console.log(response.data);
      controller.indexOfEditForm = !controller.indexOfEditForm
    }, function(error) {
      console.log(error);
    });
  };

  this.deleteItem = function (item) {
    $http({
      method: "DELETE",
      url: "/items/" + item._id
    }).then(function(response) {
      // update the items displayed on the page
       controller.getItems();
    }, function(error) {
      console.log(error);
    });
  };

  // cart functions
  $scope.addToCart = function (item) {
    let updateNumberOfItems = false;
    // if the current item has a stock quantity of 1 or more
    if (item.stockQuantity >= 1) {
      // if the cart does not yet exist,
      if ($scope.currentCart.length === 0) {
        // add +1 to this item count
        item.count = 1;
        // push this item to the cart
        $scope.currentCart.push(item);
        // set updateNumberOfItems to true
        updateNumberOfItems = true;
      // otherwise, if the cart already exists
      } else {
        // set duplicateItem to false
        let duplicateItem = false;
        // loop through the array of items in the cart to see if this item id matches any of the cart item ids
        for (let i = 0; i < $scope.currentCart.length; i++) {
          // if there is a match, set duplicateItem to true
          if ($scope.currentCart[i]._id === item._id) {
            duplicateItem = true;
            // if the item count in cart is less than the item stockQuantity
            if (item.count < item.stockQuantity) {
              // add +1 to the duplicate item count
              $scope.currentCart[i].count += 1;
              // set updateNumberOfItems to true
              updateNumberOfItems = true;
            // if the item count in cart is equal to the item stockQuantity
            } else {
              console.log("Exceeds stock quantity. Item not added to cart.")
            };
          };
        };
        // if this item is not a duplicate
        if (!duplicateItem) {
          // add +1 to this item count
          item.count = 1;
          // set updateNumberOfItems to true
          updateNumberOfItems = true;
          // push this item to the cart
          $scope.currentCart.push(item);
        };
      };
      if (updateNumberOfItems === true) {
        // add +1 to the total number of items in the cart
        $scope.numberOfItems += 1;
        // add the cost to the total cost
        $scope.total(item.price, "add");
      };
    // clear out the thank you message if previous cart was checked out
    $scope.thankYouMessage = "";
    // if the stockQuantity is 0
    } else {
      console.log("0 in stock. Item not added to cart.");
    };
    console.log($scope.currentCart);
  };

  $scope.removeFromCart = function (item) {
    // loop through the array of items in the cart to find the item to be removed
    for (let i = 0; i < $scope.currentCart.length; i++) {
      if ($scope.currentCart[i]._id === item._id) {
        // check the item count of the current item
        if ($scope.currentCart[i].count > 1) {
          // if item count is greater than 1, subtract 1
          $scope.currentCart[i].count -= 1;
        } else {
          // if item count is equal to 1, remove the item from cart
          $scope.currentCart.splice([i], 1);
        };
      };
    };
    // subtract -1 to the total number of items in the cart
    $scope.numberOfItems -= 1;
    // subtract the cost from the total cost
    $scope.total(item.price, "sub");
  };

  // calculate total cost of cart
  $scope.total = function(cost, action) {
    if (action === "add") {
      $scope.totalCost += cost;
    } else {
      $scope.totalCost -= cost;
    };
  };

  // checkout
  $scope.checkout = function() {
    // empty the cart array
    $scope.currentCart = [];
    // reset the totalCost to 0;
    $scope.totalCost = 0;
    // reset the numberOfItems to 0;
    $scope.numberOfItems = 0;
    // display "thank you for purchase" message
    $scope.thankYouMessage = "Thank you for your purchase!";
  };

  // Get initial list of items for sale
  this.getItems();

}]);
