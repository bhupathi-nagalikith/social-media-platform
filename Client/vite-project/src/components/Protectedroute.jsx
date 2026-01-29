import React from 'react'
import { Navigate } from 'react-router-dom';

function Protectedroute({login,children}) {
   return login? children :<Navigate to="/" replace />
}

export default Protectedroute