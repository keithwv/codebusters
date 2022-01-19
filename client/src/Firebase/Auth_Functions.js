import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from './Firebase/firebase-config'

const register = async () => {
  try {
    const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, LoginEmail, LoginPassword);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
};

const logout = async () => {
    await signOut(auth)
};
 