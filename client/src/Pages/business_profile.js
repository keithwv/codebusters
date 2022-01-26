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
import { useAuth } from '../contexts/AuthContext';



const theme = createTheme();



export const BusinessProfile = (props) => {    

const { currentUser } = useAuth()
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
          {`Welcome ${currentUser.email}`}
        </Typography>
        <Grid item xs={6}>
          <Card elevation={1}>
            Hello World
          </Card>
          </Grid> 
      </Container>
    </ThemeProvider>
  );
};
