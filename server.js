const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const adminRoute = require('./routes/admin.js')
const registerRoute = require('./routes/register.js')
const instructorRoute = require('./routes/routes.js')
const studentRoute = require('./routes/student.js')
const {db} = require('./config/db.js');


dotenv.config()
const app = express()

//DATABASE
db

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

//routes
app.use('/register',registerRoute)
app.use('/admin', adminRoute)
app.use('/instructor', instructorRoute)
app.use('/student', studentRoute)


app.listen(process.env.PORT, ()=>{
    console.log("Server connected on " + process.env.PORT)
})