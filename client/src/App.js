import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./Components/User Interface/Header";
import theme from "./Components/User Interface/Theme";
import { Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path='/' element={<div>Home</div>} />
          <Route path='/Register' element={<div>Register</div>} />
          <Route path='/Login' element={<div>Login</div>} />
          <Route path='/AboutUs' element={<div>About Us</div>} />
          <Route path='/ContactUs' element={<div>Contact us</div>} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
