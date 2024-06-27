const mongoose = require("mongoose");
//courseModel
const courseDetails = new mongoose.Schema(
    {
      coursename: String,
      coursetype: String,
      courseduration: String,
      createdAt:{type:Date, default:Date.now()}
    },
    
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
  },
  { timestamps: true }
);

const wishlist = mongoose.Schema({
    coursename:String,
    courseduration:String,
    coursetype:String,
});

const courseDetailsSchema = new mongoose.Schema({
  coursename: { type: String, required: true },
  coursetype: { type: String, required: true },
  courseduration: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const student = new mongoose.Schema({
    username:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true
    },

    purchases:[courseDetailsSchema],
    wishlist:[wishlist]
})





const studentModel = mongoose.model('student', student)
const registerModel = mongoose.model("user", register);
const courseModel = mongoose.model("course", courseDetails);

module.exports = { registerModel, courseModel,studentModel};
