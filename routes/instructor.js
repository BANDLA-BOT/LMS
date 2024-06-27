const express = require('express');
const {registerModel} = require('../models/registrationModel.js')
const {courseModel} = require('../models/registrationModel.js')
const mongoose = require('mongoose')
const router = express.Router();

//Instructor login

router.post('/login', async(req,res,next)=>{
   const {email, password} = req.body
   const instructor = await registerModel.findOne({email:email, password:password,role:"instructor"})
   console.log(instructor)
   if(instructor){
    res.json({message:"Instructor logged in", instructor})
   }
   else if(!instructor){
    res.json({message:"failed login"})
   }
})

//Courses creation by instructor

router.post('/create',async(req,res,next)=>{
    const { coursename, coursetype, courseduration} = req.body
    const createCourse = await courseModel.create({
        coursename:coursename,
        coursetype :coursetype,
        courseduration:courseduration
    })
    .then((result) => {
            res.json({message:"Course created successfully", course:result})
    }).catch((err) => {
        console.log(err)
    });
})
router.get('/allCourses', async(req,res)=>{
    const courses = await courseModel.find()
    res.json({message: "All the courses available in the DATABASE", courses:courses})
})


module.exports = router