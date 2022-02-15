import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

import Grid from "@mui/material/Grid";
import { db } from "../Firebase/firebase-config";
import {
  collection,
  // getDocs,
  // getDoc,
  // addDoc,
  //updateDoc,
  // deleteDoc,
  //doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Header from "../Components/User_Interface/Header";
import BusinessTable from "../Components/User_Interface/user/BusinessTable";

export default function BusinessLandingPage() {
  const [businessInfo, setBusinessData] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null); //State for controlling the menu component
  const [open, setOpen] = useState(false); // State for controlling the menu component

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  console.log(businessInfo);
  const { currentUser } = useAuth();
  console.log(currentUser);

  useEffect(() => {
    let collectionRef = collection(db, "business");
    if (currentUser?.uid) {
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let businessInfo = querySnap.docs.map((doc) => {
            return {
              ...doc.data(),
              DOC_ID: doc.id,
            };
          });
          setBusinessData(businessInfo);
        }
      });
      return unsubscribe;
    }
  }, [currentUser.uid]);

  return (
    <>
      <Header/>
      <Container>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="blue"
          gutterBottom
        >
          Business List
        </Typography>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            style={{ marginLeft: "5em", marginTop: "1em", width: "80%" }}
          >
            <BusinessTable businessInfo={businessInfo} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
