const regModel = require('../models/registrationModel.js')
const courseModel = require('../models/registrationModel.js')
const courses = require('../courses.js')




const registerController = (req,res,next)=>{
    try {
        const {username, email, password, role} = req.body
        const user = regModel.create({
            username:username,
            email:email,
            password:password,
            role:role
        })
        res.status(201).json({message:"user created successfully"})
    } catch (error) {
        res.status(500).json({message:"Error while creating user",error})
    }

}

const loginController = async(req,res,next)=>{
    try {
        const {email, password,role} = req.body
        const userExist = await regModel.findOne({email})
        if(userExist.password == password && role === 'Admin'){
            req.AdminEmail = email
            res.redirect('/admin')
        }
        else if(userExist.password == password && role === 'User' ){
            req.UserEmail = email
            res.redirect('/user')
        }
        else{
            res.status(404).json({message:"User not found"})
        }
    } catch (error) {
        res.status(404).json({
            message:"user not found"
        })
    }
}
const adminController = async(req,res,next)=>{
    const students = await regModel.find({role:"User"})
    console.log(students)
    const instructor = await regModel.find({role:"Instructor"})
    console.log(instructor)
    res.status(200).json({user:students, instructor})
}
const userController = async(req,res,next)=>{
    courses.map((course)=>{
        res.send(
            `<ul>
            <li>${course.id}</li>
            <li>${course.name}</li>
            <li>${course.type}</li>
            <li>${course.duration}</li>
            <li>${course.price}</li>
            </ul>`)
    })
}


module.exports = {
    registerController,
    loginController,
    userController,
}