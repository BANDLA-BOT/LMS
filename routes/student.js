const router = require('express').Router();
const {registerModel, courseModel} = require('../models/registrationModel.js')

router.post('/login', async(req,res,next)=>{
    try {
        const {email,password} = req.body
        const student = await registerModel.find({email:email, password:password, role:"student"})
        if(student){
            res.json({message:"logged in successfully",student})
        }
    } catch (error) {
        res.json({message:"Error while login", error})
    }
})
router.post('/course/:_id', async (req,res)=>{  
        const {email, username} = req.body
        const course = await courseModel.findById(req.params._id)
        const newData = await registerModel.updateOne({email:email},{$set:{course:course._id}})
        res.json({message:"success", newData})
        console.log(course)
})
router.get('/profile',async(req,res)=>{
        const course = await courseModel.find()
        res.json({message:"fetched", course})
})

module.exports = router