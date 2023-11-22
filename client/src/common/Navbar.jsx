import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, logoutuserAsync } from "../features/authSlice";
import { toast } from "react-toastify";
import dklogo from "../common/dklogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutuserAsync()).then(() => {
      dispatch(clearUser());
      toast.success("Logout Successfully");
      navigate("/login");
    });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-gray-800  text-gray-100 py-2">
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
                  className={`block h-6 w-6 ${mobileMenuOpen ? "hidden" : "block"
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* Icon when menu is open. */}
                <svg
                  className={`block h-6 w-6 ${mobileMenuOpen ? "block" : "hidden"
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link
                  to="/"
                  className="flex title-font font-medium items-center text-white md:mb-0"
                >
                  <img
                    src={dklogo}
                    alt="logo"
                    className="w-8 h-8"
                  >
                  </img>
                  <span className="ml-3 text-xl">DK HR's</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block py-3">
                <div className="flex space-x-4">
                  {/* ADMIN CHECK */}
                  {user && user.role === "admin" ? (
                    <>
                      <Link to="/" className="xs:mx-1 md:mx-6 mx-6 sm:text-md md:text-md lg:text-lg hover:text-white">
                        Home
                      </Link>

                      <Link to="/companyForm" className="mr-5 ml-4 text-lg hover:text-white">Company</Link>
                      <Link to="/designation" className="mr-5 ml-4 text-lg hover:text-white">
                        Designations
                      </Link>

                      <Link to="/dashboard" className="xs:mx-1 smdmx-6 mx-6 sm:text-md md:text-md lg:text-lg hover:text-white">
                        Slips
                      </Link>

                      <Link to="/signuprequests" className="xs:mx-1 md:mx-6 mx-6 md:pl-3 pl-5 sm:text-md md:text-md lg:text-lg hover:text-white">
                       Requests
                      </Link>

                      <Link
                        to="/allUsers"
                        className="xs:mx-1 md:mx-6 mx-6 md:pl-3 pl-5 sm:text-md md:text-md lg:text-lg hover:text-white"
                      >
                         HR's
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/" className="mr-5 ml-4 text-lg hover:text-white">
                        Home
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user ? (
                <>
                  <div className="small-screen">
                    <i
                      className="fa-solid fa-right-from-bracket text-2xl mx-2"
                      onClick={handleLogout}
                    ></i>
                  </div>
                  <div className="wide-screen flex items-center">
                    <i className="fa-solid fa-user text-2xl mx-2"></i>
                    <p className="text-lg tracking-wider mr-4 ml-3">
                      {user.name.toUpperCase()}
                    </p>
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-3"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="sign-btns">
                    <Link
                      to="/signup"
                      type="button"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-3"
                    >
                      Signup
                    </Link>
                    <Link
                      to="/login"
                      type="button"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-3"
                    >
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <div
          className={`sm:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col">
            {user ? (
              <>
                <Link to="/" className="xs:mx-1 md:mx-6 mx-6 sm:text-md md:text-md lg:text-lg hover:text-white">
                  Home
                </Link>

                {user.role === "admin" && (
                  <>
                    <Link to="/companyForm" className="xs:mx-1 md:mx-6 mx-6 sm:text-md md:text-md lg:text-lg hover:text-white">
                      Company
                    </Link>
                    <Link to="/designation" className="xs:mx-1 md:mx-6 mx-6 sm:text-md md:text-md lg:text-lg hover:text-white">
                      Designations
                    </Link>
                    <Link to="/dashboard" className="xs:mx-1 md:mx-6 mx-6 sm:text-md md:text-md lg:text-lg hover:text-white">
                      Slips 
                    </Link>
                    <Link to="/signuprequests" className="xs:mx-1 md:mx-6 mx-6 sm:text-md md:text-md lg:text-lg hover:text-white">
                      Requests
                    </Link>
                    <Link
                      to="/allUsers"
                      className="xs:mx-1 md:mx-6 mx-6 sm:text-md md:text-md lg:text-lg hover:text-white"
                    >
                       HR's
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-3"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-3"
                >
                  Login
                </Link>
              </>
            )}
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
