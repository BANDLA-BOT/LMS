const router = require("express").Router();
const validate = require('../config/verifyToken.js')
const jwt = require("jsonwebtoken");
const {
  registerModel,
  courseModel,
} = require("../models/registrationModel.js");



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
          role: student.role,
        },
      },
      process.env.SECRET_KEY,{expiresIn:"3m"}
    );

      res.json({ message: "Student logged in successfully", student, token:token });
    } else if (!student) {
      res.json({ message: "No student found" });
    }
  } catch (error) {
    res.json({ message: "Error while login", error });
  }
});
router.post("/course/:courseId/:userId", async (req, res) => {
  try {
    const {courseId,userId} = req.params
    const user = await registerModel.findById(userId)
    const course = await courseModel.findById(courseId);
    if(!user ||  !course){
      return res.status(400).json ({message:"User/Course not found "})
    }
    user.courseDetails.push(course._id)
    await user.save()
    res.status(200).json({message:"Course added to user ", user})
  } catch (error) {
    res.status(500).json({message:"Internal server error", err:error.message})
  }
});
router.get("/profile", validate, async (req, res) => {
  const course = await courseModel.find();
  res.json({ message: "fetched", course });
});
router.put("/update/:id", async (req, res) => {
  const { email, password, role,username } = req.body;
  const id = req.params.id;
  const user = await registerModel.updateOne(
    { _id: id },
    { $set: { email: email, password: password, role: role,username:username} }
  );
  res.json({ message: "updated successfully", user });
});

module.exports = router;
