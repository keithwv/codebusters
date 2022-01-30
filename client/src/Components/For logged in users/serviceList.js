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

const ServiceList = () => {
  const { currentUser } = useAuth();
  const [service, setService] = useState([]);

  const getServices = async () => {
    try {
      let collectionRef = collection(db, "services");
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
      let querySnap = await getDocs(queryRef);
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let serviceData = querySnap.docs.map((doc) => ({
          ...doc.data(),
          DOC_ID: doc.id,
        }));
        setService(serviceData);
      }
    } catch (ex) {
      console.log("FIRESTORE FAILURE!", ex.message);
    }
    console.log(service)
  };

  return (
      <>
      <List>
        <ListItemButton onClick={getServices}>Services Provided</ListItemButton>
          {service.map((service, index)=>(<ListItemText key={index} primary={`Service: ${service.service} \n Cost: ${service.hourly_Cost}`}/>))}
      </List>
      </>
  );
};

export default ServiceList;
