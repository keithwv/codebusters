import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm(props) {
    const { user, formData, setFormData } = props
    console.log("this is the form data", formData)
    
    // Customer information gathered from logged in user to be used to prepopulate form
    let customer_first_name = user.name
    let customer_last_name = user.last_name
    let customer_email = user.email
    
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={formData.firstName}
            onChange={(e) => {
                setFormData({...formData, firstName: e.target.value})
            }}
            defaultValue={customer_first_name}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={formData.lastName}
            onChange={(e) => {
                setFormData({...formData, lastName: e.target.value})
            }}
            defaultValue={customer_last_name}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={(e) => {
                setFormData({...formData, email: e.target.value})
            }}
            defaultValue={customer_email}
            fullWidth
            autoComplete="email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => {
                setFormData({...formData, phoneNumber: e.target.value})
            }}
            fullWidth
            autoComplete="phone_number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={formData.city}
            onChange={(e) => {
                setFormData({...formData, city: e.target.value})
            }}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="province"
            name="province"
            label="Province"
            value={formData.province}
            onChange={(e) => {
                setFormData({...formData, province: e.target.value})
            }}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}