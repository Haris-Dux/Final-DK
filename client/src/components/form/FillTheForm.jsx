import React, { useEffect, useState } from "react";
import "./FillTheForm.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createFormAsync } from "../../features/formSlice";
import jsPDF from "jspdf";
import { getAllCompaniesAsync } from "../../features/companySlice";
import { getDesignationAsync } from "../../features/designationSlice";
import { logoutuserAsync, validateTokenAsync } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const FillTheForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  useEffect(()=>{
    dispatch(getAllCompaniesAsync())
    dispatch(getDesignationAsync())
  },[dispatch]);
  const companies = useSelector((state) => state.company.getAllCompanies);
  const user = useSelector((state) => state.auth.user);
  const designations = useSelector(
    (state) => state.designation.getAllDesignation
  );
  const filterdDesignation = designations.filter(
    (item) => item.company === company.id || company._id
  );
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reference: user.name,
    location: company.location,
    paidAmount: "",
    designation: null,
    companyName: "",
    salary: company.salary,
    time: company.time,
  });
  useEffect(() => {
    setFormData({
      ...formData,
      location: company.location,
      salary: company.salary,
      time: company.time,
    });
  }, [company.location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // State and event handlers for the first dropdown
  const [isOpen1, setIsOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  // State and event handlers for the second dropdown
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };
  const token = Cookies.get('token');
  const handleSubmit = async (e) => {
    e.preventDefault();
   await dispatch(validateTokenAsync({accessToken:token}))
    .then((response)=>{
      console.log(response.payload.user);
      if(response.payload.user === false){
        dispatch(logoutuserAsync())
        navigate('/login')
      } else {
        dispatch(createFormAsync(formData)).then((response) => {
          if (response.payload === 200) {
            delete formData.paidAmount;
            convertToPdf();
            setFormData({
              name: "",
              email: "",
              phone: "",
              reference: user.name,
              location: "",
              paidAmount: "",
              designation: null,
              companyName: "",
              salary:"",
              time:""
            });
          }
        });
      }
    })
    
  };

  const convertToPdf = () => {
    const doc = new jsPDF();
    doc.setFont("times");
    doc.setFontSize(24);
    doc.text("DK RECRUITMENT FORM", 105, 15, { align: "center" });
    let yPos = 40;
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Draw a border rectangle around the whole data
    doc.rect(10, 30, 190, yPos + 130);

    for (const key in formData) {
      if (formData[key]) {
        if (key === "designation" && typeof formData[key] === "object") {
          const designation = formData[key];
          
          const designationString = `${designation.name}`;
          
          const designationString2 =  `Instructor Name: ${designation.instructorName}`;
         
          const designationString3 = `Instructor Phone: ${designation.instructorPhone}`;

        // Text for label
        doc.text(
          `${key.charAt(0).toUpperCase() + key.slice(1)}: `,
          50,
          yPos + 10
        );
        doc.text(designationString, 80, yPos + 10);
        doc.setLineWidth(0.5);
        doc.line(60, yPos + 12, 170, yPos + 12);
        yPos += 10; 
        
        //SECOND
        doc.text(designationString2, 50, yPos + 10);
        doc.setLineWidth(0.5);
        doc.line(60, yPos + 12, 170, yPos + 12);
        yPos += 10; 

        //THIRD
        doc.text(designationString3, 50, yPos + 10);
        doc.setLineWidth(0.5);
        doc.line(60, yPos + 12, 170, yPos + 12);
        yPos += 10; 


        
        } else {
          // Text for label
          doc.text(
            `${key.charAt(0).toUpperCase() + key.slice(1)}: `,
            50,
            yPos + 10
          );

          // Text for data
          doc.text(`${formData[key]}`, 80, yPos + 10);

          // Draw an underline below the label and data
          doc.setLineWidth(0.5);
          doc.line(60, yPos + 12, 170, yPos + 12); // Adjust positions as needed

          yPos += 10; // Adjust the vertical position
        }
      }
    }

    doc.save("DK_Recruitment_Form.pdf");
  };

  return (
    <>
      <section className="form-fill text-gray-900 bg-gray-200">
        <div className="container py-12 mx-auto ">
          <h1 className="md:mx-4 text-3xl sm:text-4xl lg:text-4xl mb-4 font-medium text-gray-900 text-center md:text-start">
            DK Recruitment Form
          </h1>
          <p className="md:mx-4 mb-8 sm:text-lg lg:text-xl leading-relaxed text-center md:text-start">
            Fill all the required details here
          </p>
          <form className="mx-2 sm:mx-3 md:mx-4">
            {/* FIRST ROW */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
            </div>

            {/* SECOND ROW */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="reference"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Reference
                </label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  value={user.name}
                  disabled
                  onChange={handleChange}
                  className="bg-gray-50 uppercase border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Reference Person Name"
                  required
                />
              </div>
            </div>

            {/* THIRD ROW */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label
                  htmlFor="location"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={company.location}
                  disabled
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select Company"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="paidAmount"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Paid Amount
                </label>
                <input
                  type="number"
                  id="paidAmount"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Paid Amount"
                  required
                />
              </div>
            </div>

            {/* CONDITIONAL ROW */}
            <div className="grid md:grid-cols-2 md:gap-6">
              {company.salary ? (
                <div className="mb-6">
                  <label
                    htmlFor="salary"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Salary
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={company.salary}
                    disabled
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select Company"
                    required
                  />
                </div>
              ) : null}

              {company.time ? (
                <div className="mb-6">
                  <label
                    htmlFor="time"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Time
                  </label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={company.time}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select Company"
                    required
                  />
                </div>
              ) : null}
            </div>

            {/* FOURTH ROW */}
            <div className="grid md:grid-cols-2 md:gap-10 ">
              {/* Second dropdown */}
              <div className="relative  z-0 w-full mb-6 group">
                <button
                  onClick={toggleDropdown2}
                  className="dropdown-setting text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-md py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  type="button"
                >
                  {formData.companyName || "Choose Company Name"}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  className={`z-10 ${
                    isOpen2 ? "" : "hidden"
                  }  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dropdown-menu-setting-two`}
                >
                  <ul
                    className="py-2 text-lg text-gray-700 dark:text-gray-200 "
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {companies.map((company) => (
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setCompany(company);
                            setFormData({
                              ...formData,
                              companyName: company.name,
                            });
                            toggleDropdown2();
                          }}
                        >
                          {company.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="buttons sm:text-center md:text-start text-start">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-md px-6 py-3 text-center mr-2 mb-2"
                >
                  Generate Slip
                </button>
              </div>
              {/* First dropdown */}
              <div className="relative z-0 w-full mb-6 group">
                <button
                  onClick={toggleDropdown1}
                  className={`dropdown-setting text-white ${
                    filterdDesignation.length === 0
                      ? "bg-blue-400 "
                      : "bg-blue-700 hover:bg-blue-800"
                  }   focus:outline-none font-medium rounded-lg text-md py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                  type="button"
                  disabled={filterdDesignation.length === 0}
                >
                  {(formData.designation && formData.designation.name) ||
                    "Select Company First"}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  className={`z-10 ${
                    isOpen1 ? "" : "hidden"
                  }  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dropdown-menu-setting-one`}
                >
                  <ul
                    className="py-2 text-lg text-gray-700 dark:text-gray-200 "
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {filterdDesignation.map((deg) => (
                      <li key={deg.id}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({
                              ...formData,
                              designation: deg,
                            });
                            toggleDropdown1();
                          }}
                        >
                          {deg.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default FillTheForm;
