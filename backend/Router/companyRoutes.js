
const {Router} = require("express");
const { createCompany, getAllCompanies, deleteCompany } = require("../Controller/companycontroller");


const companyRouter = Router();


companyRouter.post("/createCompany",createCompany);
companyRouter.post("/getAllCompanies",getAllCompanies);
companyRouter.post("/deleteCompany",deleteCompany);

module.exports = companyRouter;