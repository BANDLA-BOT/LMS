const nodemailer = require("nodemailer");


const sendEmail = async(email, subject, text) =>{
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        })
        await transporter.sendMail({
            from:process.env.EMAIL,
            to:email,
            subject: subject,
            html: text,
        })
        console.log("Email sent successfully");
    }
    catch(error){
        console.log("Error while sending email", error)
    }
}
module.exports = sendEmail