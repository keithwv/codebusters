import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./Components/User Interface/Header";
import theme from "./Components/User Interface/Theme";
import { Route, Routes } from "react-router-dom";
// import UserType from "./Components/User Type/UserType";
import RegisterBusiness from "./Components/Register/RegisterBusiness";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./Components/Log In/loginBusiness";
import AddressForm from "./Components/For logged in users/Business fill in form";
import { BusinessProfile } from "./Pages/business_profile";


 
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
        <Route path='/AboutUs' element={<div>About Us</div>} />
        <Route path='/ContactUs' element={<BusinessProfile />} />

        <Route path='/login-business/fill-form' element={<AddressForm />} />
      </Routes>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
