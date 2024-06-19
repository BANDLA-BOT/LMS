const mongoose = require('mongoose');
require('dotenv').config()

const db = mongoose.connect(process.env.CONNECTION_STRING_DB)
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log(err.message)
})

module.exports = db