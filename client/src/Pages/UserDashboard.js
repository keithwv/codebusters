import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import UserProfile from '../Components/User_Interface/user/UsersProfile';
import AppointmentHistory from '../Components/User_Interface/user/AppointmentHistory';
import Header from '../Components/User_Interface/Header';



const TabPanel = (props) => {
    const { children, value, index, ...other} =props;

return (
    <div {...other} justify>
      {value === index && <Box justifyContent="center" alignItems="center" p={3}>{children}</Box>}
    </div>
  );
}

const UserDashboard = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


return (
    <>
    <Header />
    <Tabs value={value} onChange={handleChange} centered>
      <Tab label="Profile Information"/>
      <Tab label="Appointment History"/>
    </Tabs>
    <TabPanel value={value} index={0}>
       <UserProfile/>
    </TabPanel>
    <TabPanel value={value} index={1}>
       <AppointmentHistory/>
    </TabPanel>
    </>
)
}


export default UserDashboard