import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const UserProtected = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    if(user && user.role === 'user') {
        return children ;
    }
   else {
    return <Navigate to='/' replace={true}/>
   }}

export default UserProtected
