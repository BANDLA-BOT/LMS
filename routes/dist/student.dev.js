"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = require("express").Router();

var validate = require('../config/verifyToken.js');

var path = require('path');

var jwt = require("jsonwebtoken");

var _require = require("../models/registrationModel.js"),
    registerModel = _require.registerModel,
    courseModel = _require.courseModel,
    wishlistModel = _require.wishlistModel;

var multer = require("multer");

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
                profile: student.profile,
                role: student.role
              }
            }, process.env.SECRET_KEY, {
              expiresIn: "1h"
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
router.post("/purchase/:courseId/:userId", validate, function _callee2(req, res) {
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
          user.purchases.push(course);
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
  var user, course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = req.user;
          console.log(user);
          _context3.next = 4;
          return regeneratorRuntime.awrap(courseModel.find());

        case 4:
          course = _context3.sent;
          res.json({
            message: "Courses available are",
            courses: course
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/categories', validate, function _callee4(req, res) {
  var user, free, paid;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = req.user;
          console.log(user);
          _context4.next = 4;
          return regeneratorRuntime.awrap(courseModel.find({
            coursetype: 'free'
          }));

        case 4:
          free = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(courseModel.find({
            coursetype: "paid"
          }));

        case 7:
          paid = _context4.sent;
          res.json({
            message: "fetched",
            user: user,
            FreeCourses: free,
            PaidCourses: paid
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.put("/update/:id", function _callee5(req, res) {
  var _req$body2, email, password, username, id, user;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, username = _req$body2.username;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(registerModel.updateOne({
            _id: id
          }, {
            $set: {
              email: email,
              password: password,
              username: username
            }
          }));

        case 4:
          user = _context5.sent;
          res.json({
            message: "updated successfully",
            user: user
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.get('/search/filter', function _callee6(req, res) {
  var query, course, instructor;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          query = req.query.q;
          _context6.next = 4;
          return regeneratorRuntime.awrap(courseModel.find({
            $or: [{
              coursename: {
                $regex: query,
                $options: 'i'
              }
            }]
          }));

        case 4:
          course = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(registerModel.find({
            $or: [{
              username: {
                $regex: query,
                $options: 'i'
              }
            }]
          }));

        case 7:
          instructor = _context6.sent;
          res.json({
            message: "found results",
            Courses: course,
            instructor: instructor
          });
          _context6.next = 14;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: 'Error While searching',
            error: _context6.t0
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //wishlist

router.post('/wishlist/:Id', validate, function _callee7(req, res) {
  var user, _id, course, wishlist;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user = req.user;
          console.log(user.user.username);
          _id = req.params.Id;
          _context7.next = 6;
          return regeneratorRuntime.awrap(courseModel.findById({
            _id: _id
          }));

        case 6:
          course = _context7.sent;
          console.log(course);
          wishlist = new wishlistModel({
            list: course,
            studentUsername: user.user.username,
            studentEmail: user.user.email,
            studentId: user.user.id
          });
          _context7.next = 11;
          return regeneratorRuntime.awrap(wishlist.save());

        case 11:
          res.json({
            message: "wishlist created ",
            wishlist: wishlist
          });
          _context7.next = 17;
          break;

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          res.json(_defineProperty({
            error: _context7.t0.message
          }, "error", "Error occured while creating wishlist"));

        case 17:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.get('/getwishlist', validate, function _callee8(req, res) {
  var wishList;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(wishlistModel.find());

        case 2:
          wishList = _context8.sent;
          res.json({
            wishlist: wishList
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
router.get('/certification', validate, function _callee9(req, res) {
  var user, username, email, student;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          user = req.user;
          console.log(user);
          username = user.user.username;
          email = user.user.email;
          console.log(username);
          console.log(email);
          _context9.next = 8;
          return regeneratorRuntime.awrap(registerModel.findOne({
            email: email,
            username: username
          }));

        case 8:
          student = _context9.sent;
          console.log(student.purchases);

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=student.dev.js.map
