import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearUser, logoutuserAsync } from '../features/authSlice'
import { toast } from 'react-toastify'


const Navbarnew = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)


    const handleLogout = () => {
        dispatch(logoutuserAsync()).then(() => {
            dispatch(clearUser());
            toast.success("Logout Successfully");
        });
    }


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <button
                                type="button"
                                onClick={toggleMobileMenu}
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded={mobileMenuOpen}
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                {/* Icon when menu is closed. */}
                                <svg
                                    className={`block h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                {/* Icon when menu is open. */}
                                <svg
                                    className={`block h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                    </svg>
                                    <span className="ml-3 text-xl">DK HR's</span>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {user && user.role === "admin" ? (
                                        <>
                                            <Link to="/" className="mr-5 ml-4 text-lg hover:text-white">Home</Link>
                                            <Link to="/dashboard" className="mr-5 ml-4 text-lg hover:text-white">Dashboard</Link>
                                            <Link to="/signuprequests" className="mr-5 ml-4 text-lg hover:text-white">Signup Requests</Link>
                                        </>
                                    ) : (
                                        <Link to="/" className="mr-5 ml-4 text-lg hover:text-white">Home</Link>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {user ? (
                                <>
                                    <i class="fa-solid fa-user text-2xl mx-2"></i>
                                    <p className='text-lg tracking-wider mr-4 ml-3'>{user.name.toUpperCase()}</p>
                                    <button onClick={handleLogout} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-3">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-3">Signup</Link>
                                    <Link to="/login" type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-3">Login</Link>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                {/* Mobile menu, show/hide based on menu state. */}
                <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                        <a
                            href="#"
                            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover-bg-gray-700 hover-text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Team
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover-bg-gray-700 hover-text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Projects
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover-bg-gray-700 hover-text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Calendar
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbarnew;
