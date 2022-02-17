import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import { useForm, Controller, set } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import { date } from "yup";
import SelectInput from "@mui/material/Select/SelectInput";
import { async } from "@firebase/util";

// Schema for register form
const schema = yup.object().shape({
  title: yup.string().required("title is required"),
  //   service: yup.string().required("service is required"),
});

const theme = createTheme();

export default function EditDeleteEventForm(props) {
  const { removeEvents, method} = props

  const [disabled, setDisabled] = useState(true);
  const [eventTitle, setEventTitle] = useState(removeEvents.data.event.title);
  const [eventData, setEventData] = useState([]);
  console.log("you selected the following event", eventData)
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

  useEffect(() => {
    console.log("Getting documents")
    let collectionRef = collection(db, "events");
    let queryRef = query(
      collectionRef,
      where("uid", "==", currentUser.uid),
      where("start_time", "==", removeEvents.data.event.startStr)
    );
    console.log("Getting Documents 2")
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let EventsData = querySnap.docs.map((doc) => {
          return {
            ...doc.data(),
            DOC_ID: doc.id,
          };
        });
        console.log("get documents")
        setEventData(EventsData[0]);
      }
    });
    return unsubscribe;
  }, [removeEvents.data.event]);


 

  // Function takes a unique id as input in order to delete selected event. Unique id is retrieved using getselectedDoc function
  const deleteEvent = (id) => {
    const eventDoc = doc(db, "events", id);
    return deleteDoc(eventDoc);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const eventDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${removeEvents.data.event.title}'`
      )
    ) {
      const id = eventData.DOC_ID;
      console.log(id)
      deleteEvent(id);
      removeEvents.data.event.remove();
    }
    method();
  };

  const updateHandler = async (e) => {
      console.log(eventTitle)
      console.log(removeEvents.data)
      const id = eventData.DOC_ID
      const EventDoc = doc(db, "events", id);
      console.log(EventDoc)
      await updateDoc(EventDoc ,{
      title: eventTitle
   })
   method();

    }

  const handleCancel = () => {
    method(); // close modal
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
                  render={({ field: { onBlur, value } }) => (
                    <TextField
                      onChange={(e) => setEventTitle(e.target.value)}
                      value={eventTitle}
                      onBlur={onBlur}
                      //autoComplete="given-name"
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
              {/* <Grid item xs={12} sm={12}>
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
              </Grid> */}
            </Grid>
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              //disabled={!formState.isValid}
              sx={{ mt: 3, mb: 2 }}
              onClick={eventDelete}
            >
              Delete
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
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={updateHandler}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
