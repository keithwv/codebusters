import { Card, CardHeader, CardContent, Container, Grid, Typography, Divider } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Header from "../Components/User_Interface/Header";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase/firebase-config";
import * as moment from 'moment'

const AppointmentHistory = () => {
  console.log("Hit");
  const [purchasedServices, setPurchasedServices] = useState([]);

  console.log(purchasedServices);

  const { currentUser } = useAuth();
  console.log("Hit");

  useEffect(() => {
    let collectionRef = collection(db, "events");
    if (currentUser?.uid) {
      let queryRef = query(collectionRef, where("uid", "==", currentUser?.uid),
      where("paid", "==", "Yes"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let purchasedServicesData = querySnap.docs.map((doc) => {
            return {
              ...doc.data(),
              DOC_ID: doc.id,
            };
          });
          setPurchasedServices(purchasedServicesData);
        }
      });
      return unsubscribe;
    }
  }, [currentUser]);

  console.log("Hit");
  return (
    <>
      <Header />
      <Container>
        <Grid
          spacing={2}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {purchasedServices.map((purchasedService) => {
          return (
          <Grid item>
            <Card xs={6}>
              <CardHeader
                sx={{fontWeight: 'bold'}}
                avatar={
                    <Avatar alt="" src={purchasedService?.company_logo}>
                        </Avatar>
                }
                sx={{fontWeight: 'bold'}} 
                title ={purchasedService?.company_name}
                subheader= {moment(purchasedService?.end_time).format('MMMM Do YYYY')}
              />
              <Divider/>
              <CardContent>
              <Typography variant='body2'>
                      <strong>Service:</strong> {purchasedService?.title}
                  </Typography>
                  <Typography variant='body2'>
                      <strong>Start Time:</strong> {moment(purchasedService?.start_time).format('LTS')}
                  </Typography>
                  <Typography variant='body2'>
                      <strong>End Time:</strong> {moment(purchasedService?.end_time).format('LTS')}
                  </Typography>
                  </CardContent>
            </Card>
          </Grid>
          )})}
        </Grid>
      </Container>
    </>
  );
};

export default AppointmentHistory;
