import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase-config";
import Header from "../Components/User_Interface/Header";
import { useLocation, Link } from "react-router-dom";
import { Grid } from "@mui/material";

export default function ListOfBusinessesInCategory() {
  const [services, setServices, mainHeader] = useState([]);
  let location = useLocation();

  let params = new URLSearchParams(location.search);
  let myCategory = params.get("category");

  useEffect(() => {
    if (myCategory) {
      let collectionRef = collection(db, "services");
      let queryRef = query(collectionRef, where("category", "==", myCategory));
      const undo = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let serviceList = querySnap.docs.map((doc) => {
            return {
              ...doc.data(),
              DOC_ID: doc.id,
            };
          });
          setServices(serviceList);
        }
      });
      return undo;
    }
  }, [myCategory]);

  return (
    <>
      <Header />

      {/* Main title fetched from related category */}
      <Grid>
        <Typography
          variant="h4"
          sx={{
            width: "100%",
            ml: "296px",
          }}
        >
          {myCategory}
        </Typography>
      </Grid>

      {/* List of all found services and other related information */}
      <List
        sx={{
          ml: "296px",
          mr: "50%",
          minWidth: "500px",
        }}
      >
        {services.map((serviceInfo, key) => {
          return (
            <div key={key}>
              <ul key={serviceInfo.DOC_ID}></ul>

              <ListItem
                button
                component={Link}
                to={`/business-details?DOC_ID=${serviceInfo.DOC_ID}`}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar src={serviceInfo.company_logo} />
                </ListItemAvatar>
                <ListItemText
                  primary={serviceInfo.service}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {serviceInfo.business}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <hr />
            </div>
          );
        })}
        <br />
        {/* <Divider variant="inset" component="li" /> */}
      </List>
    </>
  );
}
