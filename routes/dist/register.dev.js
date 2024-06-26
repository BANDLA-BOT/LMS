"use strict";

var router = require("express").Router();

var sendEmail = require("../config/sendmail.js"); // const path = require('path')


var multer = require("multer");

var _require = require("../models/registrationModel.js"),
    registerModel = _require.registerModel; //multer to upload


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "public/profile");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}).single("profile"); //registration for Admin and Instructor

router.post("/", upload, function _callee(req, res) {
  var _req$body, username, email, password, role, profile, user, text;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          profile = req.file.profile;
          _context.prev = 2;
          user = new registerModel({
            email: email,
            username: username,
            password: password,
            role: role,
            profile: profile
          });
          _context.next = 6;
          return regeneratorRuntime.awrap(user.save());

        case 6:
          text = "\n    <h1>Registered successfully as <span>".concat(user.role, "</span></h1>\n    <p>email:  ").concat(user.email, "</p>\n    <p>password:  ").concat(user.password, "</p>\n    ");
          _context.next = 9;
          return regeneratorRuntime.awrap(sendEmail(email, "Registration", text));

        case 9:
          res.json({
            message: "success",
            user: user
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          res.json({
            message: "Registration failed",
            error: _context.t0
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
module.exports = router;
//# sourceMappingURL=register.dev.js.map
