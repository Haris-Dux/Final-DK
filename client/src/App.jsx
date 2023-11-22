import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './components/home/HomePage';
import Header from './common/Header';
import Footer from './components/footer/Footer';
import FillTheForm from './components/form/FillTheForm';
import Login from './page/Login';
import Signup from './page/Signup';
import Dashboard from './components/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './page/ForgetPassword';
import ResetPassword from './page/ResetPassword';
import SignupRequests from './components/signupRequests/SignupRequests';
import CreateCompany from './components/form/CreateCompany';
import { useDispatch } from 'react-redux';
import { getAllCompaniesAsync } from './features/companySlice';
import Designation from './components/designation/designation';
import { getDesignationAsync } from './features/designationSlice';
import AllUsers from './components/signupRequests/AllUsers';
import AdminProtected from './components/protectedRoutes/AdminProtected';
import UserProtected from './components/protectedRoutes/UserProtected';
import Cookies from 'js-cookie';
import { logoutuserAsync, validateTokenAsync } from './features/authSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllCompaniesAsync())
    dispatch(getDesignationAsync())
  },[dispatch]);

    useEffect(()=>{
      const token = Cookies.get('token');
      dispatch(validateTokenAsync({accessToken:token}))
      .then((response)=>{
        console.log(response.payload.user);
        if(response.payload.tokenValidation === false ) {
          dispatch(logoutuserAsync())
        }
      })
    },[])
  

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/filltheform" element={<UserProtected><FillTheForm /></UserProtected>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AdminProtected><Dashboard /></AdminProtected>} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/user/resetPassword" element={<ResetPassword />} />
          <Route path="/signuprequests" element={<AdminProtected><SignupRequests /></AdminProtected>} />
          <Route path="/companyForm" element={<AdminProtected><CreateCompany/></AdminProtected>} />
          <Route path="/designation" element={<AdminProtected><Designation/></AdminProtected>} />
          <Route path="/allUsers" element={<AdminProtected><AllUsers/></AdminProtected>} />

        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={500}
        //hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
