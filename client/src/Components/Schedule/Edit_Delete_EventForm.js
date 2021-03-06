import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import { InputLabel } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Schema for register form
const schema = yup.object().shape({
  title: yup.string().required("title is required"),
  //   service: yup.string().required("service is required"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const availability = [
  {
    status: "Booked",
    id: 1,
  },
  {
    status: "Available",
    id: 2,
  },
];

export default function EditDeleteEventForm(props) {
  const { removeEvents, method, services } = props;

  const [snackBarState, setSnackBarState] = useState({
    openSnackBar: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, openSnackBar } = snackBarState;

  // Open snackbar when update profile is clicked
  const handleClick = () => {
    console.log("handleClick invoked")
    setSnackBarState({ openSnackBar: true, vertical: 'top', horizontal:"right"});
  };
  //Close update profile snackbar

  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState,  openSnackBar: false });
  };
  // State for dialog box for delete events
  const [ open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(services);
  let selectedEventHourlyCost =
    removeEvents.data.event.extendedProps.hourly_cost;
  console.log(selectedEventHourlyCost);
  let selectedEventStartTime = removeEvents.data.event.startStr;
  let selectedEvent = removeEvents.data.event;
  let selectedEventTitle = removeEvents.data.event.title;
  let selectedEventBookingStatus = removeEvents.data.event.extendedProps.status;
  let selectedEventName = removeEvents.data.event.extendedProps.name;
  let selectedEventPhoneNumber = removeEvents.data.event.extendedProps.number;
  let selectedEventEmail = removeEvents.data.event.extendedProps.email;
  let selectedEventNotes = removeEvents.data.event.extendedProps.notes;

  console.log(removeEvents.data.event);
  console.log(selectedEventBookingStatus);
  // Need to add All Services as option to the services array in order for it to be an option in menuSelect
  let selectAll = [
    {
      service: "All Services",
      DOC_ID: 1,
    },
  ];
  // selectableServices contains all the services array plus service: "All" option
  let selectableServices = [...selectAll, ...services];

  const [eventData, setEventData] = useState([]);
  const [selectedServiceHourlyCost, setSelectedServiceHourlyCost] =
    React.useState(selectedEventHourlyCost);
  const [selectedService, setSelectedService] =
    React.useState(selectedEventTitle);
  const [booking, setBooking] = React.useState(selectedEventBookingStatus);
  const [extendedForm, setExtendedForm] = React.useState(true);
  const [name, setName] = React.useState(selectedEventName);
  const [phoneNumber, setPhoneNumber] = React.useState(
    selectedEventPhoneNumber
  );
  const [email, setEmail] = React.useState(selectedEventEmail);
  const [notes, setNotes] = React.useState(selectedEventNotes);

  console.log("you selected the following event", eventData);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedEventTitle,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("Getting documents");
    let collectionRef = collection(db, "events");
    let queryRef = query(
      collectionRef,
      where("uid", "==", currentUser.uid),
      where("start_time", "==", selectedEventStartTime)
    );
    console.log("Getting Documents 2");
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
        console.log("get documents");
        setEventData(EventsData[0]);
      }
    });
    return unsubscribe;
  }, [selectedEvent]);

  React.useEffect(() => {
    // Find the array of values associated with the Selected Service in the services prop
    const selectedServiceObject = services.find(
      ({ service }) => service == selectedService
    );
    console.log(selectedServiceObject);

    const HourlyCost = selectedServiceObject?.hourly_Cost;
    setSelectedServiceHourlyCost(HourlyCost);
  }, [selectedService]);

  console.log(selectedServiceHourlyCost);

  // Function takes a unique id as input in order to delete selected event. Unique id is retrieved using getselectedDoc function
  const deleteEvent = (id) => {
    const eventDoc = doc(db, "events", id);
    return deleteDoc(eventDoc);
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const eventDelete = () => {
 
      const id = eventData.DOC_ID;
      console.log(id);
      deleteEvent(id);
      selectedEvent.remove();
    method();
  };


  const updateHandler = async (e) => {
     handleClick()
    let color = "";
   
    // if booking is true i.e event is now booked change the color of event to red
    if (booking === "Booked") {
      color = "#ff0000";
    }
  
    const id = eventData.DOC_ID;
    const EventDoc = doc(db, "events", id);
    console.log(EventDoc);
    await updateDoc(EventDoc, {
      title: selectedService,
      status: booking,
      color: color,
      customer_name: name || null,
      customer_phone_number: phoneNumber || null,
      customer_email: email || null,
      notes: notes || null,
      hourly_Cost: selectedServiceHourlyCost || null,
    });
     method();
  };

  useEffect(() => {
    if (selectedEventBookingStatus === "Booked") {
      setExtendedForm(true);
    } else setExtendedForm(false);
  }, []);

  const handleAvailability = (event) => {
    setBooking(event.target.value);

    if (event.target.value === "Booked") {
      setExtendedForm(true);
    } else setExtendedForm(false);
  };

  const handleCancel = () => {
    method(); // close modal
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  return (
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
          <EventAvailableIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update/Delete Event
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnackBar}
          autoHideDuration={5000}
          onClose={handleSnackBarClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleSnackBarClose} severity="success">
            Event has been successfully updated!
          </Alert>
        </Snackbar>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Event?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By clicking Ok the selected event will be permanently deleted. This action cannot
              be undone
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={eventDelete} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container flex-direction="row" spacing={2}>
            <Grid item xs={6} sm={6}>
              <FormControl
                fullwidth="true"
                variant="standard"
                sx={{
                  width: 200,
                  height: 75,
                }}
              >
                <InputLabel id="title">Select a Service</InputLabel>
                <Controller
                  name="title"
                  defaultValue={selectedEventTitle}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      onChange={(e) => {
                        onChange(e);
                        setSelectedService(e.target.value);
                      }}
                      value={selectedService}
                      id="title"
                      defaultValue={selectedEventTitle}
                    >
                      {selectableServices.map((service) => {
                        return (
                          <MenuItem
                            key={service.DOC_ID}
                            value={service.service}
                          >
                            {service.service}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl
                fullwidth="true"
                variant="standard"
                sx={{
                  width: 200,
                  height: 75,
                }}
              >
                <InputLabel id="title">Select Availability</InputLabel>
                <Controller
                  name="title"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      onChange={handleAvailability}
                      value={availability.status}
                      id="title"
                      defaultValue={selectedEventBookingStatus}
                    >
                      <MenuItem value=""></MenuItem>
                      {availability.map((available) => {
                        return (
                          <MenuItem key={available.id} value={available.status}>
                            {available.status}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          {extendedForm && (
            <>
              <Grid container flex-direction="row" spacing={2}>
                <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
                  <Controller
                    name="Name"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        onChange={(e) => setName(e.target.value)}
                        value={value}
                        onBlur={onBlur}
                        defaultValue={selectedEventName}
                        autoComplete="given-name"
                        name="Name"
                        required
                        fullWidth="true"
                        id="Name"
                        label="Customer Name"
                        autoFocus
                        error={!!errors.Name}
                        helperText={errors.Name?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="Phone_Number"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={value}
                      onBlur={onBlur}
                      defaultValue={selectedEventPhoneNumber}
                      // autoComplete="given-name"
                      name="Phone_Number"
                      required
                      fullWidth="true"
                      id="Name"
                      label="Phone Number"
                      autoFocus
                      error={!!errors.Phone_Number}
                      helperText={errors.Phone_Number?.message}
                    />
                  )}
                />
              </Grid>
              <br></br>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="Email"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      onChange={(e) => setEmail(e.target.value)}
                      value={value}
                      onBlur={onBlur}
                      defaultValue={selectedEventEmail}
                      name="Email"
                      required
                      fullWidth="true"
                      id="Email"
                      label="Email"
                      autoFocus
                      error={!!errors.Email}
                      helperText={errors.Email?.message}
                    />
                  )}
                />
              </Grid>
              <br></br>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="Notes"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      onChange={(e) => setNotes(e.target.value)}
                      value={value}
                      onBlur={onBlur}
                      defaultValue={selectedEventNotes}
                      name="Notes"
                      multiline
                      fullWidth="true"
                      id="Notes"
                      label="Notes"
                      autoFocus
                      error={!!errors.Notes}
                      helperText={errors.Notes?.message}
                    />
                  )}
                />
              </Grid>
            </>
          )}
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={updateHandler}
          >
            Update
          </Button>
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            //disabled={!formState.isValid}
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClickOpen}
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
        </Box>
      </Box>
    </Container>
  );
}
