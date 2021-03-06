import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, {useState, useEffect} from 'react'
import { db } from "../../Firebase/firebase-config";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';




const SelectBusiness = (props) => {
    const {business, selectedBusiness, setSelectedBusiness} = props
  
    
    let businessLogo = selectedBusiness.imageUrl
    
    const handleChange = (event) => {
      setSelectedBusiness(event.target.value)
    }

  return (
      <>
      <Grid container direction="column">
    <Grid item >
    <FormControl fullwidth="true"
    variant="standard"
    elevation={3}
    sx={{
      width:150,
      height:100,
      fontsize: 900,
    }}>
      <InputLabel id="business-menu-id" sx={{color: "white"}}><strong>Select a Business</strong></InputLabel>
    <Select
      sx={{color:"white"}}
      id="business-menu"
      labelId="business-menu-id"
      value={selectedBusiness}
      displayEmpty={true}
      defaultValue={business[0]?.company_name}
      label="Business"
      onChange={handleChange}
    >
      <MenuItem value="">
      </MenuItem> 
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
     <Grid item>
     <Avatar alt="" src={businessLogo} sx={{ height: 100, width: 100, ml: "2rem", mb:"2rem"}}/>
     </Grid>
     </Grid>
     </>
  )
}

export default SelectBusiness