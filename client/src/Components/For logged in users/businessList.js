import React, { useState } from "react";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import Card from "@mui/material/Card";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { makeStyles } from "@material-ui/styles";
import { ListItemButton, ListItemText } from "@mui/material";
import shortid from 'shortid';

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
    console.log(business)
  };

  return (
      <>
      <List>
        <ListItemButton onClick={getbusiness}>Business Info</ListItemButton>
          {business.map((business, index)=>(<ListItemText key={index} primary={`Company Name: ${business.company_name}`}/>))}
          {business.map((business, index)=>(<ListItemText key={index} primary={`Name: ${business.name} ${business.last_name}`}/>))}
          {business.map((business, index)=>(<ListItemText key={index} primary={`Street Address: ${business.address1} ${business.address2}`}/>))}
          {business.map((business, index)=>(<ListItemText key={index} primary={`City: ${business.city}`}/>))}
          {business.map((business, index)=>(<ListItemText key={index} primary={`Postal Code: ${business.postal_code}`}/>))}
          {business.map((business, index)=>(<ListItemText key={index} primary={`Province: ${business.province}`}/>))}
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
