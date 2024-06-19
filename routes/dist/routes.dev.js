"use strict";

var express = require('express');

var _require = require('../models/registrationModel.js'),
    registerModel = _require.registerModel;

var _require2 = require('../models/registrationModel.js'),
    courseModel = _require2.courseModel;

var mongoose = require('mongoose');

var router = express.Router();
router.post('/login', function _callee(req, res, next) {
  var _req$body, email, password, instructor;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(registerModel.find({
            email: email,
            password: password
          }));

        case 3:
          instructor = _context.sent;

          if (instructor) {
            res.json({
              message: "logged in",
              instructor: instructor
            });
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/create', function _callee2(req, res, next) {
  var _req$body2, coursename, coursetype, courseduration, createCourse;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, coursename = _req$body2.coursename, coursetype = _req$body2.coursetype, courseduration = _req$body2.courseduration;
          _context2.next = 3;
          return regeneratorRuntime.awrap(courseModel.create({
            coursename: coursename,
            coursetype: coursetype,
            courseduration: courseduration
          }).then(function (result) {
            res.json({
              success: result
            });
          })["catch"](function (err) {
            console.log(err);
          }));

        case 3:
          createCourse = _context2.sent;

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=routes.dev.js.map
