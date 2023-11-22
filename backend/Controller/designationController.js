
const designationModel = require('../Model/designationModel');


async function createDesignation  (req,res) {
    try {
        const designationData = await designationModel.createDesignation(req.body);
        return res.status(200).json({designationData,msg:"Designation Added"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function getAllDesignation  (req,res) {
    try {
        const designationData = await designationModel.find({});
        return res.status(200).json({designationData,msg:"Got Data"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function deleteDesignation  (req,res) {
    try {
        const {id} = req.body;
        const designationData = await designationModel.findByIdAndDelete(id);
        return res.status(200).json({designationData,msg:"Designation Deleted"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};




module.exports = {
    createDesignation,
    getAllDesignation,
    deleteDesignation
}