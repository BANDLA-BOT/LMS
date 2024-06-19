"use strict";

var mongoose = require('mongoose');

require('dotenv').config();

var db = mongoose.connect(process.env.CONNECTION_STRING_DB).then(function () {
  console.log("Database connected");
})["catch"](function (err) {
  console.log(err.message);
});
module.exports = db;
//# sourceMappingURL=db.dev.js.map
