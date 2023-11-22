
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    designation: {  
      name: { type: String, required: true },
      instructorName: { type: String, required: true },
      instructorPhone: { type: String, required: true },
    },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    reference: { type: String, required: true },
    paidAmount: { type: String, required: true },
    phone: {type: String, default: ""},
    salary: {type: String, default: ""},
    time: {type: String, default: ""},
   
},{timestamps:true});


function isFieldEmpty(fieldName, msg = null) {
    let fieldValidation = false;
  
    if (fieldName) {
      fieldValidation = true;
    } else {
      if (msg) {
        throw new Error(msg);
      } else {
        throw new Error("Something Went Wrong");
      }
    }
    return fieldValidation;
  }

formSchema.statics.createForm = async function (data) {
    const {name,email,designation,reference,companyName,location, paidAmount,phone,salary,time} = data;

      isFieldEmpty(name, "Name Field is Empty");
      isFieldEmpty(email, "Email Field is Empty");
      isFieldEmpty(designation, "Designation Field is Empty");
      isFieldEmpty(reference, "Reference Detail Field is Empty");
      isFieldEmpty(companyName, "Company Name Field is Empty");
      isFieldEmpty(location, "Location Type Field is Empty");
      isFieldEmpty(paidAmount, "Paid Amount Field is Empty");
      isFieldEmpty(phone, "Phone Field is Empty");

      let formData = await this.create(data);

      return formData; 

      };

module.exports = mongoose.model("Forms",formSchema);

