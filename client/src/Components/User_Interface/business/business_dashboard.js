import React, {useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import SignIn from '../../log_in/loginBusiness';
import UploadImage from './UploadImage';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../../../Firebase/firebase-config";




const cards = [
  {
    'id': 1,
    'image': "https://source.unsplash.com/random",
    'alt': "random",
    'headerText': "Your Services",
    'buttonText': "View Services",
    'Link': "/services",
    'mainText': "Here you can view a list of your existing services"
  },
  {
    'id': 2,
    'image': "https://source.unsplash.com/random",
    'alt': "random",
    'headerText': "View Business Profile Page",
    'Link': "/profile",
    'buttonText': "Business Profile",
    'mainText': "Here you can add or delete your Business Profile"
  }];

const theme = createTheme();

export default function BusinessDashboard() {
  const { currentUser } = useAuth()

   // Get User from the users database
   const [users, setUsers] = useState([])
   
  
   // Get the user information of the users database for current logged in user
     useEffect(() => {
         if (currentUser?.uid) {
         let collectionRef=collection(db, 'users')
         let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
         const unsubscribe = onSnapshot(queryRef, (querySnap) => {
             if (querySnap.empty) {
                 console.log('No docs found')
             } else {
                 let usersData = querySnap.docs.map((doc) => {
                     return { ...doc.data(), DOC_ID: doc.id}
                 });
                 setUsers(usersData)
             }
         });
         return unsubscribe;
       }}, [currentUser?.uid]);
  
       console.log(users)
  if (currentUser) {

    return (
     
      <ThemeProvider theme={theme}>
         
        <CssBaseline />
       
        <main>
        <UploadImage docId={users[0]?.DOC_ID} Name={users[0]?.name}/>
          {/* Hero unit */}
       
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 2,
              pb: 4,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {`Hello, ${currentUser.email}`}
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Upload an image for your user profile below!
              </Typography>
            </Container>
          </Box>
         
          <Container sx={{ py: 3 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={12}>
              {cards.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={6}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        pt: '10%',
                      }}
                      image={card.image}
                      alt={card.alt}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.headerText}
                      </Typography>
                      <Typography>
                        {card.mainText}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        component={Link}
                        to={card.Link}
                        type="submit"
                        fullWidth
                        variant="contained"
                        // disabled={!formState.isValid}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {card.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
       
        {/* Footer */}

        {/* End footer */}
      </ThemeProvider>
    );
  } else {
    return (
      <>
        <Typography variant="h6" align="center" color="red"> You need to be logged in to view this page! </Typography>
        <SignIn />
      </>
    )
  }
}