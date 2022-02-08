import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase-config";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { makeStyles } from "@material-ui/styles";
import { ListItemButton, ListItemText } from "@mui/material";


const Businesslist = () => {
  const { currentUser } = useAuth();
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, "business");
    let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let businessData = querySnap.docs.map((doc) => {
          return {
            ...doc.data(),
            DOC_ID: doc.id,
          };
        });
        setBusiness(businessData);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {business.map((business) => {
        return (
          <List key={business.uid}>
            <ListItemText primary={`Company Name: ${business.company_name}`} />
            <ListItemText
              primary={`Name: ${business.name} ${business.last_name}`}
            />
            <ListItemText
              primary={`Street Address: ${business.address1} ${business.address2}`}
            />
            <ListItemText primary={`City: ${business.city}`} />
            <ListItemText primary={`Postal Code: ${business.postal_code}`} />
            <ListItemText primary={`Province: ${business.province}`} />
          </List>
        );
      })}
    </>
  );
};

export default Businesslist;
