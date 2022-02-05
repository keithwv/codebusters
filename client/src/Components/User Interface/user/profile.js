import * as React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useAuth } from "../../../contexts/AuthContext";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from '../../../Firebase/firebase-config';
import {
    collection,
    // getDocs,
    // getDoc,
    // addDoc,
    updateDoc,
    // deleteDoc,
    doc,
} from "firebase/firestore";
import { Button } from '@mui/material';
// import SignIn from '../../log_in/loginBusiness';
// import { useNavigate } from "react-router-dom";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import Link from "@mui/material/Link";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    // lastName: yup.string().required("Last name is required"),
    // email: yup.string().email().required("Email is required"),
    // password: yup.string().min(6).max(24).required("Password is required"),
    // password2: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});


export default function Profile() {

    // registerForBusiness,and formstate: { errors } are for yup validation
    const {
        handleSubmit,
        control,
        reset,
        registerForBusiness,
        formState: { errors },
        formState,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    // const navigate = useNavigate();
    // const { register } = useAuth();
    const { currentUser } = useAuth()

    const onSubmit = async (data) => {
        // navigate('/dashboard');
        console.log(data);
        
        try {
          await updateDoc(collection(db, 'users'), {
           name: data.firstName,
        //    last_name: data.lastName,
        //    company_name: data.company_name,
        //    address1: data.address1,
        //    address2: data.address2,
        //    city: data.city,
        //    province: data.province,
        //    postal_code: data.postal_code,
        //    country: data.country,
           uid: currentUser.uid
         }) } catch(error) {
           console.log(error)
         }
    
        alert("success");
        reset();
      };

    // if (currentUser) {
    return (
        <>
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {`Hello ${currentUser.email}`}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    What would you like to do today?
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid item xs={12} sm={6}>
                        <Controller
                            ref={registerForBusiness}
                            name="firstName"
                            defaultValue=""
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mx: "auto", mt: 3, mb: 5 }}
                        disabled={!formState.isValid}
                    >
                        Submit Form
                    </Button>
                </Box>
            </Container>
        </>
    );
    // }
    // else {
    //     return (
    //         <>
    //             <Typography variant="h6" align="center" color="red"> You need to be logged in to view this page! </Typography>
    //             <SignIn />
    //         </>
    //     )
    // }
}