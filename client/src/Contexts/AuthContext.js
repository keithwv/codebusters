import React, { useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from '../Firebase/firebase-config';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState()

    const register = async (email, password) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
          console.log(user);
        } catch (error) {
            console.log(error.message);
        }
      };

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

