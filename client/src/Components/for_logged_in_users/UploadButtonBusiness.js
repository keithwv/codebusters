import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../Firebase/firebase-config";
import LinearProgress from "@mui/material/LinearProgress";
import { Button, IconButton, Input, Stack } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/styles";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";


export const UploadButtonBusiness = (props) => {
  const { store } = useAuth();

  const docId = props.docId;
  console.log(docId)
  //const Name = props.Name;
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();
  console.log(file);


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

    console.log(`path is: business_logo_pics/${docId}`);
    const imageRef = ref(store, `business_logo_pics/${docId}`);
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
  
    
          // console.log('is list of services',props.rows )
          // console.log("User image available at:", downloadURL);
          const docRef = doc(db, `business/${docId}`);
          updateDoc(docRef, { imageUrl: downloadURL });
          for (let item of props.rows) {
            const docRefService = doc(db, `services/${item.DOC_ID}`);
            // console.log("I AM DOC ID", docRefService)
            updateDoc(docRefService, { company_logo: downloadURL });
            }
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
        <Button
          variant="contained"
          component="span"
        >
          Upload
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          onChange={handleSelect}
          type="file"
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  );
};
