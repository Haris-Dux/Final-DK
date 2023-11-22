
const userModel = require('../Model/userModel');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { resetPaswordMail } = require('../assets/nodeMailer');

async function generateToken({
    data = {},
    tokenSecret =process.env.JWT_ACCESS_SECRET,
    expiresIn = "1d",
  } = {}) {
    return await JWT.sign(data, tokenSecret, { expiresIn });
  };

async function signup (req,res) {
    try {
        const userData = await userModel.signup(req.body);
        res.status(200).json({userData,msg:"Sign Up Successfull , Your Request will Reviewd By Admin"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function login(req,res) {
    try {
        const userData = await userModel.login(req.body);
        if(!userData.isApproved){
            throw new Error ('Your Account Is Still Pending For Approval Please Contact Admin')
          }
          const accessToken = await generateToken({
            data : {
                id:userData.id
            }
        });
        return res.status(200).json({userData,accessToken,msg:"Login SuccessFull"})
        
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function logout(req,res) {
    try {
        res.status(200).json({msg:"Logout Successfull"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function forgotPassword(req,res) {
    const { email } = req.body;
    const from = process.env.EMAIL_FROM;
    try {
        if (!email) {
            throw new Error("No Email Provided");
          }
       const emailResponse = await resetPaswordMail(email,from);
       res.status(200).json({msg:'Email Sent'})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function resetPassword(req,res) {
    const {resetToken,newPassword,confirmPassword} = req.body;
    try {
        if(newPassword !== confirmPassword){
            throw new Error ("Passwords Not Matching")
        }
        const decode = await JWT.decode(
            resetToken,
            process.env.JWT_ACCESS_SECRET,
        );
        const user = await userModel.findById(decode.id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        await userModel.findByIdAndUpdate(user.id,{password:hashedPassword});
        res.status(200).json({msg:"Password Reset Successfully"});
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function validateToken(req, res) {
    const { accessToken } = req.body;
    let tokenValidation = false;
    try {
      const decodedToken = JWT.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      const user = await userModel.findById(decodedToken.id);
      if (!user) {
        return res.status(401).json({ user: false, msg: "User not found" });
      }
      tokenValidation = true;
      return res.status(200).json({
        tokenValidation,
        msg: "Your Session is Valid",
        user:true
      });
    } catch (error) {
      tokenValidation = false;
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ tokenValidation, msg: "Your Session is Expired" });
      }
      return res.status(401).json({ tokenValidation, msg: "Invalid Token" });
    }
  };
  

async function approveUser (req,res) {
    try {
        const user = await userModel.approveUser(req.body);
        res.status(200).json({ msg: "User approved successfully", user });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
};

async function rejectUser (req,res) {
    try {
        const user = await userModel.rejectUser(req.body);
        res.status(200).json({ msg: "User UNAUTHORIZED", user });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
};

async function getAllUsers (req,res) {
    try {
        const users = await userModel.find({})
        res.status(200).json({ msg: "Got All Users", users });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    validateToken,
    approveUser,
    rejectUser,
    getAllUsers
}