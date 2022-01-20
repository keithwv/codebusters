import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./Components/User Interface/Header";
import theme from "./Components/User Interface/Theme";
import { Route, Routes } from "react-router-dom";
// import UserType from "./Components/User Type/UserType";
import RegisterBusiness from "./Components/Register/RegisterBusiness";
import SignIn from "./Components/Log In/loginBusiness";

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {/* <UserType /> */}
      <Routes>
        <Route path='/' element={<div>Home</div>} />
        <Route path='/Register' element={<RegisterBusiness />} />
        <Route path='/Login' element={<SignIn />} />
        <Route path='/AboutUs' element={<div>About Us</div>} />
        <Route path='/ContactUs' element={<div>Contact us</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
