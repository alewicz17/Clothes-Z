import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectRoute = () => {
 
  
  return (
     localStorage.getItem("isAuth") ? <Outlet /> : <Navigate to ="/signup"/>
  )
}

export default ProtectRoute