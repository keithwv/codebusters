import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./Components/User Interface/Header";
import theme from "./Components/User Interface/Theme";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Footer from "./Components/User Interface/Footer";

function App(props) {
  return (
    <ThemeProvider theme={theme}> 
        <Header />
        <Routes>
          <Route path='/' element={<div style={{height: "2000px"}}>Home</div>} />
          <Route path='/Register' element={<div>Register</div>} />
          <Route path='/Login' element={<div>Login</div>} />
          <Route path='/AboutUs' element={<div>About Us</div>} />
          <Route path='/ContactUs' element={<div>Contact us</div>} />
        </Routes>
        <Footer />
=======
// import UserType from "./Components/User Type/UserType";
import RegisterBusiness from "./Components/Register/RegisterBusiness";

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {/* <UserType /> */}
      <Routes>
        <Route path='/' element={<div>Home</div>} />
        <Route path='/Register' element={<RegisterBusiness />} />
        <Route path='/Login' element={<div>Login</div>} />
        <Route path='/AboutUs' element={<div>About Us</div>} />
        <Route path='/ContactUs' element={<div>Contact us</div>} />
      </Routes>
>>>>>>> 20e38f8a3d685062ca5b4eca5dc8b5073643c54a
    </ThemeProvider>
  );
}

export default App;
