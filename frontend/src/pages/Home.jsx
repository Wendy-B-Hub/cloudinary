import React,{useEffect, useState} from "react";
import {Image} from 'cloudinary-react'
import {
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Container,
  Typography,
  Grid
} from '@mui/material'
import {BASE_URL,REACT_APP_CLOUDINARY_NAME} from '../globals'

export default function Home(){
  
  const [imageIds,setImageIds]=useState();

  const loadImages=async()=>{
    try{
      const url=`${BASE_URL}/api/images`
      const res=await fetch(url);
      const data=await res.json();
      setImageIds(data);
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    loadImages();
  },[])

  return(
    <Box>
      <CssBaseline/>
      <AppBar sx={{backgroundColor:'hotpink'}}>
        <Toolbar>
          <Typography variant="h5">
              Cloudinary Gallery
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Container>
        <Grid container spacing={3}>
          {imageIds &&
        imageIds.map((imageId,index)=>(
            <Grid item key={index}>
              <Image
                cloudName={REACT_APP_CLOUDINARY_NAME}
                publicId={imageId}
                width="300"
                crop="scale"
            />
              </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
