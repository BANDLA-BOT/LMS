"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var bodyParser = require('body-parser');

var dotenv = require('dotenv');

var adminRoute = require('./routes/admin.js');

var registerRoute = require('./routes/register.js');

var instructorRoute = require('./routes/routes.js');

var studentRoute = require('./routes/student.js');

var _require = require('./config/db.js'),
    db = _require.db;

dotenv.config();
var app = express(); //DATABASE

db;
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json()); //routes

app.use('/register', registerRoute);
app.use('/admin', adminRoute);
app.use('/instructor', instructorRoute);
app.use('/student', studentRoute);
app.listen(process.env.PORT, function () {
  console.log("Server connected on " + process.env.PORT);
});
//# sourceMappingURL=server.dev.js.map
