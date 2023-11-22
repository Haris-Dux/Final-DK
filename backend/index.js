

const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const path = require("path");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./Router/userRoutes');
const formRouter = require('./Router/formRoutes');
const companyRouter = require('./Router/companyRoutes');
const designationRouter = require('./Router/designationRoutes');


app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));


app.use(express.static('dist'));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'));
});





app.use('/api',userRouter);
app.use("/api",formRouter);
app.use("/api",companyRouter);
app.use("/api",designationRouter);

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to MongoDB");
    app.listen(process.env.PORT,console.log(`server running on PORT ${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error)
})

