const mongoose = require("mongoose");
//courseModel
const courseDetails = new mongoose.Schema(
    {
      coursename: String,
      coursetype: String,
      courseduration: String,
    },
    { timestamps: true }
  );

//registerModel

const register = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
    },
    profile: {
      type: String,
    },
    purchases: [
        {course:[courseDetails]},
        {completed:{
            type:Boolean,
            default:false
        }}
    ],
  },
  { timestamps: true }
);



//wishlistModel
const wishlist = mongoose.Schema({
  list: [courseDetails],
  studentEmail:{
    type:String,
  },
  studentUsername:{
    type:String
  },
  studentId:{
    type:String
  }
});
const wishlistModel = mongoose.model("wishlist", wishlist);
const registerModel = mongoose.model("user", register);
const courseModel = mongoose.model("course", courseDetails);

module.exports = { registerModel, courseModel, wishlistModel };
