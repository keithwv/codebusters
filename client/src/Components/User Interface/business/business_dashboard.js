import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../../../contexts/AuthContext";
import SignIn from '../../log_in/loginBusiness';




const cards = [
  {
    'id': 1,
    'image': "https://source.unsplash.com/random",
    'alt': "random",
    'headerText': "Your Services",
    'buttonText': "View Services",
    'mainText': "Here you can view a list of your existing services"
  },
  {
    'id': 2,
    'image': "https://source.unsplash.com/random",
    'alt': "random",
    'headerText': "Add/Remove Services",
    'buttonText': "Change Services",
    'mainText': "Here you can add or delete your existing services"
  }];

const theme = createTheme();

export default function BusinessDashboard() {
  const { currentUser } = useAuth()
  if (currentUser) {

    return (

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          {/* <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar> */}
        </AppBar>
        <main>
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
                {`Welcome ${currentUser.email}`}
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                What would you like to do today?
              </Typography>
              {/* adds two buttons */}
              {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
              {/* </Stack> */}
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
                        // href=""
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
console.log ("help!")