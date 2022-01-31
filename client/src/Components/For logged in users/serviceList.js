import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
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


  useEffect(() => {
    let collectionRef = collection(db, "services");
    let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let serviceData = querySnap.docs.map((doc) => {
          return {
          ...doc.data(),
          DOC_ID: doc.id,
        };
      });
        setService(serviceData);
      }
    });
    return unsubscribe;
  }, []);
  
  
  return (
      <>
      {service.map((service) => {
        return (
          <List key={service.uid}>
            <ListItemText primary={`Service: ${service.service}`}/>
            <ListItemText primary={`Cost Per Hour: $${service.hourly_Cost}`}/>
          </List>
        )
        })}
      </>
  );
};

export default ServiceList;
