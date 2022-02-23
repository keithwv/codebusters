import * as React from "react";
import Typography from "@mui/material/Typography";
import Header from "../Components/User_Interface/Header";
import { ThemeProvider } from "@material-ui/styles";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function BusinessDetailsContent() {
  return (
    <ThemeProvider>
      <Header />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
      >
        Business Details
      </Typography>
      <Grid
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          component={Link}
          to="/customer_calendar"
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          book appointment
        </Button>
      </Grid>
    </ThemeProvider>
  );
}

export default function businessDetails() {
  return <BusinessDetailsContent />;
}
