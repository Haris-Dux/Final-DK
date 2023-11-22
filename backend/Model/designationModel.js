
const mongoose = require('mongoose');

function setMongoose () {
    mongoose.set('toJSON',{
        virtuals:true,
        transform: (doc,returnValue) => {   
            delete returnValue._id
            delete returnValue.__v
                 
        }
    })
};

const Schema = mongoose.Schema;

const designationSchema = new Schema({
    company: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    name: { type: String, required: true},
    instructorName: { type: String, required: true },
    instructorPhone: {type: String,required: true},
},{timestamps:true});

designationSchema.statics.createDesignation = async function (data) {
    const {name,instructorName,instructorPhone,company} = data;
    if(!company){
        throw new Error("Company Name Required")
    }
    if(!name){
        throw new Error("Designation Name Required")
    }
    if(!instructorName){
        throw new Error("Instructor Name Required")
    }
    if(!instructorPhone){
        throw new Error("Instructor Phone Number Required")
    }
    const designation = await this.create(data)
    setMongoose();
    return designation;
};

module.exports = mongoose.model("Designations",designationSchema);