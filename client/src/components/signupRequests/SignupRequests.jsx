import React, { useEffect } from 'react'
import "./SignupRequests.css";
import { useDispatch, useSelector } from 'react-redux';
import { approveUserAsync, getAllUsersAsync, rejectUserAsync } from '../../features/authSlice';

const SignupRequests = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state.auth.allUsers);
    const users = Array.isArray(userData) ? userData.filter((item)=>item.isApproved === false) : [];
    useEffect(()=>{
        dispatch(getAllUsersAsync())
    },[dispatch]);
    
    return (
        <>
            <section className="signupRequests text-gray-100 bg-gray-800 body-font py-10">
                <h1 className="sm:text-4xl lg:text-5xl font-medium title-font text-center mb-4">Pending Requests</h1>

                <div className=" mx-5 text-center mt-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                        {/* TABLE */}
                        <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-md tracking-wider text-gray-100 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-5">
                                        <div className="flex items-center">
                                            Sr#
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                               {users.length > 0 ? ( users.map((data,index) => (
                                <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-1 text-xl text-gray-950 ">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-1 text-xl text-gray-950 ">
                                   {data.name}
                                </td>
                                <td className="px-6 py-1 text-xl text-gray-950 ">
                                   {data.email}
                                </td>
                                <td className="px-6 py-1 text-xl text-gray-950 ">
                                   {data.phone}
                                </td>
                                <td className="px-6 py-1 text-lg text-gray-950 ">
                                    <button onClick={(e)=>{e.preventDefault();dispatch(approveUserAsync(data.id)).then(()=>{dispatch(getAllUsersAsync())})}} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-1">Approve</button>
                                    <button onClick={(e)=>{e.preventDefault();dispatch(rejectUserAsync(data.id)).then(()=>{dispatch(getAllUsersAsync())})}} type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-1">Reject</button>
                                </td>
                            </tr>
                               )) ): (
                                <tr>
                                <td className="px-6 py-4 text-lg text-gray-950" colSpan="9">
                                  No data available
                                </td>
                              </tr>
                               ) }
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </>
    )
}

export default SignupRequests
