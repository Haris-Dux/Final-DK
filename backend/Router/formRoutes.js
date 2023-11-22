
const {Router} = require('express');
const { createForm, getAllForms } = require('../Controller/formController');

const formRouter = Router();

formRouter.post("/createForm",createForm);
formRouter.post("/getAllForms",getAllForms);

module.exports = formRouter;
