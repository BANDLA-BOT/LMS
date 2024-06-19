const router = require('express').Router();
const {registerModel} = require('../models/registrationModel.js')



router.post('/login', async(req,res,next)=>{
    const {email,password,role} = req.body
    if(role === 'admin'){
        const admin = await registerModel.find({role:role})
        console.log(admin)
        if(admin.password === password && admin.email === email){
            res.json({message:"logged in"})
        }
    }
})
router.get('/getall', async(req,res)=>{
    const students = await registerModel.find({role:"student"})
    const instructors = await registerModel.find({role:"instructor"})
    res.json({students:students, instructors:instructors})
})
module.exports = router