import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../Firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";




const steps = ["Contact Information", "Payment details", "Review your order"];

export default function BookEventForm(props) {
 
  

  const { bookEvents, method, user } = props;

  let statusOfEvent = bookEvents.data.event.extendedProps.status
  let serviceHourlyCost = bookEvents.data.event.extendedProps.hourly_cost
  console.log("cost",serviceHourlyCost)
  let selectedService = bookEvents.data.event.title
  let eventStartTime =bookEvents.data.event.start
  let eventEndTime = bookEvents.data.event.end 
  // substraction below will give the time in milliseconds. Dividing by 3,600,000 (the amount of ms in an hour) will give duration in hours
  let duration = (eventEndTime.getTime()-eventStartTime.getTime())/3600000
  let total_cost = duration*serviceHourlyCost
  console.log(total_cost) 
  


  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    email: user.email,
    firstName: user.name,
    lastName: user.last_name,
    phoneNumber: "",
    city: "",
    province: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    duration: duration,
    service: selectedService,
    status: statusOfEvent,
    hourly_cost: serviceHourlyCost,
    total_cost: total_cost
  });
 

  const validationSchema = [
  //validation for first step
  yup.object().shape({
        firstName : yup.string().required("Name is required"),
        lastName: yup .string().required("Last name is required"),
        email: yup.string().email().required("valid email is required"),
        phone_number: yup.number().required("Phone Number is required"),
        city: yup.string().required("City is required"),
        province: yup.string().required("Province is required"),
  }),
  //Validation for second step
  yup.object().shape({ 
    cardName : yup.string().required("Name is required"),
    cardNumber: yup.number().required("Card Number is required"),
    expDate: yup.number().required("expiry date is required"),
    cvv: yup.number().required("CVV is required")
  })
];
  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(currentValidationSchema),
    mode: "all",
  });

  const { handleSubmit, reset, trigger} = methods
  


  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            user={user}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return <PaymentForm formData={formData} setFormData={setFormData} />;
      case 2:
        return <Review formData={formData} setFormData={setFormData} />;
      default:
        throw new Error("Unknown step");
    }
  }



  const handleNext = async () => {
    
    let isStepValid = await trigger(["firstName", "lastName","email","phone_number","city", "province", "cardName", "cardNumber", "expDate", "cvv"])
    console.log("is trigggered");
    console.log(isStepValid)

    if (isStepValid) {
      setActiveStep(activeStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleOrder = () => {
    console.log('success')
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update the day before your
              appointment.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
              <FormProvider {...methods}>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={e => activeStep === steps.length - 1 ? handleOrder(e) : handleNext(e)}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
            
          </FormProvider>
          </React.Fragment>
         
        )}
      </React.Fragment>
    </Container>
  );
}
