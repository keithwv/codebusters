import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from './Firebase/firebase-config'
import { useAuth } from "../contexts/AuthContext";

const register = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    console.log(user.displayName);
  } catch (error) {
    console.log(error.message);
  }
};

const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, LoginEmail, LoginPassword);
        console.log(user.displayName);
    } catch (error) {
        console.log(error.message);
    }
};

const logout = async () => {
    await signOut(auth)
};
 
export default logout;