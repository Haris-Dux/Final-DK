import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompanyAsync,
  deleteCompanyAsync,
  getAllCompaniesAsync,
} from "../../features/companySlice";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.getAllCompanies);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    company: "",
    time:'',
    salary:''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCompanyAsync(formData)).then(() => {
      setFormData({
        name: "",
        location: "",
        company: "",
        time:'',
        salary:''
      });
      dispatch(getAllCompaniesAsync());
    });
  };

  return (
    <>
      <section className=" text-gray-900 bg-gray-200">
        <div className="container py-12 mx-auto ">
          <h1 className="md:mx-4 text-3xl sm:text-4xl lg:text-4xl mb-4 font-medium text-gray-900 text-center ">
            Create Company
          </h1>
          <form className="mx-2 sm:mx-3 md:mx-4" onSubmit={handleSubmit}>
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
                  htmlFor="location"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Location"
                  required
                />
              </div>
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
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="HH:MM TO HH:MM"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
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
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="RS"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="buttons sm:text-center md:text-start text-start">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-md px-6 py-3 text-center mr-2 mb-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="signupRequests text-gray-100 bg-gray-800 body-font py-10">
        <h1 className="sm:text-4xl lg:text-5xl font-medium title-font text-center mb-4">
          Edit Companies
        </h1>

        <div className=" mx-5 text-center mt-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* TABLE */}
            <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-md tracking-wider text-gray-100 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-5">
                    <div className="flex items-center"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">Timing</th>
                  <th scope="col" className="px-6 py-3">Salary</th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {companies.map((company) => (
                <tbody>
                  <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-1 text-xl text-gray-950 "></td>
                    <td className="px-6 py-1 text-xl text-gray-950 ">
                      {company.name}
                    </td>
                    <td className="px-6 py-1 text-xl text-gray-950 ">
                      {company.location}
                    </td>
                    <td className="px-6 py-1 text-xl text-gray-950 ">{company.time}</td>
                    <td className="px-6 py-1 text-xl text-gray-950 ">{company.salary}</td>
                    <td className="px-6 py-1 text-lg text-gray-950 ">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteCompanyAsync(company.id)).then(() => {
                            dispatch(getAllCompaniesAsync());
                          });
                        }}
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateCompany;
