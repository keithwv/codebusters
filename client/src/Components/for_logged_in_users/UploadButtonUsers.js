import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../Firebase/firebase-config";
import LinearProgress from "@mui/material/LinearProgress";
import { Button, IconButton, Input, Stack, Tooltip } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/styles";
import LinearProgressWithLabel from '../../Components/User_Interface/business/LinearProgressIndicator'
import CircularProgress from '@mui/material/CircularProgress';

export const UploadButtonUsers = (props) => {
  const { store } = useAuth();

  const docId = props.docId;
  //const Name = props.Name;
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();



  const handleSelect = (e) => {
    let selectedFile = e.target.files[0];
    console.log("Selected file")
    setFile(selectedFile);
  }
  useEffect(() => {
    if (!file) {
      //alert("Please select a file");
      return;
    }

    console.log(`path is: user_pics/${docId}`);
    const imageRef = ref(store, `user_pics/${docId}`);
    console.log(`imageRef is `, imageRef);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
        console.log("Upload is: " + percentage + "% done");
        console.log("snapshot.state is: " + snapshot.state);
      },
      (error) => {
        console.log("UPLOAD IMAGE ERROR!", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("User image available at:", downloadURL);
          const docRef = doc(db, `users/${docId}`);
          updateDoc(docRef, { imageUrl: downloadURL });
        });
      }
    );
  }, [file])

    const Input = styled("input")({
      display: "none",
    });

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleSelect}
          />
        <Tooltip title="Upload profile photo">
        <Button
          variant="contained"
          component="span"
        >
          Upload
        </Button>
        </Tooltip>
        {progress<100 && <CircularProgress />}
      </label>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          onChange={handleSelect}
          type="file"
        />
        <Tooltip title="Upload profile photo">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
        </Tooltip>
      </label>
    </Stack>
  );
};
