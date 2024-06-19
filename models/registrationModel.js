const mongoose = require('mongoose');

const register = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
},{timestamps:true})

const courseDetails = new mongoose.Schema({
    coursename:String,
    coursetype:String,
    courseduration:String
},{timestamps:true})

const registerModel = mongoose.model('user', register)
const courseModel = mongoose.model('course', courseDetails)

module.exports = {registerModel,courseModel}