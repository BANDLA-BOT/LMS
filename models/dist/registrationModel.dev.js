"use strict";

var mongoose = require("mongoose"); //courseModel


var courseDetails = new mongoose.Schema({
  coursename: String,
  coursetype: String,
  courseduration: String
}, {
  timestamps: true
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
  },
  purchases: [{
    course: [courseDetails]
  }, {
    completed: {
      type: Boolean,
      "default": false
    }
  }]
}, {
  timestamps: true
}); //wishlistModel

var wishlist = mongoose.Schema({
  list: [courseDetails],
  studentEmail: {
    type: String
  },
  studentUsername: {
    type: String
  },
  studentId: {
    type: String
  }
});
var wishlistModel = mongoose.model("wishlist", wishlist);
var registerModel = mongoose.model("user", register);
var courseModel = mongoose.model("course", courseDetails);
module.exports = {
  registerModel: registerModel,
  courseModel: courseModel,
  wishlistModel: wishlistModel
};
//# sourceMappingURL=registrationModel.dev.js.map
