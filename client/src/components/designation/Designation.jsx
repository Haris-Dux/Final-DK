import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDesignationAsync,
  deleteDesignationAsync,
  getDesignationAsync,
} from "../../features/designationSlice";

const Designation = () => {
  const dispatch = useDispatch();
  const designations = useSelector(
    (state) => state.designation.getAllDesignation
  );
  const companies = useSelector((state) => state.company.getAllCompanies);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    instructorName: "",
    instructorPhone: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDesignationAsync(formData)).then(() => {
      setFormData({
        company:"",
          name: "",
          instructorName: "",
          instructorPhone:""
      })
      dispatch(getDesignationAsync());
    });
  };

  return (
    <>
      <section className=" text-gray-900 bg-gray-200">
        <div className="container py-12 mx-auto ">
          <h1 className="md:mx-4 text-3xl sm:text-4xl lg:text-4xl mb-4 font-medium text-gray-900 text-center ">
            Create Designation
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
                  htmlFor="instructorName"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Instructor Name
                </label>
                <input
                  type="text"
                  id="instructorName"
                  name="instructorName"
                  value={formData.instructorName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Instructor Name"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="instructorPhone"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Insstructor Phone
                </label>
                <input
                  type="text"
                  id="instructorPhone"
                  name="instructorPhone"
                  value={formData.instructorPhone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Instructor Phone"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="company"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Select Company
                </label>
                <select
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Instructor Phone"
                  required
                >
                  <option value="">-- choose company --</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="buttons mt-8 ml-24 sm:text-center md:text-start text-start">
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
          Edit Designations
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
                    Instructor Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Instructor Phone
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Company
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {designations.map((deg) => (
                <tbody>
                  <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-1 text-xl text-gray-950 "></td>
                    <td className="px-6 py-1 text-xl text-gray-950 ">
                      {deg.name}
                    </td>
                    <td className="px-6 py-1 text-xl text-gray-950 ">
                      {deg.instructorName}
                    </td>
                    <td className="px-6 py-1 text-xl text-gray-950 ">
                      {deg.instructorPhone}
                    </td>
                    {/* <td className="px-6 py-1 text-xl text-gray-950 ">
                      {getCompanyName(deg.company)} 
                    </td> */}
                    <td className="px-6 py-1 text-lg text-gray-950 ">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteDesignationAsync(deg.id)).then(() => {
                            dispatch(getDesignationAsync());
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

export default Designation;
