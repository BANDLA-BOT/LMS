"use strict";

var nodemailer = require("nodemailer");

var sendEmail = function sendEmail(email, subject, text) {
  var transporter;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS
            }
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: text
          }));

        case 4:
          console.log("Email sent successfully");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("Error while sending email", _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = sendEmail;
//# sourceMappingURL=sendmail.dev.js.map
