const companyModel = require("../Model/companyModel");

async function createCompany (req,res) {
    try {
        const company = await companyModel.createCompany(req.body);
        res.status(200).json({company,msg:"Company Added Successfully"});
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function getAllCompanies (req,res) {
   try {
    const companyData = await companyModel.find({});
    res.status(200).json({ companyData, msg: "Got Data" });
   } catch (error) {
    res.status(400).json({ msg: error.message });
   }
};

async function deleteCompany (req,res) {
    try {
        const {id} = req.body;
        if(!id){
            throw new Error("No Id Provided")
        }
        const company = await companyModel.findByIdAndDelete(id);
        res.status(200).json({ company, msg: "Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {
    createCompany,
    getAllCompanies,
    deleteCompany
}