import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function Protectedroute({login,children}) {
   return login? children :<Navigate to="/" replace />
}

export default Protectedroute