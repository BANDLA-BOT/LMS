const router = require('express').Router();
const { registerModel } = require('../models/registrationModel.js')


router.post('/', async(req,res)=>{
    const {username, email, password, role} = req.body

        registerModel.create({
            username:username,
            email:email,
            password:password,
            role:role
        })
        .then((data)=>{
            console.log(data)
            res.status(201).json({message:"success", data:data})
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({message:"error while registering", err:err.message})
        })
})

module.exports = router