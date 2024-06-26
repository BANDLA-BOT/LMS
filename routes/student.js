const router = require("express").Router();
const validate = require("../config/verifyToken.js");
const path = require("path");
const jwt = require("jsonwebtoken");
const {
  registerModel,
  courseModel,
  studentModel,
} = require("../models/registrationModel.js");

//multer to upload profile picture

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
}).single("profile");

//student registration

router.post("/register", upload, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const profile = req.file.profile;
    const newStudent = new studentModel({
      username: username,
      password: password,
      email: email,
      profile: profile,
    });
    await newStudent.save();
    res.json({
      message: "Student registered successfully ",
      StudenDetails: newStudent,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//user login

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const student = await studentModel.findOne({
      email: email,
      password: password,
    });
    if (student) {
      const token = jwt.sign(
        {
          user: {
            username: student.username,
            email: student.email,
            password: student.password,
            id: student._id,
            profile: student.profile,
          },
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Student logged in successfully",
        student,
        token: token,
      });
    } else if (!student) {
      res.json({ message: "No student found" });
    }
  } catch (error) {
    res.json({ message: "Error while login", error });
  }
});

//purchase courses

router.post("/purchase/:courseId/:studentId", validate, async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const student = await studentModel.findById(studentId);
    console.log(student);
    const course = await courseModel.findById(courseId);
    if (!student || !course) {
      return res.status(400).json({ message: "User/Course not found " });
    }
    student.purchases.push(course);
    await student.save();
    res.status(200).json({ message: "Course added to user ", student });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
});

// user profile

router.get("/profile", validate, async (req, res) => {
  const user = req.user;
  console.log(user);
  const course = await courseModel.find();
  res.json({ message: "Courses available are", courses: course });
});

//categories

router.get("/categories", validate, async (req, res) => {
  const user = req.user;
  console.log(user);
  const free = await courseModel.find({ coursetype: "free" });
  const paid = await courseModel.find({ coursetype: "paid" });
  res.json({
    message: "fetched",
    user: user,
    FreeCourses: free,
    PaidCourses: paid,
  });
});

//update user details

router.put("/update/:id", async (req, res) => {
  const { email, password, username } = req.body;
  const id = req.params.id;
  const user = await registerModel.updateOne(
    { _id: id },
    { $set: { email: email, password: password, username: username } }
  );
  res.json({ message: "updated successfully", user });
});

//search & filter

router.get("/search/filter", async (req, res) => {
  try {
    const query = req.query.q;
    const course = await courseModel.find({
      $or: [{ coursename: { $regex: query, $options: "i" } }],
    });
    const instructor = await registerModel.find({
      $or: [{ username: { $regex: query, $options: "i" } }],
    });
    res.json({
      message: "found results",
      Courses: course,
      instructor: instructor,
    });
  } catch (error) {
    res.status(500).json({ message: "Error While searching", error });
  }
});

//wishlist creation

router.post("/wishlist/:courseId/:studentId", validate, async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const student = await studentModel.findById({ _id: studentId });
    const course = await courseModel.findById({ _id: courseId });
    console.log(student, course);
    student.wishlist.push(course);
    await student.save();
    res.json({ message: "wishlist created ", student: student });
  } catch (error) {
    res.json({
      error: error.message,
      error: "Error occured while creating wishlist",
    });
  }
});

//get all wishList

router.get("/getwishlist", validate, async (req, res) => {
  const { email, password } = req.user.user;
  const student = await studentModel.find({ email: email, password: password });
  try {
    if (!student[0].wishlist.length) {
      res.json({ message: "There are no courses in your wishlist" });
    }
    res.json({ message: "Wishlist found", list: student[0].wishlist });
  } catch (error) {}
});

//certification

router.put("/certification/:courseId/:completed", validate, async (req, res) => {
  const{ courseId,completed} = req.params
  const user = req.user
  const {email, password} = user.user
  try {
    const student = await studentModel.findOneAndUpdate(
      { email: user.user.email,password:user.user.password, 'purchases._id': courseId },
      { $set: { 'purchases.$.completed': completed } },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student or course not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/getcertificate', validate, async(req,res)=>{
  try {
    const completedPurchases = await studentModel.aggregate([
      { $unwind: '$purchases' },
      { $match: { 'purchases.completed': true } },
      {
        $group: {
          _id: '$_id',
          email: { $first: '$email' },
          username: { $first: '$username' },
          completedPurchases: { $push: '$purchases' }
        }
      }
    ]);
    res.json(completedPurchases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completed purchases', error });
  }

  // const user = req.user
  // const student = await studentModel.find({email:user.user.email, password:user.user.password})
  // const isCompleted = student.purchases.completed
  // try {
  //   if(isCompleted){
  //     const course = student[0].purchases
  //     res.json({message:"You can access certificate", username:user.user.username, email:user.user.email,})
  //   }
  //   res.json({message:"You cannot Access certificate"})
  // } catch (error) {
    
  // }
})

module.exports = router;
