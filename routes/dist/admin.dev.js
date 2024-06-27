"use strict";

var router = require('express').Router();

var _require = require('../models/registrationModel.js'),
    registerModel = _require.registerModel,
    studentModel = _require.studentModel,
    courseModel = _require.courseModel; //Admin login


router.post('/login', function _callee(req, res, next) {
  var _req$body, email, password, role, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.next = 4;
          return regeneratorRuntime.awrap(registerModel.findOne({
            role: role,
            email: email,
            password: password
          }));

        case 4:
          admin = _context.sent;

          if (!admin) {
            res.json({
              message: "No user found "
            });
          }

          res.json({
            message: "Admin logged in successfully",
            admin: admin
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.json({
            error: _context.t0.message,
            message: "Internal server error"
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //Admin can access all the user details

router.get('/getall', function _callee2(req, res) {
  var students, instructors, courses;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(studentModel.find());

        case 3:
          students = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(registerModel.find({
            role: "instructor"
          }));

        case 6:
          instructors = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(courseModel.find());

        case 9:
          courses = _context2.sent;

          if (!students) {
            res.json({
              message: "No Students found in DB"
            });
          }

          if (!instructors) {
            res.json({
              message: "No instructors found in DB"
            });
          }

          if (!courses) {
            res.json({
              message: "No instructors found in DB"
            });
          }

          res.json({
            students: students,
            instructors: instructors,
            courses: courses
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); //Admin can delete a user 

router["delete"]('/deleteuser/:id', function _callee3(req, res) {
  var id, user, student;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          console.log(id);
          _context3.next = 5;
          return regeneratorRuntime.awrap(registerModel.deleteOne({
            _id: id
          }));

        case 5:
          user = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(studentModel.deleteOne({
            _id: id
          }));

        case 8:
          student = _context3.sent;
          res.json({
            message: "user",
            user: user,
            student: student
          });
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
module.exports = router;
//# sourceMappingURL=admin.dev.js.map
