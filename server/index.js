var express = require("express");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/clustering-app", {
  useNewUrlParser: true
});

var app = express();

app.listen(3400, function() {
  console.log(`Server is listening on port 3400`);
});
module.exports = app;
