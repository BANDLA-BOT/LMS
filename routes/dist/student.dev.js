"use strict";

var router = require('express').Router();

var _require = require('../models/registrationModel.js'),
    registerModel = _require.registerModel,
    courseModel = _require.courseModel;

router.post('/login', function _callee(req, res, next) {
  var _req$body, email, password, student;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(registerModel.find({
            email: email,
            password: password,
            role: "student"
          }));

        case 4:
          student = _context.sent;

          if (student) {
            res.json({
              message: "logged in successfully",
              student: student
            });
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.json({
            message: "Error while login",
            error: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/course/:_id', function _callee2(req, res) {
  var _req$body2, email, username, course, newData;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, username = _req$body2.username;
          _context2.next = 3;
          return regeneratorRuntime.awrap(courseModel.findById(req.params._id));

        case 3:
          course = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(registerModel.updateOne({
            email: email
          }, {
            $set: {
              course: course._id
            }
          }));

        case 6:
          newData = _context2.sent;
          res.json({
            message: "success",
            newData: newData
          });
          console.log(course);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/profile', function _callee3(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(courseModel.find());

        case 2:
          course = _context3.sent;
          res.json({
            message: "fetched",
            course: course
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=student.dev.js.map
