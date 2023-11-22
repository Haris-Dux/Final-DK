import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminProtected = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    if(user && user.role === 'admin') {
        return children ;
    }
   else {
    return <Navigate to='/' replace={true}/>
   }}

export default AdminProtected
