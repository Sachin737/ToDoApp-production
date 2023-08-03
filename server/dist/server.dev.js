"use strict";

var express = require("express");

require("dotenv").config();

var app = express();
var PORT = process.env.PORT || 9000; // routes

app.get("/", function (req, res) {
  res.json({
    msg: "welcome to our app!"
  });
}); // listen for request

app.listen(PORT, function () {
  console.log("Listening on port no. ".concat(PORT));
});