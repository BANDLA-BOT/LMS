"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = require("express").Router();

var validate = require("../config/verifyToken.js");

var path = require("path");

var jwt = require("jsonwebtoken");

var _require = require("../models/registrationModel.js"),
    registerModel = _require.registerModel,
    courseModel = _require.courseModel,
    studentModel = _require.studentModel; //multer to upload profile picture


var multer = require("multer");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "public/profile");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
}).single("profile"); //student registration

router.post("/register", upload, function _callee(req, res) {
  var _req$body, username, email, password, profile, newStudent;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          profile = req.file.profile;
          newStudent = new studentModel({
            username: username,
            password: password,
            email: email,
            profile: profile
          });
          _context.next = 6;
          return regeneratorRuntime.awrap(newStudent.save());

        case 6:
          res.json({
            message: "Student registered successfully ",
            StudenDetails: newStudent
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.json({
            error: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //user login

router.post("/login", function _callee2(req, res, next) {
  var _req$body2, email, password, student, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(studentModel.findOne({
            email: email,
            password: password
          }));

        case 4:
          student = _context2.sent;

          if (student) {
            token = jwt.sign({
              user: {
                username: student.username,
                email: student.email,
                password: student.password,
                id: student._id,
                profile: student.profile
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

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.json({
            message: "Error while login",
            error: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //purchase courses

router.post("/purchase/:courseId/:studentId", validate, function _callee3(req, res) {
  var _req$params, courseId, studentId, student, course;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$params = req.params, courseId = _req$params.courseId, studentId = _req$params.studentId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(studentModel.findById(studentId));

        case 4:
          student = _context3.sent;
          console.log(student);
          _context3.next = 8;
          return regeneratorRuntime.awrap(courseModel.findById(courseId));

        case 8:
          course = _context3.sent;

          if (!(!student || !course)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "User/Course not found "
          }));

        case 11:
          student.purchases.push(course);
          _context3.next = 14;
          return regeneratorRuntime.awrap(student.save());

        case 14:
          res.status(200).json({
            message: "Course added to user ",
            student: student
          });
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "Internal server error",
            err: _context3.t0.message
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
}); // user profile

router.get("/profile", validate, function _callee4(req, res) {
  var user, course;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = req.user;
          console.log(user);
          _context4.next = 4;
          return regeneratorRuntime.awrap(courseModel.find());

        case 4:
          course = _context4.sent;
          res.json({
            message: "Courses available are",
            courses: course
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //categories

router.get("/categories", validate, function _callee5(req, res) {
  var user, free, paid;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user = req.user;
          console.log(user);
          _context5.next = 4;
          return regeneratorRuntime.awrap(courseModel.find({
            coursetype: "free"
          }));

        case 4:
          free = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(courseModel.find({
            coursetype: "paid"
          }));

        case 7:
          paid = _context5.sent;
          res.json({
            message: "fetched",
            user: user,
            FreeCourses: free,
            PaidCourses: paid
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //update user details

router.put("/update/:id", function _callee6(req, res) {
  var _req$body3, email, password, username, id, user;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password, username = _req$body3.username;
          id = req.params.id;
          _context6.next = 4;
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
          user = _context6.sent;
          res.json({
            message: "updated successfully",
            user: user
          });

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //search & filter

router.get("/search/filter", function _callee7(req, res) {
  var query, course, instructor;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          query = req.query.q;
          _context7.next = 4;
          return regeneratorRuntime.awrap(courseModel.find({
            $or: [{
              coursename: {
                $regex: query,
                $options: "i"
              }
            }]
          }));

        case 4:
          course = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(registerModel.find({
            $or: [{
              username: {
                $regex: query,
                $options: "i"
              }
            }]
          }));

        case 7:
          instructor = _context7.sent;
          res.json({
            message: "found results",
            Courses: course,
            instructor: instructor
          });
          _context7.next = 14;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: "Error While searching",
            error: _context7.t0
          });

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //wishlist creation

router.post("/wishlist/:courseId/:studentId", validate, function _callee8(req, res) {
  var _req$params2, courseId, studentId, student, course;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$params2 = req.params, courseId = _req$params2.courseId, studentId = _req$params2.studentId;
          _context8.next = 4;
          return regeneratorRuntime.awrap(studentModel.findById({
            _id: studentId
          }));

        case 4:
          student = _context8.sent;
          _context8.next = 7;
          return regeneratorRuntime.awrap(courseModel.findById({
            _id: courseId
          }));

        case 7:
          course = _context8.sent;
          console.log(student, course);
          student.wishlist.push(course);
          _context8.next = 12;
          return regeneratorRuntime.awrap(student.save());

        case 12:
          res.json({
            message: "wishlist created ",
            student: student
          });
          _context8.next = 18;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          res.json(_defineProperty({
            error: _context8.t0.message
          }, "error", "Error occured while creating wishlist"));

        case 18:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); //get all wishList

router.get("/getwishlist", validate, function _callee9(req, res) {
  var _req$user$user, email, password, student;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _req$user$user = req.user.user, email = _req$user$user.email, password = _req$user$user.password;
          _context9.next = 3;
          return regeneratorRuntime.awrap(studentModel.find({
            email: email,
            password: password
          }));

        case 3:
          student = _context9.sent;

          try {
            if (!student[0].wishlist.length) {
              res.json({
                message: "There are no courses in your wishlist"
              });
            }

            res.json({
              message: "Wishlist found",
              list: student[0].wishlist
            });
          } catch (error) {}

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //certification

router.put("/certification/:courseId/:completed", validate, function _callee10(req, res) {
  var _req$params3, courseId, completed, user, _user$user, email, password, student;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _req$params3 = req.params, courseId = _req$params3.courseId, completed = _req$params3.completed;
          user = req.user;
          _user$user = user.user, email = _user$user.email, password = _user$user.password;
          _context10.prev = 3;
          _context10.next = 6;
          return regeneratorRuntime.awrap(studentModel.findOneAndUpdate({
            email: user.user.email,
            password: user.user.password,
            'purchases._id': courseId
          }, {
            $set: {
              'purchases.$.completed': completed
            }
          }, {
            "new": true
          }));

        case 6:
          student = _context10.sent;

          if (student) {
            _context10.next = 9;
            break;
          }

          return _context10.abrupt("return", res.status(404).json({
            message: 'Student or course not found'
          }));

        case 9:
          res.json(student);
          _context10.next = 15;
          break;

        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](3);
          res.status(500).json({
            message: _context10.t0.message
          });

        case 15:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[3, 12]]);
});
router.get('/getcertificate', validate, function _callee11(req, res) {
  var completedPurchases;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(studentModel.aggregate([{
            $unwind: '$purchases'
          }, {
            $match: {
              'purchases.completed': true
            }
          }, {
            $group: {
              _id: '$_id',
              email: {
                $first: '$email'
              },
              username: {
                $first: '$username'
              },
              completedPurchases: {
                $push: '$purchases'
              }
            }
          }]));

        case 3:
          completedPurchases = _context11.sent;
          res.json(completedPurchases);
          _context11.next = 10;
          break;

        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          res.status(500).json({
            message: 'Error fetching completed purchases',
            error: _context11.t0
          });

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;
//# sourceMappingURL=student.dev.js.map
