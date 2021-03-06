import * as React from "react";
import Typography from "@mui/material/Typography";
import Header from "../Components/User_Interface/Header";
import { ThemeProvider } from "@material-ui/styles";
import { Box, Button, Grid, List } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase-config";
import { createTheme } from "@mui/system";
import Avatar from "@mui/material/Avatar";

const theme = createTheme();

function BusinessDetailsContent() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  // console.log(params);
  let myDOC_ID = params.get("DOC_ID");
  console.log(myDOC_ID, "+++++++++++++++++++++++");
  const [businessDetails, setBusinessDetails] = useState(null);
  console.log(businessDetails?.company_logo, "is company logo!!!!!!!!!!!");
  useEffect(() => {
    let collectionRef = collection(db, "services");
    let queryRef = query(collectionRef, where("DOC_ID", "==", myDOC_ID));
    const undo = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      }
      querySnap.docs.map((doc) => {
        const businessDetails = doc.data();
        setBusinessDetails(businessDetails);
        // console.log(businessDetails, "IS OUR DOC");
      });
    });
    return undo;
    // }
  }, [myDOC_ID]);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
      >
        Business Details
      </Typography>
      <Grid align="center">
        <Avatar
          alt=""
          src={businessDetails?.company_logo}
          sx={{
            mb: 4,
            mt: 4,
            width: 250,
            height: 250,
          }}
        />
      </Grid>
      <Box
        sx={{
          ml: "240px",
          mr: "240px",
        }}
      >
        {/* any field can be fetched here */}
        {!!businessDetails && businessDetails.description}
        {/* {!!businessDetails && businessDetails.company_logo} */}
      </Box>
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
          to={`/customer_calendar?Business_ID=${businessDetails?.Business_ID}&service=${businessDetails?.service}`}
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
