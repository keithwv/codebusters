import React from "react";
// import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import { makeStyles } from "@material-ui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Businesslist from "../Components/for_logged_in_users/businessList";
// import { CardContent, CardHeader } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import AddServiceModal from "../Components/Modals/AddServicesModal";
import ServiceList from "../Components/for_logged_in_users/serviceList";

const theme = createTheme();

export const ServicesForBusiness = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" gutterBottom align="center">
        {`Welcome ${currentUser.email}`}
      </Typography>
      <Container
        maxWidth="sm"
        spacing={4}
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AddServiceModal/>
        <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant='outlined'>
            <Businesslist />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant='outlined'>
            <ServiceList/>
          </Card> 
        </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
