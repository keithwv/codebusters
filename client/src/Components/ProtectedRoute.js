import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const {currentUser} = useAuth

const ProtectedRoute = (props) => {
    const { children } = props
    console.log(children)
    const {currentUser} = useAuth();
    const location = useLocation();
    console.log(currentUser)
let output = currentUser ? children : <Navigate to="/login"  replace state={{ path: location.pathname}} />;
console.log(output)
return output
  
}

export default ProtectedRoute