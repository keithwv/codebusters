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

export default function ListOfBusinessesInCategory() {
  const [list, setList] = useState([]);
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let myCategory = params.get("category");
  console.log(`myCategory is ${myCategory}`);

  console.log(`location is:`, location);
  console.log(`category is:`, location.search);

  useEffect(() => {
    if (myCategory) {
      let collectionRef = collection(db, "services");
      console.log(`searching for services.category == ${myCategory}`);
      let queryRef = query(collectionRef, where("category", "==", myCategory));
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
          setList(businessesList);
        }
      });
      return undo;
    }
  }, [myCategory]);
  // console.log(list, "is list")
  return (
    <>
      <Header />
      <List
        sx={{
          maxWidth: "100%",
          bgcolor: "background.paper",
          ml: "240px",
          mr: "240px",
        }}
      >
        {list.map((item, key) => {
          return (
            <div key={key}>
              <ul key={item.DOC_ID}></ul>
              <ListItem
                button
                component={Link}
                to={"/business-details?DOC_ID=" + item.DOC_ID}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
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
            </div>
          );
        })}
        <br />
        {/* <Divider variant="inset" component="li" /> */}
      </List>
    </>
  );
}
