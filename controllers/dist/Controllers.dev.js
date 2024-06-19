"use strict";

var regModel = require('../models/registrationModel.js');

var courseModel = require('../models/registrationModel.js');

var courses = require('../courses.js');

var registerController = function registerController(req, res, next) {
  try {
    var _req$body = req.body,
        username = _req$body.username,
        email = _req$body.email,
        password = _req$body.password,
        role = _req$body.role;
    var user = regModel.create({
      username: username,
      email: email,
      password: password,
      role: role
    });
    res.status(201).json({
      message: "user created successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating user",
      error: error
    });
  }
};

var loginController = function loginController(req, res, next) {
  var _req$body2, email, password, role, userExist;

  return regeneratorRuntime.async(function loginController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, role = _req$body2.role;
          _context.next = 4;
          return regeneratorRuntime.awrap(regModel.findOne({
            email: email
          }));

        case 4:
          userExist = _context.sent;

          if (userExist.password == password && role === 'Admin') {
            req.AdminEmail = email;
            res.redirect('/admin');
          } else if (userExist.password == password && role === 'User') {
            req.UserEmail = email;
            res.redirect('/user');
          } else {
            res.status(404).json({
              message: "User not found"
            });
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: "user not found"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var adminController = function adminController(req, res, next) {
  var students, instructor;
  return regeneratorRuntime.async(function adminController$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(regModel.find({
            role: "User"
          }));

        case 2:
          students = _context2.sent;
          console.log(students);
          _context2.next = 6;
          return regeneratorRuntime.awrap(regModel.find({
            role: "Instructor"
          }));

        case 6:
          instructor = _context2.sent;
          console.log(instructor);
          res.status(200).json({
            user: students,
            instructor: instructor
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var userController = function userController(req, res, next) {
  return regeneratorRuntime.async(function userController$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          courses.map(function (course) {
            res.send("<ul>\n            <li>".concat(course.id, "</li>\n            <li>").concat(course.name, "</li>\n            <li>").concat(course.type, "</li>\n            <li>").concat(course.duration, "</li>\n            <li>").concat(course.price, "</li>\n            </ul>"));
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  registerController: registerController,
  loginController: loginController,
  userController: userController
};
//# sourceMappingURL=Controllers.dev.js.map
