const formSchema = require("../Model/formModel");


async function createForm (req,res) {
    try {
        const formData = await formSchema.createForm(req.body);
        res.status(200).json({formData,msg:"Slip Generated Successfully"});
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function getAllForms (req,res) {
  
  try {
    const formData = await formSchema.find({}, 'name email designation createdAt reference companyName location paidAmount phone salary time')
    .sort({ createdAt : -1 })
    .lean();
    res.status(200).json({ formData, msg: "Got All Forms" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


module.exports = {
    createForm,
    getAllForms
}