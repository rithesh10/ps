import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CiLogout } from "react-icons/ci";

import Modal from "react-modal";

import Contactmodal from "./Contactmodal"
import Counceller from "./Counceller";

const Sidebar = () => {

  const [contact_visible,setcontact_visible]=useState(false)
  const [counsellor_visible,setcounsellor_visible]=useState(false)


  return (
    <div className="Sidebar">
      <h1>Manas Health</h1>
      <h2>General</h2>
      <ul>
        <Link to="/dashboard"><li >Home</li></Link>
        <Link  to="/dashboard/calendar"><li>Calendar</li></Link>
        <li onClick={()=>setcounsellor_visible(true)}>Counsellor</li>
        <Modal
        isOpen={counsellor_visible}
        onRequestClose={() => setcounsellor_visible(false)}
        style={{
          content: {
            width: "fit-content",
            height: "fit-content",
            overflow: "hidden",
            top: "50%",
            left: "50%",
            transform:" translate(-50%, -50%)",
            padding: "0",
            margin:"0",
            backgroundColor:"none",
            borderRadius:"20px",
          },
        }}>
          <Counceller/>
        </Modal>
        <li>Education</li>
      </ul>
      <h2>Tools</h2>
      <ul>
        <li onClick={()=>setcontact_visible(!contact_visible)}>Contact us</li>
        <Modal
        isOpen={contact_visible}
        onRequestClose={() => setcontact_visible(false)}
        style={{
          content: {
            width: "fit-content",
            height: "fit-content",
            overflow: "hidden",
            top: "50%",
            left: "50%",
            transform:" translate(-50%, -50%)",
            padding: "0",
            margin:"0",
            backgroundColor:"none",
            borderRadius:"20px",
          },
        }}>
          <Contactmodal/>
        </Modal>
        <Link to="/"><li><CiLogout style={{fontSize:"17px",margin:"0px 5px -4px -3px"}}/>Logout</li></Link>
      </ul>
    </div>
  );
};

export default Sidebar;
