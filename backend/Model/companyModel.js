const mongoose = require("mongoose");


function setMongoose () {
    mongoose.set('toJSON',{
        virtuals:true,
        transform: (doc,returnValue) => {
            delete returnValue._id
            delete returnValue.__v       
        }
    })
};

const Schema =  mongoose.Schema;

const companySchema = new Schema({
    name: {type: String, required: true, unique:true},
    location: { type:String ,required:true},
    time: {type: String},
    salary: {type: String}
});

companySchema.statics.createCompany = async function (data) {
    const {name,location,time,salary} = data;
    let company = await this.findOne({name});
    if(company){
       throw new Error("Company with that name already exists")
    }
    if(!name){
        throw new Error('Name is required')
    }
    if(!location){
        throw new Error('Location is required')
    }

    const companyData = {
        name,
        location,
    };

    if (time) {
        companyData.time = time;
    }

    if (salary) {
        companyData.salary = salary;
    }
    company = await this.create(companyData)
    setMongoose()
    return company;
};

module.exports = mongoose.model("company",companySchema);