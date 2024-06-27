"use strict";

var router = require("express").Router();

var sendEmail = require("../config/sendmail.js");

var _require = require("../models/registrationModel.js"),
    registerModel = _require.registerModel; //registration for Admin and Instructor


router.post("/", function _callee(req, res) {
  var _req$body, username, email, password, role, user, text;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.prev = 1;
          user = new registerModel({
            email: email,
            username: username,
            password: password,
            role: role
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(user.save());

        case 5:
          text = "\n    <h1>Registered successfully as <span>".concat(user.role, "</span></h1>\n    <p>email:  ").concat(user.email, "</p>\n    <p>password:  ").concat(user.password, "</p>\n    ");
          _context.next = 8;
          return regeneratorRuntime.awrap(sendEmail(email, "Registration", text));

        case 8:
          res.json({
            message: "success",
            user: user
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          res.json({
            message: "Registration failed",
            error: _context.t0
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
module.exports = router;
//# sourceMappingURL=register.dev.js.map
