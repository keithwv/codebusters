import React, { useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from '../Firebase/firebase-config';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const register = async (email, password) => {
        try {
          const user = await createUserWithEmailAndPassword(auth, email, password);
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const loginFirebase = async (loginEmail, loginPassword) => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
            alert("You logged in success!")
        } catch (error) {
            console.log(error.message);
        }
        
    };

    const logout = async () => {
        try {
         const user = await signOut(auth);
         console.log(user);
         return user
            
        } catch (error) {
            console.log(error.message);
            alert("Error!")
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
        
        })
        return unsubscribe
    }, [])
     //if(currentUser){return<>currentUser</>}
    //if(loading){ return<>Loading...</>}

    const value = {
        currentUser, 
        register, 
        loginFirebase,
        logout
    }
  return (
      <AuthContext.Provider value={value}>
          {props.children}
      </AuthContext.Provider>)
}
