import * as React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useAuth } from "../contexts/AuthContext";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from '../Firebase/firebase-config';
import {
    collection,
    // getDocs,
    // getDoc,
    // addDoc,
    updateDoc,
    // deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import BusinessTable from '../Components/User_Interface/user/BusinessTable';



  

export default function BusinessLandingPage() {
    const [businessInfo, setBusinessData] = React.useState([]);

    console.log(businessInfo)
    const { currentUser } = useAuth()
    console.log(currentUser)

    React.useEffect(() => {
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
    <React.Fragment>
        <Container>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {`Hello, ${currentUser.email}`}
                </Typography>
                <Grid item style={{marginLeft: "5em", marginTop: "1em" , width:'80%'}}>
                    <BusinessTable businessInfo={businessInfo} />
                </Grid>

        </Container>
    </React.Fragment>
        )
}