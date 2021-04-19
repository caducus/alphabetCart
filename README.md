# alphabetCart
> a barebones shopping cart app.

## Table of Contents
* [Author](#author)
* [Live Link](#live-link)
* [Technologies](#technologies)
* [Dependencies](#dependencies)
* [User Stories](#user-stories)
* [Future Updates](#future-updates)

## Author
* Becka Catanzaro

## Live Link
https://alphabet-cart.herokuapp.com/

## Technologies
* HTML / CSS
* JavaScript
* AngularJS
* MongoDB
* Git/Github
* Heroku

## Dependencies
* bcrypt v.5.0.1
* dotenv v.8.2.0
* express v.4.17.1
* express-session v.1.17.1
* mongoose v.5.12.4

## User Stories
* As a user, I do not have to be logged in to view items for sale.
* As a user, I can create a user name and password.
* As a user, when I am logged in, I can add items to my cart.
* I cannot add items to my cart if they are not in stock. I cannot add an item to my cart if the quantity exceeds the stock quantity.
* As a user, I should be able to see the number of items in my cart at all times. The number of items in my cart should dynamically update as I add and remove items.
* As a user, I should be able to see the cost of the items that I am buying, both individually and in total. Removing items from my cart should dynamically update these values.
* As a user, when I checkout, my cart should empty, and I should receive a notification that my order was taken.
* As a user with Admin access, I should be able to add, edit, and delete items for sale.
* As a user, when I adjust the size of my screen or use my phone, the app is responsive and its content is easy to read.

## Future Updates
* Presently, when a user clicks checkout, they are greeted with a message thanking them for their purchase. However, clicking checkout does not update the stock quantity in the database. In the future, I plan to expand the checkout feature to update the database when checkout is clicked, removing the appropriate number of items sold from the stock quantity.
