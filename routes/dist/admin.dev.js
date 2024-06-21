"use strict";

var router = require('express').Router();

var _require = require('../models/registrationModel.js'),
    registerModel = _require.registerModel;

router.post('/login', function _callee(req, res, next) {
  var _req$body, email, password, role, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, role = _req$body.role;

          if (!(role === 'admin')) {
            _context.next = 9;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(registerModel.findOne({
            role: role,
            email: email,
            password: password
          }));

        case 4:
          admin = _context.sent;
          console.log(admin);

          if (admin) {
            res.json({
              message: "Admin logged in"
            });
          } else if (!admin) {
            res.json({
              message: "Error while login"
            });
          }

          _context.next = 11;
          break;

        case 9:
          res.json({
            message: "Error while log in "
          });
          console.log("error");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/getall', function _callee2(req, res) {
  var students, instructors;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(registerModel.find({
            role: "student"
          }));

        case 2:
          students = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(registerModel.find({
            role: "instructor"
          }));

        case 5:
          instructors = _context2.sent;
          res.json({
            students: students,
            instructors: instructors
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router["delete"]('/deleteuser/:id', function _callee3(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          console.log(id);
          _context3.next = 4;
          return regeneratorRuntime.awrap(registerModel.deleteOne({
            _id: id
          }));

        case 4:
          user = _context3.sent;
          res.json({
            message: "user",
            user: user
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=admin.dev.js.map
