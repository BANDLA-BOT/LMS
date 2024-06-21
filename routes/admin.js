const router = require('express').Router();
const {registerModel} = require('../models/registrationModel.js')



router.post('/login', async(req,res,next)=>{
    const {email,password,role} = req.body
    if(role === 'admin'){
        const admin = await registerModel.findOne({role:role,email:email,password:password})
        console.log(admin)
        if(admin){
            res.json({message:"Admin logged in"})
        }
        else if(!admin){
            res.json({message:"Error while login"})
        }
    }
    else{
        res.json({message:"Error while log in "})
        console.log("error")
    }
})
router.get('/getall', async(req,res)=>{
    const students = await registerModel.find({role:"student"})
    const instructors = await registerModel.find({role:"instructor"})
    res.json({students:students, instructors:instructors})
})
router.delete('/deleteuser/:id', async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const user = await registerModel.deleteOne({_id:id})
    res.json({message:"user", user})
})
module.exports = router