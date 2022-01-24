import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from '../../contexts/AuthContext';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Schema for register form
const schema = yup.object().shape({

  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(24).required(),
  password2: yup.string().oneOf([yup.ref("password"),null],"passwords must match"),

})

const theme = createTheme();

export default function RegisterBusiness() {

  // registerForBusiness,and formstate: { errors } are for yup validation
  const { handleSubmit, control, reset, registerForBusiness, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const { register } = useAuth()


  const onSubmit = (data) => {
    register(data.email, data.password)
    console.log(data, "submitted");
    console.log(errors)
   
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
            Register your Business
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
                      // ref={registerBusiness}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  )}
                />

                <p> {errors.firstName?.message} </p>

              </Grid>
              {/* < p > {errors.firstName?.message} </p > */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
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
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  )}
                />

                <p> {errors.lastName?.message} </p>

              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
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
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  )}
                />

                <p> {errors.email?.message} </p>

              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
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
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  )}
                />

                <p> {errors.password?.message} </p>

              </Grid>
              <Grid item xs={12}>
                <Controller
                  ref={registerForBusiness}
                  name="password2"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      required
                      fullWidth
                      name="password2"
                      label="Confirm Your Password"
                      type="password"
                      id="password2"
                      autoComplete="password2"
                    />
                  )}
                />

                <p> {errors.password2?.message} </p>

              </Grid>

              <Grid id="select-business" item xs={12}>
                Select Business Category
                <FormControl xs={12} fullWidth>
                  <Controller
                    name="select-business"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Select
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        labelId="select-business"
                        id="drop-down-menu"
                        label="select-business"
                      >
                        <MenuItem value="General">General</MenuItem>
                        <MenuItem value="Car Repairs">Car Repairs</MenuItem>
                        <MenuItem value="Cleaning Services">Cleaning Services</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              href="/Login-Business/Fill-form" 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}