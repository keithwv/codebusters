import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFormContext, get } from "react-hook-form";
import { Button } from '@mui/material';



export default function AddressForm(props) {
    const { user, formData, setFormData} = props
    console.log("this is the form data", formData)
    // Customer information gathered from logged in user to be used to prepopulate form
    let customer_first_name = user.name
    let customer_last_name = user.last_name
    let customer_email = user.email

    // const {control, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(validationSchema),yupcriteriaMode: "all"})
    const {control, formState}=useFormContext()

    const onSubmit = (data, event) => {
        console.log(event)
        console.log(data)
    }
   console.log(formData)
  return (
    <React.Fragment>
        <form>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Controller
        name="firstName"
        control={control}
        render={({ field: {onChange, onBlur, value}}) => (
          <TextField
            required
            id="firstName"
            label="First name"
            value={user.name}
            onBlur={onBlur}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, firstName: e.target.value})
            }}
            //defaultValue={user.name}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            error={!!formState.errors.firstName}
            helperText={formState.errors.firstName?.message}
          />
        )}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, onBlur, value}}) => (
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={formData.lastName}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, lastName: e.target.value})
            }}
            defaultValue={customer_last_name}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            error={!!formState.errors.lastName}
            helperText={formState.errors.lastName?.message}
          />
        )}
        />
        </Grid>
        <Grid item xs={12}>
        <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value}}) => (
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, email: e.target.value})
            }}
            defaultValue={customer_email}
            fullWidth
            autoComplete="email"
            variant="standard"
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
          />
        )}
        />
        </Grid>
        <Grid item xs={12}>
        <Controller
        name="phone_number"
        control={control}
        render={({ field: { onChange, onBlur, value}}) => (
          <TextField
            required
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, phoneNumber: e.target.value})
            }}
            fullWidth
            autoComplete="phone_number"
            variant="standard"
            error={!!formState.errors.phone_number}
            helperText={formState.errors.phone_number?.message}
          />
        )}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller
        name="city"
        control={control}
        render={({ field: { onChange, onBlur, value}}) => (
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={formData.city}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, city: e.target.value})
            }}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            error={!!formState.errors.city}
            helperText={formState.errors.city?.message}
          />
        )}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller
        name="province"
        control={control}
        render={({ field: { onChange, onBlur, value}}) => (
          <TextField
            id="province"
            name="province"
            label="Province"
            value={formData.province}
            onBlur={onBlur}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, province: e.target.value})
            }}
            fullWidth
            required
            variant="standard"
            error={!!formState.errors.province}
            helperText={formState.errors.province?.message}
          />
        )}
        />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
}