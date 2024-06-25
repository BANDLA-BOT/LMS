const router = require("express").Router();
const validate = require('../config/verifyToken.js')
const path = require('path')
const jwt = require("jsonwebtoken");
const {
  registerModel,
  courseModel,
  wishlistModel,
} = require("../models/registrationModel.js");
const multer = require("multer");


router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const student = await registerModel.findOne({
      email: email,
      password: password,
      role: "student",
    });
    if (student) {
      const token = jwt.sign({
        user: {
          username: student.username,
          email: student.email,
          id: student._id,
          profile:student.profile,
          role: student.role,
        },
      },
      process.env.SECRET_KEY,{expiresIn:"1h"}
    );

      res.json({ message: "Student logged in successfully", student, token:token });
    } else if (!student) {
      res.json({ message: "No student found" });
    }
  } catch (error) {
    res.json({ message: "Error while login", error });
  }
});

router.post("/purchase/:courseId/:userId", validate, async (req, res) => {
  try {
    const {courseId,userId} = req.params
    const user = await registerModel.findById(userId)
    const course = await courseModel.findById(courseId);
    if(!user ||  !course){
      return res.status(400).json ({message:"User/Course not found "})
    }
    user.purchases.push(course)
    await user.save()
    res.status(200).json({message:"Course added to user ", user})
  } catch (error) {
    res.status(500).json({message:"Internal server error", err:error.message})
  }
});


router.get("/profile", validate, async (req, res) => {
  const user = req.user
  console.log(user)
  const course = await courseModel.find()
  res.json({message:"Courses available are", courses:course})
});

router.get('/categories', validate, async(req,res)=>{
  const user = req.user
  console.log(user)
  const free = await courseModel.find({coursetype:'free'});
  const paid = await courseModel.find({coursetype:"paid"})
  res.json({ message: "fetched",user:user, FreeCourses:free, PaidCourses:paid });
})

router.put("/update/:id", async (req, res) => {
  const { email, password,username } = req.body;
  const id = req.params.id;
  const user = await registerModel.updateOne(
    { _id: id },
    { $set: { email: email, password: password,username:username} }
  );
  res.json({ message: "updated successfully", user });
});

router.get('/search/filter',async(req,res)=>{
  try {
      const query = req.query.q;
      const course = await courseModel.find({
          $or: [
              { coursename: { $regex: query, $options: 'i' }},
          ]
      });
      const instructor = await registerModel.find({
          $or:[
              {username:{$regex:query, $options:'i'}}
          ]
      })
      res.json({message:"found results", Courses:course,instructor:instructor});
  } catch (error) {
      res.status(500).json({ message: 'Error While searching', error });
  }
})

//wishlist

router.post('/wishlist/:Id', validate, async(req,res)=>{
  try {
    const user = req.user
    console.log(user.user.username)
    const _id = req.params.Id
    const course = await courseModel.findById({_id:_id})
    console.log(course)
    const wishlist = new wishlistModel({
        list:course,
        studentUsername:user.user.username,
        studentEmail:user.user.email,
        studentId:user.user.id
    })
    await wishlist.save()
    res.json({message:"wishlist created ", wishlist:wishlist})
  } catch (error) {
    res.json({error:error.message, error:"Error occured while creating wishlist"})
  }
})
router.get('/getwishlist', validate, async(req,res)=>{
  const wishList = await wishlistModel.find()
  res.json({wishlist:wishList})
})
router.get('/certification', validate, async(req,res)=>{
    const user = req.user
    console.log(user)
    const username = user.user.username
    const email = user.user.email
    console.log(username)
    console.log(email)
    const student = await registerModel.findOne({email:email, username:username})
    console.log(student.purchases)
})


module.exports = router;
