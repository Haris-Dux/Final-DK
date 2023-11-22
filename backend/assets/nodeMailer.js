
const userModel = require("../Model/userModel");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function resetPaswordMail (to,from) {
    const user = await userModel.findOne({email: to});
    if(!user){
        throw new Error("User Not Found")
    }
    let resetToken = JWT.sign(
        {id:user.id},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:"15min"});

        const output = `
        <h3>Password Reset Link</h3>
        <p>This link will expire in 15 minutes</p>
        <a href="http://localhost:3000/user/resetPassword?t=${resetToken}" target="_blank">Reset Link</a>
      `;
    let transport = nodemailer.createTransport({
        service:"gmail",
        port:587,
        secure:false,
        auth:{
            user: process.env.EMAIL_AUTH_USER_EMAIL,
            pass: process.env.EMAIL_AUTH_PASSWORD, 
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    let mailoptions = {
        from,
        to,
        subject:"Reset Passowrd Link",
        html:output
    };
    transport.sendMail(mailoptions,(error,info) => {
        if(error){
          return false;
        }
        return true;
    });
    };

    module.exports = {resetPaswordMail};
