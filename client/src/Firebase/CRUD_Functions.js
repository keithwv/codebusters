import { db } from "./firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

 const businessProfileRef = collection(db, "business");

       const addBusiness = (newBusiness) => {
            try {
                addDoc(businessProfileRef, newBusiness);
            } catch (error) {
                console.log(error)
            }
     };

     const updateBusiness = (id, updatedBusiness) => {
         const businessDoc = doc(db, "business", id);
         return updateDoc(businessDoc, updatedBusiness);
     };

    const deleteBusiness = (id) => {
         const businessDoc = doc(db, "business", id);
         return deleteDoc(businessDoc);
     }

    const getAllBusiness = () => {
         return getDocs(businessProfileRef);
     }

    const  getBusiness  = (id) => {
         const businessDoc = doc(db, "business", id)
         return getDoc(businessDoc);
     }
 

 export default addBusiness;