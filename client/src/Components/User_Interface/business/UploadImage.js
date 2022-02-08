import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../Firebase/firebase-config'
import LinearProgress from '@mui/material/LinearProgress';
import './UploadImage.css'

const UploadImage = (props) => {
    const {store} = useAuth()
    console.log(store)
    console.log(props.docId)
    const docId = props.docId;
    const Name = props.Name
    const [file, setFile] = useState();
    const [progress, setProgress] = useState();

    const handleUpload = () => {
        if (!file) {
          alert('Please select a file');
          return;
        }
        console.log(`path is: user_pics/${docId}`);
        const imageRef = ref(store, `user_pics/${docId}`);
        console.log(`imageRef is `, imageRef);
        const uploadTask = uploadBytesResumable(imageRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);
            console.log('Upload is: ' + percentage + '% done');
            console.log('snapshot.state is: ' + snapshot.state);
          },
          (error) => {
            console.log('UPLOAD IMAGE ERROR!', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('User image available at:', downloadURL);
              const docRef = doc(db, `users/${docId}`);
              updateDoc(docRef, { imageUrl: downloadURL });
            });
          }
        );
      };
   console.log('help')
    return (
        <div className="input">
          <input
            type='file'
            onChange={(e) => {
              let selectedFile = e.target.files[0];
              setFile(selectedFile);
            }}
          />
          <button onClick={handleUpload}>UPLOAD IMAGE</button>
          {progress ? <div>progress: {progress}%</div> : <div />}
          {/* <LinearProgress variant='determinate' value={progress} /> */}
        </div>
      );
    };
export default UploadImage;