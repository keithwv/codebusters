import * as React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useAuth } from "../../../contexts/AuthContext";
import SignIn from '../../log_in/loginBusiness';

export default function BusinessProfile() {

    const { currentUser } = useAuth()
    if (currentUser) {
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
                </Container>
            </>
        );
    }
    else {
        return (
            <>
                <Typography variant="h6" align="center" color="red"> You need to be logged in to view this page! </Typography>
                <SignIn />
            </>
        )
    }
}