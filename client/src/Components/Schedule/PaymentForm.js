import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Controller, useFormContext } from 'react-hook-form';

export default function PaymentForm(props) {
   const {formData, setFormData} = props

   const {control, formState} = useFormContext()

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <Controller 
            name="cardName"
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
          <TextField
            required
            id="cardName"
            label="Name on card"
            value={formData.cardName}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, cardName: e.target.value})
            }}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            error={!!formState.errors.cardName}
            helperText={formState.errors.cardName?.message}
          />
            )}
            />
        </Grid>
        <Grid item xs={12} md={6}>
        <Controller 
            name="cardNumber"
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
          <TextField
            required
            id="cardNumber"
            label="Card number"
            value={formData.cardNumber}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, cardNumber: e.target.value})
            }}
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            error={!!formState.errors.cardNumber}
            helperText={formState.errors.cardNumber?.message}
          />
            )}
            />
        </Grid>
        <Grid item xs={12} md={6}>
        <Controller 
            name="expDate"
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
          <TextField
            required
            id="expDate"
            label="Expiry date"
            value={formData.expDate}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, expDate: e.target.value})
            }}
            fullWidth
            value={formData.expDate}
            autoComplete="cc-exp"
            variant="standard"
          />
            )}
            />
        </Grid>
        <Grid item xs={12} md={6}>
        <Controller 
            name="cvv"
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
          <TextField
            required
            value={formData.cvv}
            onChange={(e) => {
                onChange(e)
                setFormData({...formData, cvv: e.target.value})
            }}
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
            )}
            />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}