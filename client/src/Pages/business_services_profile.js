import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import { makeStyles } from "@material-ui/styles";
// import { CardContent, CardHeader } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import ServicesTable from "../Components/User_Interface/user/ServicesTable";
import { Avatar, Button, InputLabel, MenuItem, Select, Stack, TextField, FormControl, Typography, Paper } from "@mui/material";
import { UploadButtonBusiness } from "../Components/for_logged_in_users/UploadButtonBusiness";
import { db } from "../Firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Header from "../Components/User_Interface/Header";



export const ServicesForBusiness = () => {
  const [rows, setRows] = useState([])
  const [business, setBusiness] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  console.log(selectedBusiness)
  console.log(business)
  let businessLogo = selectedBusiness?.imageUrl

  const handleChange = (event) => {
    setSelectedBusiness(event.target.value)
  }

  const { currentUser } = useAuth();
  console.log(currentUser);

  // Get all business for logged in user
  useEffect(() => {
    let collectionRef = collection(db, "business");
     if (currentUser?.uid) {
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let businessData = querySnap.docs.map((doc) => {
            return {
              ...doc.data(),
              DOC_ID: doc.id,
            };
          });
          setBusiness(businessData);
          setSelectedBusiness(businessData[0])
          
        }
      });
      return unsubscribe;
     }
  }, [currentUser.uid]);
  
  console.log("The business selected is", selectedBusiness)
  console.log("The inital business selected is", business)

  return (
    <>
      <Header/>
      <Container>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item>
            <Avatar
              alt=""
              src={businessLogo}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item  sx={{mt: "3.75rem"}}>
            <UploadButtonBusiness rows={rows}  docId = {selectedBusiness?.DOC_ID} />
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        > 
         
          <Grid item sx={{mt:"2rem"}}>
            <FormControl fullwidth="true"
            variant="standard"
            sx={{
              width:200,
              height:100
            }}>
              <InputLabel id="business-menu-id">Select a Business</InputLabel>
            <Select
              id="business-menu"
              labelId="business-menu-id"
              value={selectedBusiness}
              // displayEmpty={true}
              label="Business"
              onChange={handleChange}
            >
            {business.map((business) => {
              return (
                <MenuItem key={business.DOC_ID} value={business}>
                  {business.company_name}
                </MenuItem>
              );
            })}
            </Select>
          </FormControl>
             </Grid>
            </Grid>
            </Grid>
        <Grid item sx={{ mt: "0.5rem"}} >
          <ServicesTable rows={rows} setRows={setRows} business={business} selectedBusiness={selectedBusiness} />
        </Grid>
        
      </Container>
    </>
  );
};
