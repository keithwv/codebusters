import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// import { Button } from "@mui/material";
import { collection, endAt, onSnapshot, orderBy, query, startAt } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase-config";

export default function ListOfBusinessesInCategory() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, "business");
    let queryRef = query(collectionRef, orderBy("category"), startAt('Car Repairs'), endAt('Car Repairs'));
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
  }, []);

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          ml: "240px",
        }}
      >
        {list.map((item) => {
          return (
            <ul key={item.DOC_ID}>
              <li>category: {item.category}</li>
              <li>docId: {item.DOC_ID}</li>
              <hr />
            </ul>
          );
        })}
        <br />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
}
