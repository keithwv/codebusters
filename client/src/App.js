import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./Components/User Interface/Header";
import theme from "./Components/User Interface/Theme";
import { Route, Routes } from "react-router-dom";
// import UserType from "./Components/User Type/UserType";
import RegisterBusiness from "./Components/Register/RegisterBusiness";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./Components/log_in/loginBusiness";
import AddressForm from "./Components/for_logged_in_users/Business fill in form";
import { BusinessProfile } from "./Pages/business_profile";
import BasicModal from "./Components/Modals/Modal";
import CalendarWithSchedule from "./Components/Schedule/calendarPage";
import RegisterClient from "./Components/Register/RegisterClient";
import ServiceList from "./Components/for_logged_in_users/serviceList";


 
function App(props) {

  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <Header />
      {/* <UserType /> */}
      <Routes>
        <Route path='/' element={<div>Home</div>} />
        <Route path='/Register' element={<RegisterBusiness />} />
        <Route path='/Login' element={<SignIn />} />
        <Route path='/services' element={<ServiceList/>} />
        <Route path='/add-services' element={<BusinessProfile />} />
        <Route path='/modal' element={<BasicModal />} />
        <Route path='/login-business/fill-form' element={<AddressForm />} />
        <Route path='/calendar' element={<CalendarWithSchedule />} />
        <Route path='/register-client' element={<RegisterClient />} />
      </Routes>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
