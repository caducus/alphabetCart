// =====================
// Dependencies
// =====================

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

require("dotenv").config();

const app = express();
const db = mongoose.connection;

// Controllers
const itemsController = require("./controllers/items.js");
const sessionsController = require("./controllers/sessions.js");
const usersController = require("./controllers/users.js");

// =========================
// Configurations
// =========================

const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.once("open", () => {
  console.log("Connected to Mongoose.")
});

// error and success messages
db.on("error", (error) => console.log(error.message + ' Is Mongod not running?'));
db.on("connected", () => console.log("Mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("Mongo disconnected."));

// ==========================
// Middleware
// ==========================

app.use(express.static("public"));
app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// Paths for controllers
app.use("/items", itemsController);
app.use("/sessions", sessionsController);
app.use("/users", usersController);

// ==========================
// Routes
// ==========================

app.get("/loggedin", (req, res) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(401).json ({
      status: 401,
      message: "not logged in"
    });
  };
});

// ==========================
// Listener
// ==========================

app.listen(port, () => {
  console.log("I'm totes listening' on port: " + port);
});
