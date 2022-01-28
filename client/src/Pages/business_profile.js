import React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Businesslist from "../Components/For logged in users/businessList";
import { CardContent } from "@mui/material";
import { useAuth } from '../contexts/AuthContext';
// import { useCollection } from '../Firebase/firebase_hooks'
// // import { useState, useEffect} from 'react'
// import { db } from "../Firebase/firebase-config"
// import { collection, getDocs, query } from "firebase/firestore";


const theme = createTheme();



export const BusinessProfile =  () => {  
  const { currentUser} = useAuth()
  console.log(currentUser)
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {`Welcome ${currentUser.firstName}`}
        </Typography>
        <Grid item xs={6}>
          <Card>
            <CardContent>
          <Businesslist/>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
