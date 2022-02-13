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
  title: yup.string().required("title is required"),
  //   service: yup.string().required("service is required"),
});

const theme = createTheme();

export default function AddEventForm(props) {
  const { selectedBusiness} = props
  // registerForBusiness,and formstate: { errors } are for yup validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  //   const navigate = useNavigate();
  const { currentUser } = useAuth();

  const onSubmit = async (e) => {
    //e.prevent.default()
    console.log(e)
    
    
    let calendarApi = props.data.data.view.calendar;
    calendarApi.unselect(); // clear date selection

    let title = e.title;
    if (title) {
      props.method() // close modal
      try {
        const docRef = await addDoc(collection(db, "events"), {
          title: title,
          start_time: props.data.data.startStr,
          end_time: props.data.data.endStr,
          Business_ID: selectedBusiness.DOC_ID,
          uid: currentUser.uid,
        });
       console.log("Event Submitted")
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    props.method() // close modal
  }

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
            Add Events
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
                  name="title"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      autoComplete="given-name"
                      name="title"
                      required
                      fullWidth
                      id="title"
                      label="title"
                      autoFocus
                      error={!!errors.title}
                      helperText={errors.title?.message}
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
              Add Event
            </Button>
            <Button
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
