

const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: {type: String, default: ""},
    role: {type: String, required: true},
    isApproved: { type: Boolean, default: false }
},{timestamps:true});

function setMongoose () {
    mongoose.set('toJSON',{
        virtuals:true,
        transform: (doc,returnValue) => {
            delete returnValue.password
            delete returnValue._id
            delete returnValue.__v
            delete returnValue.createdAt;
            delete returnValue.updatedAt;       
        }
    })
};

async function catchErrors (error) {
    const errorException = new Error(" ");
    let errorMsg = '';
    let errorCode = '';
    if(error.code === 11000){
        errorMsg = `${Object.keys(error.keyValue)[0]} already exists`
    } else{
       errorMsg = Object.values(error.message)[0]
    } 
    errorException.message = errorMsg;
    errorException.code = errorCode;

    throw errorException;
};


usersSchema.statics.signup = async function (data) {
    const {name,email,password,role,phone,isApproved} = data;
    if (!name) {
        throw new Error("Name Field is empty");
      }
      if (!email) {
        throw new Error("Email Field is empty");
      }
    
      if (!password) {
        throw new Error("Password Field is empty");
      }
      if (!phone) {
        throw new Error("Phone Field is empty");
      }
    
      if (!role) {
        throw new Error("Role is not set");
      }

      const validateEmail = validator.isEmail(email);

      if(!validateEmail){
        throw new Error('Invalid Email');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password,salt)

      const user = await this.create({
        name,
        email,
        password:hashedPass,
        role,
        phone,
        isApproved
      }).catch((error)=>catchErrors(error));
      setMongoose();
      return user;
};

usersSchema.statics.login = async function (data) {
    const {email,password} = data;
    if (!email) {
        throw new Error("Email Field is empty");
      }
    
      if (!password) {
        throw new Error("Password Field is empty");
      }

      const validateEmail = validator.isEmail(email);

      if (!validateEmail) {
        throw new Error("This is not a valid E-mail");
      }

      const user = await this.findOne({email});

      if (!user) {
        throw new Error ("User Not Found");
      }

      const comparePassword = await bcrypt.compare(password,user.password);

      if(!comparePassword){
        throw new Error ("Incorrect Password");
      }

      setMongoose();

      return user;

};

usersSchema.statics.approveUser = async function (data) {
    const {id} = data;
    const user = await this.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.isApproved) {
        throw new Error("User is already approved");
    }

    user.isApproved = true;
    await user.save();
    return user;
};

usersSchema.statics.rejectUser = async function (data) {
    const {id} = data;
    const user = await this.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    user.isApproved = false;
        await user.save();
        await this.deleteOne({ _id: user.id });
        return user;
};


module.exports = mongoose.model("users",usersSchema);