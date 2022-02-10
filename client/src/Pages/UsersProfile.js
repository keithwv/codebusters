import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Container, Grid, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { Avatar } from "@mui/material";
import { UploadButton } from "../Components/for_logged_in_users/UploadButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, set } from "react-hook-form";
import * as yup from "yup";
import { doc, updateDoc } from "firebase/firestore";

// Schema for register form
const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email().required("valid email is required"),
});

// onst useStyles = makeStyles((theme) => ({
//   avatar: {},
// }));c

const User_Profile = () => {
//   const classes = useStyles();
// //   const theme = useTheme({
// //     spacing: 2,
// //   });

  const [users, setUsers] = useState({
    name: "",
    last_name: "",
    email: "",
    imageUrl: "",
    DOC_ID: "",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset()
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
      const id = users.DOC_ID
      const usersDoc = doc(db,"users", id)
      try {
      await updateDoc(usersDoc, {
        name: users.name,
        last_name: users.last_name,
        email: users.email
      })
      alert('User profile has been updated')
    } catch(err) {
      console.log(err.message)
    }
    reset()
  }

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      color="#fff"
      spacing={2}
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item>
        <Typography color="blue" variant="h6" align="center">
          {`Welcome ${users?.name} ${users?.last_name}`}
        </Typography>
      </Grid>
      <Grid item>
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
      <Typography color="blue" variant="h7" align="center" mt="1rem">
        Upload image for Avatar or Overwrite Existing Avatar Below
      </Typography>
      <Grid item mt="1rem">
        <UploadButton docId={users?.DOC_ID} Name={users?.name} />
      </Grid>
      <Grid item mt="1rem">
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field: {onBlur, value } }) => (
            <TextField
              onChange={(e) =>
                setUsers({
                  name: e.target.value,
                  last_name: users.last_name,
                  email: users.email,
                  imageUrl: users.imageUrl,
                  DOC_ID: users.DOC_ID,
                })
              }
              value={users.name}
              onBlur={onBlur}
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
      </Grid>
      <Grid item mt="1rem">
        <TextField
          onChange={(e) =>
            setUsers({
              name: users.name,
              last_name: e.target.value,
              email: users.email,
              imageUrl: users.imageUrl,
              DOC_ID: users.DOC_ID,
            })
          }
          value={users.last_name}
          label="last name"
          id="last_name"
          variant="standard"
          autoFocus
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
        />
      </Grid>
      <Grid item mt="1rem">
        <TextField
          onChange={(e) =>
            setUsers({
              name: users.name,
              last_name: users.last_name,
              email: e.target.value,
              imageUrl: users.imageUrl,
              DOC_ID: users.DOC_ID,
            })
          }
          value={users.email}
          label="email"
          id="email"
          variant="standard"
          autoFocus
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Grid>
      <Grid item mt="1rem">
        <Button type="submit" color="primary" variant="contained"
        onClick={handleUpdate}>
          Edit Profile
        </Button>
      </Grid>
    </Box>
  );
};

export default User_Profile;
