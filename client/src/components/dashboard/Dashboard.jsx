import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllFormAsync } from "../../features/formSlice";
import { getAllUsersAsync } from "../../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isOpen1, setIsOpen1] = useState(false);
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const slips = useSelector((state) => state.form.getAllForm);
  const names = useSelector((state) => state.auth.allUsers)
    .filter((data) => data.isApproved === true)
    .map((data) => data.name);
  useEffect(() => {
    dispatch(getAllFormAsync());
    dispatch(getAllUsersAsync());
  }, [dispatch]);
  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  let filterdData;
   if (name) {
    filterdData = slips.filter((item) => item.reference === name);
  } 
  else {
    filterdData = slips;
  }
  const [limit,setLimit] = useState(50);
  const [currentPage,setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filterdData.length/limit);
  const disabled = currentPage === totalPages;
  const disabled2 = currentPage === 1;

  // Calculate the index range for the currently displayed data
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  let displayedData = filterdData.slice(startIndex, endIndex);
  let searchData = [];
   if (searchQuery) {
    searchData = slips.filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
   displayedData = searchQuery.length > 1 ? searchData : displayedData;

  return (
    <>
      <section className="dashboard text-gray-100 body-font py-10" style={{}}>
        <h1 className="sm:text-4xl lg:text-5xl font-medium title-font text-center mb-2">
          Slips Record
        </h1>

        <div className=" mx-5 text-center mt-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative z-0 w-full mb-3 group text-start">
              <button
                onClick={toggleDropdown1}
                className="dropdown-setting text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-md py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {name || "HR Names"}
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
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search..."
                className=" ml-4 border text-black border-none rounded-lg px-6 py-3 focus:outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />

              <div
                className={`z-10 absolute left-0 mt-2 ${
                  isOpen1 ? "" : "hidden"
                }  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dropdown-menu-setting-one`}
              >
                <ul
                  className="py-2 text-lg text-gray-700 dark:text-gray-200 "
                  aria-labelledby="dropdownDefaultButton"
                >
                  {names.map((data) => (
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setName(data);
                          toggleDropdown1();
                        }}
                      >
                        {data}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* TABLE */}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-md tracking-wider text-gray-100 uppercase  bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-5 ">
                    <div className="flex items-center">Sr#</div>
                  </th>
                  <th scope="col" className="px-3 mx-0 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Hr Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Designation
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Company Name
                  </th>

                  <th scope="col" className="px-3 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Paid Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((data, index) => {
                    const date = new Date(data.createdAt);
                    const formattedDate = date.toLocaleDateString();
                    const formattedTime = date.toLocaleTimeString();
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-3 py-4 border-r  text-gray-950 ">
                          {index + 1}
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          {data.name}
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          {data.email}
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          <span> Date:{formattedDate}</span>
                          <span> Time:{formattedTime}</span>
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          {data.phone}
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          {data.reference}
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          {data.designation.name}
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          {data.companyName}
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          {data.location}
                        </td>
                        <td className="px-3 py-4 border-r text-gray-950 ">
                          {data.paidAmount}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-2xl   text-gray-950">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <div className=" flex justify-center mt-5 mb-5">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <button
                    onClick={() =>{ 
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                       window.scroll({top:0,behavior:"smooth"})
                      }
                    }
                    disabled={disabled2}
                    className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${disabled2 ? 'cursor-not-allowed bg-[#CCCCCC] text-black ' : 'hover:bg-[#5D62B5] hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} `}>
                    Previous
                  </button>
                </li>
                <li>
                  <span
                   
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {currentPage} / {totalPages}
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => {setCurrentPage((prev) => prev + 1 )
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={disabled}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${disabled ? 'cursor-not-allowed bg-[#CCCCCC] text-black ' : 'hover:bg-[#5D62B5] hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
    </>
  );
};

export default Dashboard;
