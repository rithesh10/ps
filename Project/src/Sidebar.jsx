import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CiLogout } from "react-icons/ci";
import Contactmodal from "./Contactmodal";

import Modal from "react-modal";


const Sidebar = () => {
  const [contactstate,setContactstate]=useState(false);
  const contact=()=>{
    setContactstate(!contactstate);
  }
  return (
    <div className="Sidebar">
      <h1>Manas Health</h1>
      <h2>General</h2>
      <ul>
        <Link to="/dashboard"><li >Home</li></Link>
        <Link  to="/dashboard/calendar"><li>Calendar</li></Link>
        <li>Counsellor</li>
        <li>Education</li>
      </ul>
      <h2>Tools</h2>
      <ul>
        <li><button className="contact" onClick={contact}>Contact us</button></li>
        <Link to="/"><li><CiLogout style={{fontSize:"17px",margin:"0px 5px -4px -3px"}}/>Logout</li></Link>
      </ul>
      <Modal 
       isOpen={contactstate}
       onRequestClose={() => setContactstate(false)}
       style={{
         content: {
           backgroundColor: "none",
           width: "fit-content",
           height: "fit-content",

           padding: "0",
           overflow: "hidden",
           top: "10%",
           left: "20%",
           borderRadius: "20px",
           // border: "1px solid black",
         },
       }}>
        <div className="Contactmodal">
          <Contactmodal/>
        </div>
        
      </Modal>
    </div>
    
  );
};

export default Sidebar;
