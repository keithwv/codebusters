import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";



// Schema for register form
const schema = yup.object().shape({
  service: yup.string().required("service is required"),
  cost: yup.string().required("cost is required"),
});

const theme = createTheme();

export default function AddService() {
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

//   const navigate = useNavigate();
  const { currentUser } = useAuth()

  const onSubmit = async (data) => {
    
    console.log(data, "submitted");
    console.log(currentUser)
    try {
        await addDoc(collection(db, 'services'), {
         service: data.service,
         hourly_Cost: data.cost,
         uid: currentUser.uid
       }) } catch(error) {
         console.log(error)
       }
       alert("success");

    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Services
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controller
                   name="service"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      autoComplete="given-name"
                      name="service"
                      required
                      fullWidth
                      id="service"
                      label="Service Provided"
                      autoFocus
                      error={!!errors.service}
                      helperText={errors.service?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="cost"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      ref={registerForBusiness}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      required
                      fullWidth
                      id="cost"
                      label="Hourly cost"
                      name="cost"
                      autoComplete="family-name"
                      error={!!errors.cost}
                      helperText={errors.cost?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!formState.isValid}
              sx={{ mt: 3, mb: 2 }}
            >
              Add Services
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

