import React from 'react'
import{
  Button,
  Container
} from '@mui/material'
import {Routes, Route} from "react-router-dom";
import Upload from './pages/Upload';
import Home from './pages/Home';
import Dashborad from './pages/Dashboard';
export default function App(){
  return(
    <div>
      < Container>
      <Routes>
        <Route path='/' element={<Dashborad/>}/>
          <Route path="upload" element={<Upload />}/>
          <Route path="home" element={<Home/>}/>
      </Routes>
      </Container>
    </div>
  )
}