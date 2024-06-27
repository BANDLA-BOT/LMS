"use strict";

var mongoose = require("mongoose"); //courseModel


var courseDetails = new mongoose.Schema({
  coursename: String,
  coursetype: String,
  courseduration: String,
  createdAt: {
    type: Date,
    "default": Date.now()
  }
}); //registerModel

var register = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    lowercase: true
  },
  profile: {
    type: String
  }
}, {
  timestamps: true
});
var wishlist = mongoose.Schema({
  coursename: String,
  courseduration: String,
  coursetype: String
});
var courseDetailsSchema = new mongoose.Schema({
  coursename: {
    type: String,
    required: true
  },
  coursetype: {
    type: String,
    required: true
  },
  courseduration: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    "default": false
  }
});
var student = new mongoose.Schema({
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
  purchases: [courseDetailsSchema],
  wishlist: [wishlist]
});
var studentModel = mongoose.model('student', student);
var registerModel = mongoose.model("user", register);
var courseModel = mongoose.model("course", courseDetails);
module.exports = {
  registerModel: registerModel,
  courseModel: courseModel,
  studentModel: studentModel
};
//# sourceMappingURL=registrationModel.dev.js.map
