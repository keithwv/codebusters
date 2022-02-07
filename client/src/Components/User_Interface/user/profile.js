import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { Button, Paper } from '@mui/material';
import { rootShouldForwardProp } from '@mui/material/styles/styled';
import BusinessTable from './BusinessTable';
import ServicesTable from './ServicesTable';


  

export default function Profile() {

    const { currentUser } = useAuth()
    console.log(currentUser)
    return (
    <React.Fragment>
        <Container maxWdith="sm">
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {`Hello ${currentUser.email}`}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    What would you like to do today?
                </Typography>
                <Grid item style={{marginLeft: "5em", marginTop: "1em" , width:'80%'}}>
                    <BusinessTable />
                </Grid>
                {/* <Grid item style={{marginLeft: "5em", marginTop: "5em" , width:'80%'}}>
                    <ServicesTable />
                </Grid> */}
        </Container>
    </React.Fragment>
        )
}