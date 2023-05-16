import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import AddModule from './components/Module_subject/AddModule';
import AllModules from './components/Module_subject/AllModules';
import AttempNotice from './components/Module_subject/attemp_nortice';

import './App.css';



export default function App() {

  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AddModule" element={<AddModule />} exact /> 
        <Route path="/AllModules" element={<AllModules />}  /> 
        <Route path="/AttempNotice" element={<AttempNotice />}  /> 
        

      </Routes>
    </BrowserRouter>
  )
};
