import * as React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useAuth } from "../../../contexts/AuthContext";
import Grid from "@mui/material/Grid";
import BusinessTable from './BusinessTable';

export default function Profile() {

    const { currentUser } = useAuth()
    console.log(currentUser)
    return (
    <React.Fragment>
        <Container>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {`Hello, ${currentUser.email}`}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    What would you like to do today?
                </Typography>
                <Grid item style={{marginLeft: "5em", marginTop: "1em" , width:'80%'}}>
                    <BusinessTable />
                </Grid>
        </Container>
    </React.Fragment>
        )
}