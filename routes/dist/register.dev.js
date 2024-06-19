"use strict";

var router = require('express').Router();

var _require = require('../models/registrationModel.js'),
    registerModel = _require.registerModel;

router.post('/', function _callee(req, res) {
  var _req$body, username, email, password, role;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          registerModel.create({
            username: username,
            email: email,
            password: password,
            role: role
          }).then(function (data) {
            console.log(data);
            res.status(201).json({
              message: "success",
              data: data
            });
          })["catch"](function (err) {
            console.log(err);
            res.status(500).json({
              message: "error while registering",
              err: err.message
            });
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=register.dev.js.map
