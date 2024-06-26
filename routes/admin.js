const router = require('express').Router();
const {registerModel, studentModel} = require('../models/registrationModel.js')


//Admin login

router.post('/login', async(req,res,next)=>{
    try {
    const {email,password,role} = req.body
    const admin = await registerModel.findOne({role:role, email:email, password:password})
    if(!admin){
        res.json({message:"No user found "})
    }
    res.json({message:"Admin logged in successfully", admin :admin})
    } catch (error) {
        res.json({error:error.message, message:"Internal server error"})
    }
})

//Admin can access all the user details

router.get('/getall', async(req,res)=>{
    try {
        const students = await studentModel.find()
        const instructors = await registerModel.find({role:"instructor"})
        if(!students){
            res.json({message:"No Students found in DB"})
        }
        if(!instructors){
            res.json({message:"No instructors found in DB"})
        }
        res.json({students:students, instructors:instructors})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

//Admin can delete a user 

router.delete('/deleteuser/:id', async(req,res)=>{
    try {
        const id = req.params.id
        console.log(id)
        const user = await registerModel.deleteOne({_id:id})
        const student = await studentModel.deleteOne({_id:id})
        res.json({message:"user", user, student:student})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})
module.exports = router