import React,{useEffect} from "react";
import { Routes, Route,useLocation } from "react-router-dom";

import "./App.css";
import "./Login-registration/Log_Reg.css"

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

const App = () => {

  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Bodys/>}/>
        <Route path="/student-login" element={<Login name="Student" />} />
        <Route path="/teacher-login" element={<Login name="Teacher" />} />
        <Route path="/student-signup" element={<Signup />} />

        <Route path="/dashboard/assessment" element={<Asnmt_page/>}/>
        <Route path="/dashboard" element={<Dashboad/>}/>
        <Route path="/dashboard/calendar" element={<GoogleCalendar/>}/>
        <Route path="/Pasword-reset" element={<Forgetpassword/>}/>
      </Routes>
    </div>
  );
};

export default App;
