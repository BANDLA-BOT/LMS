const router = require("express").Router();
const sendEmail = require("../config/sendmail.js");
// const path = require('path')
const multer = require('multer')
const { registerModel } = require("../models/registrationModel.js");

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, 'public/profile')
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now() + '-' +  file.originalname)
  }
})
const upload =multer({
  storage:storage
}).single('profile')

router.post("/", upload, async(req, res) => {
  const { username, email, password, role } = req.body;
  const profile = req.file.profile

  try {
    const user = new registerModel({
      email: email,
      username: username,
      password: password,
      role: role,
      profile:profile,
    });
    await user.save()


    const text = `
    <h1>Registered successfully as <span>${user.role}</span></h1>
    <p>email:  ${user.email}</p>
    <p>password:  ${user.password}</p>
    `
    await sendEmail(email, "Registration", text)
    res.json({message:"success", user})
    
  } catch (error) {
    res.json({message:"Registration failed", error})
  }
});

module.exports = router;
