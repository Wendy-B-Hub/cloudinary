import React, { useState } from 'react';
import {
  Button,
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Container,
  Typography,
  Input
} from '@mui/material'
import {BASE_URL} from '../globals'

export default function Upload() {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleFileInputChange=(e)=>{
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  }
  
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    console.log(selectedFile)
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {  //Set the onloadend property of the FileReader object to a callback function that will be executed once the file has been fully loaded
        uploadImage(reader.result);  
    };
    reader.onerror = () => {
        setErrMsg('something went wrong!');
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)
    try {
      const url=`${BASE_URL}/api/upload`
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { 'Content-Type': 'application/json' },
        });
        setFileInputState('');
        setPreviewSource('');
        setSuccessMsg('Image uploaded successfully');
    } catch (err) {
        console.error(err);
        setErrMsg('Something went wrong!');
    }
};

  return(
    <Box>
       <CssBaseline/>
        <AppBar sx={{backgroundColor:'hotpink'}}>
          <Toolbar>
            <Typography variant='h5'>
            Upload an Image
            </Typography>
        </Toolbar>
      </AppBar>
      <Box>
      <Toolbar/>
      <Toolbar/>
      <Container>
        <form onSubmit={handleSubmitFile}>
          <Input
           type="file"
           id="fileInput"
            value={fileInputState}
            onChange={handleFileInputChange}
          />
          <Button type="submit" variant='contained'>Submit</Button>
        </form>
        {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
      </Container>
      </Box>
    </Box>
  )
}
