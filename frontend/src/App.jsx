import React, { useEffect } from "react";
import { Routes, Route, useLocation, Router } from "react-router-dom";

import "./App.css";
import "./Login-registration/Log_Reg.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Results_graph from "./Results_graph";
import Activity from "./Activity";
import Dashboad from "./Dashboad";
import GoogleCalendar from "./GoogleCalendar";
import Nav from "./Login-registration/Nav.jsx";
import Bodys from "./Login-registration/Bodys.jsx";
import Login from "./Login-registration/Login.jsx";
import Buttons from "./Login-registration/Buttons.jsx";
import Signup from "./Login-registration/Signup.jsx";
import Asnmt_page from "./Asnmt_page.jsx";
import Forgetpassword from "./Forgetpassword.jsx";
import Box from "./Box.jsx"
import Results from "./Results.jsx";
import ResultsHistory from "./ResultsHistory.jsx";
import Tchr_dashboard from "./Tchr_dashboard.jsx"
import Edit_profile from "./Edit_profile.jsx";
import Working from "./Working.jsx";
import Meditation from "./Meditation.jsx";
import Yoga from "./Yoga.jsx";
import Password_reset from "./Password_reset.jsx";
import Aboutus from "./Aboutus.jsx";
// >>>>>>> a460dddd2cab92b0f8ebc97891bd60d74707316f


const App = () => {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Bodys />} />
        <Route path="/student-login" element={<Login name="Student" />} />
        <Route path="/teacher-login" element={<Login name="Teacher" />} />
        <Route path="/student-signup" element={<Signup />} />

        <Route path="/dashboard/assessment" element={<Asnmt_page />} />
        <Route path="/dashboard" element={<Dashboad />} />
        <Route path="/dashboard/calendar" element={<GoogleCalendar />} />
        <Route path="/Pasword-reset" element={<Forgetpassword />} />
        <Route path="/dashboard/meditation" element={<Meditation/>} />
        <Route path="/dashboard/yoga" element={<Yoga/>} />

        <Route path="/Password-reset" element={<Forgetpassword />} />
        <Route path="/reset-password/:id/:token" element={<Password_reset/>} />
        <Route path="/dashboard/assessment/result" element={<Results/>} />
        <Route path="/dashboard/result-history" element={<ResultsHistory/>} />
        <Route path="/tchr_dashboard" element={<Tchr_dashboard/>}/>
        <Route path="/dashboard/profile" element={<Edit_profile/>} />
        <Route path="/working" element={<Working/>} /> 
        <Route path="/aboutus" element={<Aboutus/>} /> 
        
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;
