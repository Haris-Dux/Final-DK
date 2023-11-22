import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import signup from "./Sign up.png";
import "./SignCss.css";
import { forgetuserAsync } from '../features/authSlice';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // toast.success("Reset Link Sent")
        dispatch(forgetuserAsync({ email: email }));
        setEmail("");

    }
    return (
        <>
            <section className="sign forgetPassword text-gray-600 body-font">
                <div className="container main-cont mx-auto flex px-5 py-0 md:flex-row flex-col items-center">
                    <div className="flex cont flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
                        <div className="form-cont bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="py-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Forget Password
                                </h1>
                                <form className="form space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Enter Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm md:text-md lg:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>

                                    <div className="button-bar text-center">
                                        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-7 py-3 text-center mr-2 mb-2">Send Email</button>
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
        </>
    )
}

export default ForgetPassword
