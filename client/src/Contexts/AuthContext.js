import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase-config';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState()

    const register = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password) 
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser, 
        register
    }
  return (
      <AuthContext.Provider value={value}>
          {props.children}
      </AuthContext.Provider>)
}

export default AuthProvider