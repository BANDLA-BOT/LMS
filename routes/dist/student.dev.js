"use strict";

var router = require("express").Router();

var validate = require('../config/verifyToken.js');

var jwt = require("jsonwebtoken");

var _require = require("../models/registrationModel.js"),
    registerModel = _require.registerModel,
    courseModel = _require.courseModel;

router.post("/login", function _callee(req, res, next) {
  var _req$body, email, password, student, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(registerModel.findOne({
            email: email,
            password: password,
            role: "student"
          }));

        case 4:
          student = _context.sent;

          if (student) {
            token = jwt.sign({
              user: {
                username: student.username,
                email: student.email,
                id: student._id,
                role: student.role
              }
            }, process.env.SECRET_KEY, {
              expiresIn: "3m"
            });
            res.json({
              message: "Student logged in successfully",
              student: student,
              token: token
            });
          } else if (!student) {
            res.json({
              message: "No student found"
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
router.post("/course/:courseId/:userId", function _callee2(req, res) {
  var _req$params, courseId, userId, user, course;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$params = req.params, courseId = _req$params.courseId, userId = _req$params.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(registerModel.findById(userId));

        case 4:
          user = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(courseModel.findById(courseId));

        case 7:
          course = _context2.sent;

          if (!(!user || !course)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "User/Course not found "
          }));

        case 10:
          user.courseDetails.push(course._id);
          _context2.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.status(200).json({
            message: "Course added to user ",
            user: user
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Internal server error",
            err: _context2.t0.message
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.get("/profile", validate, function _callee3(req, res) {
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
router.put("/update/:id", function _callee4(req, res) {
  var _req$body2, email, password, role, username, id, user;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, role = _req$body2.role, username = _req$body2.username;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(registerModel.updateOne({
            _id: id
          }, {
            $set: {
              email: email,
              password: password,
              role: role,
              username: username
            }
          }));

        case 4:
          user = _context4.sent;
          res.json({
            message: "updated successfully",
            user: user
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=student.dev.js.map
