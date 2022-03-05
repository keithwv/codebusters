import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../Firebase/firebase-config";
import { useAuth } from "../../../contexts/AuthContext";
import { Avatar } from "@mui/material";
import { UploadButtonUsers } from "../../for_logged_in_users/UploadButtonUsers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, set } from "react-hook-form";
import * as yup from "yup";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';

// Schema for register form
const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email().required("valid email is required"),
});

const UserProfile = () => {
  const [users, setUsers] = useState({
    name: "",
    last_name: "",
    email: "",
    imageUrl: "",
    DOC_ID: "",
  });
 console.log(users.name)
 

  const {
    handleSubmit,
    control,
    reset,
    
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues : {
      name: users.name,
      last_name: users.last_name,
      email: users.email
    },
  });

  const onSubmit = (event) => {
    // event.preventDefault()
    console.log("clicked")
    // console.log(data);
    reset();
  };

  const { currentUser } = useAuth();
  // Get the user information of the users database for current logged in user
  useEffect(() => {
    if (currentUser?.uid) {
      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setUsers({
            name: usersData[0].name,
            last_name: usersData[0].last_name,
            email: usersData[0].email,
            imageUrl: usersData[0].imageUrl,
            DOC_ID: usersData[0].DOC_ID,
          });
        }
      });
      return unsubscribe;
    }
  }, [currentUser?.uid]);

  const handleUpdate = async () => {
    const id = users.DOC_ID;
    const usersDoc = doc(db, "users", id);
    try {
      await updateDoc(usersDoc, {
        name: users.name,
        last_name: users.last_name,
        email: users.email,
      });
      alert("User profile has been updated");
    } catch (err) {
      console.log(err.message);
    }
    reset();
  };

  return (
    <>
      <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate>
        <Typography color="blue" variant="h6" align="center">
          {`Welcome ${users?.name} ${users?.last_name}`}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item xs="auto">
            <Avatar
              alt=""
              src={users?.imageUrl}
              sx={{
                mt: "2rem",
                width: 250,
                height: 250,
              }}
            />
          </Grid>
          <Grid item xs="auto">
            <Stack spacing={1}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={(e) => {
                      onChange(e)
                      setUsers({
                        name: e.target.value,
                        last_name: users.last_name,
                        email: users.email,
                        imageUrl: users.imageUrl,
                        DOC_ID: users.DOC_ID,
                      })
                    }}
                    value={users.name}
                    autoComplete="given-name"
                    name="name"
                    label="first name"
                    id="name"
                    variant="standard"
                    autoFocus
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="last_name"
                defaultValue=""
                control={control}
                render={({ field: { onChange , onBlur, value } }) => (
                  <TextField
                    onChange={(e) => {
                      onChange(e)
                      setUsers({
                        name: users.name,
                        last_name: e.target.value,
                        email: users.email,
                        imageUrl: users.imageUrl,
                        DOC_ID: users.DOC_ID,
                      })
                    }}
                    value={users.last_name}
                    label="last name"
                    id="last_name"
                    variant="standard"
                    autoFocus
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: {onChange, onBlur, value } }) => (
                  <TextField
                    onChange={(e) => {
                      onChange(e)
                      setUsers({
                        name: users.name,
                        last_name: users.last_name,
                        email: e.target.value,
                        imageUrl: users.imageUrl,
                        DOC_ID: users.DOC_ID,
                      })
                    }}
                    
                    value={users.email}
                    label="email"
                    id="email"
                    variant="standard"
                    autoFocus
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={15}
        >
          <Grid item xs="auto" mt="1.5rem">
            <UploadButtonUsers docId={users?.DOC_ID} Name={users?.name}/>
          </Grid>
          <Grid item xs="auto" mt="1.5rem">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleUpdate}
            >
              Update Profile
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={10}
          >
          </Grid>
        </Grid>
      {/* </Box> */}
    </>
  );
};

export default UserProfile;
