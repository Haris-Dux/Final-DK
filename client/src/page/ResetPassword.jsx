import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./SignCss.css";
import signup from "./Sign up.png";
import { resetpasswordAsync } from '../features/authSlice';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const resetToken = new URLSearchParams(window.location.search).get("t");


    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            // setIsLoading(true);
            dispatch(resetpasswordAsync({ newPassword, confirmPassword, resetToken }))
                .then((response) => {
                    toast.success("Password reset successfully.");
                    navigate("/login");
                })
        } catch (error) {
            console.log(error);
            //toast.error("Password reset failed. Please try again.");
        }
    };


    return (
        <section className="sign text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-0 md:flex-row flex-col items-center">
                <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
                    <div className="form-cont bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="py-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset Password
                            </h1>
                            <form className="form space-y-4 md:space-y-6" onSubmit={handleResetPassword}>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirm-password"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        placeholder="Confirm Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="button-bar text-center">
                                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-7 py-3 text-center mr-2 mb-2">Reset Password</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img className="object-cover object-center rounded" alt="hero" src={signup} />
                </div> */}
            </div>
        </section>
    );
}

export default ResetPassword;
