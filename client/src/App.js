import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./Components/User_Interface/Header";
import Footer from "./Components/User_Interface/Footer";
import theme from "./Components/User_Interface/Theme";
import { Route, Routes } from "react-router-dom";
import RegisterBusiness from "./Components/Register/RegisterBusiness";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./Components/log_in/loginBusiness";
import AddressForm from "./Components/for_logged_in_users/Business fill in form";
import { ServicesForBusiness } from "./Pages/business_services_profile";
import BasicModal from "./Components/Modals/Modal";
import CalendarWithSchedule from "./Components/Schedule/calendarPage";
import RegisterClient from "./Components/Register/RegisterClient";
import ServiceList from "./Components/for_logged_in_users/serviceList";
//import BusinessDashboard from "./Components/User_Interface/business/business_dashboard";
import BusinessLandingPage from "./Pages/BusinessLandingPage";
import Profile from "./Components/User_Interface/user/profile";
import UserProfile from "./Pages/UsersProfile";
import HomePage from "./Pages/home_page";
import ProtectedRoute from "./Components/ProtectedRoute";
import ListOfBusinessesInCategory from "./Pages/list_of_businesses_categories";




function App(props) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/Register" element={<RegisterBusiness />} />
          <Route path="/Login" element={<SignIn />} />
          <Route path="/add-services" element={<ServiceList />} />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <ServicesForBusiness />
              </ProtectedRoute>
            }
          />
          <Route path="/modal" element={<BasicModal />} />
          <Route path="/login-business/fill-form" element={<AddressForm />} />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarWithSchedule />
              </ProtectedRoute>
            }
          />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/business-profile" element={<Profile />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <BusinessLandingPage />
              </ProtectedRoute>
              
            }
          />
          <Route path='/business-category-list' element={<ListOfBusinessesInCategory />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
