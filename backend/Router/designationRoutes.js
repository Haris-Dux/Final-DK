
const {Router} = require("express");
const { createDesignation, getAllDesignation, deleteDesignation } = require("../Controller/designationController");

const designationRouter = Router();

designationRouter.post("/createDesignation",createDesignation);
designationRouter.post("/getAllDesignation",getAllDesignation);
designationRouter.post("/deleteDesignation",deleteDesignation);

module.exports = designationRouter;