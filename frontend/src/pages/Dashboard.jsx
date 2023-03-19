import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {
  Button,
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Container,
  Typography,
  Stack
} from '@mui/material'
export default function Dashborad() {
  const navigate = useNavigate();

  const goGallery=()=>{
    navigate('/home')
  }

  const goUpload=()=>{
    navigate('/upload')
  }

  return(
    <Box>
       <CssBaseline/>
        <AppBar sx={{backgroundColor:'hotpink'}}>
          <Toolbar>
            <Typography variant='h5'>
              Dashboard
            </Typography>
        </Toolbar>
      </AppBar>
      <Box>
      <Toolbar/>
      <Toolbar/>
      <Container>
        <Stack spacing={4}>
          <Button variant='contained' onClick={goGallery} style={{textTransform: 'none',maxWidth: '200px'}}>
            cloudinary gallery
          </Button>
          <Button variant='contained' color='success' onClick={goUpload} style={{textTransform: 'none',maxWidth: '200px'}}>
            upload image
          </Button>
        </Stack>
      </Container>
      </Box>
    </Box>
  )
}
