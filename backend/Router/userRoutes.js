

const {Router} = require('express');
const { signup, login, logout, forgotPassword, resetPassword, validateToken, approveUser, rejectUser, getAllUsers } = require('../Controller/userController');
const userRouter = Router();

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/logout",logout);
userRouter.post("/forgotPassword",forgotPassword);
userRouter.post("/resetPassword",resetPassword);
userRouter.post("/validateToken",validateToken);
userRouter.post("/approveUser",approveUser);
userRouter.post("/rejectUser",rejectUser);
userRouter.post("/getAllUsers",getAllUsers)

module.exports = userRouter;