import React from 'react';
import {BrowserRouter as Router,Routes,Route,BrowserRouter} from "react-router-dom";
import HomePage from "./My Components/HomePage"
import Navigation from './My Components/Navigation'
import EmployerDashboard from './My Components/EmployerDashboard'
import CandidateDashboard from './My Components/CandidateDashboard'
import JobState from './context/joblisted/JobState';
import Alert from './My Components/Alert';

function App() {
  return (
    <>
      <BrowserRouter>
      <JobState>
      <Navigation/>
      <Alert message="Career Hub - Job portal"/>
        <div className="container my-3">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/employerdasboard" element={<EmployerDashboard/>} />
          <Route path="/candidatedashboard" element={<CandidateDashboard/>} />

          {/* <Route path="/signup" element={<Signup showAlert={showAlert} alertText={alertText}/>} /> */}
          {/* <Route path="/login" element={<Login showAlert={showAlert} alertText={alertText}/>} /> */}
        </Routes>
        </div>
        </JobState>
      </BrowserRouter>
     
    </>
  );
}

export default App;
