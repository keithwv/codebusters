import * as React from "react";
import Typography from "@mui/material/Typography";
import Header from "../Components/User_Interface/Header";
import { ThemeProvider } from "@material-ui/styles";
import { Button, Grid, List } from "@mui/material";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase-config";
import { createTheme } from "@mui/system";

const theme = createTheme();

function BusinessDetailsContent() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, "services");
    let queryRef = query(
      collectionRef,
      where("category", "==", "Online Services")
    );
    const undo = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let businessesList = querySnap.docs.map((doc) => {
          return {
            ...doc.data(),
            DOC_ID: doc.id,
          };
        });
        setDetails(businessesList);
      }
    });
    return undo;
  }, []);
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
      <List
        sx={{
          maxWidth: "100%",
          bgcolor: "background.paper",
          ml: "240px",
          mr: "240px",
        }}
      >
        {details.map((item) => {
          return (
            <>
              <ul key={item.DOC_ID}></ul>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={item.service}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.business}
                      </Typography>
                      {" - Your description here"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <hr />
            </>
          );
        })}
      </List>
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
