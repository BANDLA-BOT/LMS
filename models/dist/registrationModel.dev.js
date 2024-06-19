"use strict";

var mongoose = require('mongoose');

var register = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var courseDetails = new mongoose.Schema({
  coursename: String,
  coursetype: String,
  courseduration: String
}, {
  timestamps: true
});
var registerModel = mongoose.model('user', register);
var courseModel = mongoose.model('course', courseDetails);
module.exports = {
  registerModel: registerModel,
  courseModel: courseModel
};
//# sourceMappingURL=registrationModel.dev.js.map
