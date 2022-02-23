import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Controller, useFormContext } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";



export default function Review(props) {
  const { formData, setFormData } = props;
  console.log(formData);
  const [contactInformation, setContactInformation] = React.useState([{}]);


  React.useEffect(() => {
    const handleAddress = setContactInformation([
      formData.firstName,
      formData.lastName,
      formData.phoneNumber,
      formData.email,
      formData.city,
      formData.province,
    ]);
  
  }, []);
  console.log(formData)

  console.log(contactInformation);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Purchase Service" secondary={formData.service} />
            <Typography variant="body2">{`$${formData.hourly_cost}/hr`}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Duration"/>
            <Typography variant="body2">{`${formData.duration} hr`}</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`$${formData.total_cost}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Contact Information
          </Typography>
          <Typography gutterBottom>{`Name: ${formData.firstName} ${formData.lastName}`}</Typography>
          <Typography gutterBottom>{`Phone Number: ${formData.phoneNumber}`}</Typography>
          <Typography gutterBottom>{`Email: ${formData.email}`}</Typography>
          <Typography gutterBottom>{`City: ${formData.city}`}</Typography>
          <Typography gutterBottom>{`Province: ${formData.province}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{`Card Name: ${formData.cardName}`}</Typography>
              <Typography gutterBottom>{`Card Number: ${formData.cardNumber}`}</Typography>
              <Typography gutterBottom>{`Expiry Date: ${formData.expDate}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
