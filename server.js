// =====================
// Dependencies
// =====================

const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

// Controllers
const itemsController = require("./controllers/items.js");

const app = express();
const db = mongoose.connection;

// =========================
// Configurations
// =========================

const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose.");
});

// error and success messages
db.on("error", (error) => console.log(error.message + ' is Mongod not running?'));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// ==========================
// Middleware
// ==========================

app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(express.json());

// paths for controllers
app.use("/items", itemsController);

// ==========================
// Routes
// ==========================

app.get("/", (req, res) => {
  res.sendFile("index.html", {"root":__dirname + "/public"});
});

// ==========================
// Listener
// ==========================

app.listen(port, () => {
  console.log("I'm totes listening' on port: " + port);
});
