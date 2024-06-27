"use strict";

var express = require('express');

var _require = require('../models/registrationModel.js'),
    registerModel = _require.registerModel;

var _require2 = require('../models/registrationModel.js'),
    courseModel = _require2.courseModel;

var mongoose = require('mongoose');

var router = express.Router(); //Instructor login

router.post('/login', function _callee(req, res, next) {
  var _req$body, email, password, instructor;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(registerModel.findOne({
            email: email,
            password: password,
            role: "instructor"
          }));

        case 3:
          instructor = _context.sent;
          console.log(instructor);

          if (instructor) {
            res.json({
              message: "Instructor logged in",
              instructor: instructor
            });
          } else if (!instructor) {
            res.json({
              message: "failed login"
            });
          }

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Courses creation by instructor

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
              message: "Course created successfully",
              course: result
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
router.get('/allCourses', function _callee3(req, res) {
  var courses;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(courseModel.find());

        case 2:
          courses = _context3.sent;
          res.json({
            message: "All the courses available in the DATABASE",
            courses: courses
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=instructor.dev.js.map
