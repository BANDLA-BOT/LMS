const router = require("express").Router();
const sendEmail = require("../config/sendmail.js");
const { registerModel } = require("../models/registrationModel.js");


//registration for Admin and Instructor

router.post("/",async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = new registerModel({
      email: email,
      username: username,
      password: password,
      role: role,
    });
    await user.save();
    const text = `
    <h1>Registered successfully as <span>${user.role}</span></h1>
    <p>email:  ${user.email}</p>
    <p>password:  ${user.password}</p>
    `;
    await sendEmail(email, "Registration", text);
    res.json({ message: "success", user });
  } catch (error) {
    res.json({ message: "Registration failed", error });
  }
});

module.exports = router;
