import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState("");

  const register = async (firstName, lastName, email, password) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCred.user) {
        let docRef = doc(db, `users/${userCred.user.uid}`);
        await setDoc(docRef, {
          name: firstName,
          last_name: lastName,
          email: email,
          uid: userCred.user.uid,
        });
      }
      console.log(userCred.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginFirebase = async (loginEmail, loginPassword) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      alert("You logged in success!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      const user = await signOut(auth);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error.message);
      alert("Error!");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("use effect ");
    });
    return unsubscribe;
  }, []);

  console.log(currentUser);
  //console.log(currentUser.uid)

  const value = {
    currentUser,
    register,
    loginFirebase,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
