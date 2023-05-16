import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import AddModule from './components/Module_subject/AddModule';
import AllModules from './components/Module_subject/AllModules';
import AttempNotice from './components/Module_subject/attemp_nortice';
import UpdateModule from './components/Module_subject/UpdateModule';
import StudentModule from './components/Student/Moduel_for_std';


import AddQuestion from './components/Quiz/add_question';
import ExamDashboard from './components/Quiz/dashboard';
import AttempQuestion from './components/Quiz/attemp_to_question';
import FinishAttemps from './components/Quiz/finish_attemp';

import Dashboard from './components/dashboard';

import './App.css';



export default function App() {

  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} exact /> 
        
        <Route path="/AddModule" element={<AddModule />} exact /> 
        <Route path="/AllModules" element={<AllModules />}  /> 
        <Route path="/AttempNotice" element={<AttempNotice />}  /> 
        <Route path="/UpdateModule" element={<UpdateModule />}  /> 
        <Route path="/StudentModule" element={<StudentModule />}  /> 
        

        <Route path="/AddQuestion" element={<AddQuestion />} exact /> 
        <Route path="/ExamDashboard" element={<ExamDashboard />} exact /> 
        <Route path="/AttempQuestion" element={<AttempQuestion />} exact /> 
        <Route path="/FinishAttemps" element={<FinishAttemps />} exact /> 
      </Routes>
    </BrowserRouter>
  )
};
