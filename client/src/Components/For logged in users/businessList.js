import React, { useState } from "react";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import Card from "@mui/material/Card";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { makeStyles } from "@material-ui/styles";
import { ListItemButton, ListItemText } from "@mui/material";

const Businesslist = () => {
  const { currentUser } = useAuth();
  const [business, setBusiness] = useState([]);

  const getbusiness = async () => {
    try {
      let collectionRef = collection(db, "business");
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
      let querySnap = await getDocs(queryRef);
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let businessData = querySnap.docs.map((doc) => ({
          ...doc.data(),
          DOC_ID: doc.id,
        }));
        setBusiness(businessData);
      }
    } catch (ex) {
      console.log("FIRESTORE FAILURE!", ex.message);
    }
  };

  return (
      <>
      <List>
        <ListItemButton onClick={getbusiness}>Click Me</ListItemButton>
          {business.map((b)=>(<><ListItemText primary={`Company Name: ${b.company_name}`}/>
          <ListItemText primary={`First Name: ${b.name}`}/>
          <ListItemText primary={`Last Name: ${b.last_name}`}/>
          <ListItemText primary={`Address1: ${b.address1}`}/>
          <ListItemText primary={`Address2: ${b.address2}`}/>
          <ListItemText primary={`City: ${b.city}`}/>
          <ListItemText primary={`Postal Code: ${b.postal_code}`}/>
          <ListItemText primary={`Province: ${b.province}`}/></>))}
      </List>
      </>
    //   </CardContent>
    // <div>
    //   <button onClick={getbusiness}>Click Me</button>
    //   {business.map((b) => (
    //     <><div>{b.company_name}</div>
    //     <div>{b.name}</div></>
    //   ))}
    // </div>
    // </>
  );
};

export default Businesslist;
