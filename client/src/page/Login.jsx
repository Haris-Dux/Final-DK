import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./SignCss.css";
import signup from "./Sign up.png";
import { loginuserAsync } from '../features/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logData, setLogData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogData({ ...logData, [name]: value });
    };

    // HANDLE SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(logData);

        try {
            dispatch(loginuserAsync(logData))
                .then((response) => {
                    console.log(response);
                    navigate("/");
                })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="sign text-gray-600 body-font">
            <div className="container main-cont mx-auto flex sm:px-2 px-5 py-0 md:flex-row flex-col items-center">
                <div className="flex cont flex-col items-center justify-center sm:px-2 px-6 py-4 mx-auto md:h-screen lg:py-0">
                    <div className="form-cont bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="py-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login to your account
                            </h1>
                            <form className="form space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={logData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm md:text-md lg:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={logData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="forget-password-bar">
                                    <Link to="/forgetpassword" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Forget Password?</Link>
                                </div>

                                <div className="button-bar text-center">
                                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-7 py-3 text-center mr-2 mb-2">Login</button>
                                </div>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                    Create an account?  <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</Link>
                                </p>
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

export default Login;
