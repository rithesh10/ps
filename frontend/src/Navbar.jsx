import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import Changepassword from "./Changepassword";
import Sidebar from "./Sidebar";
import Counceller from "./Counceller";
import Contactmodal from "./Contactmodal";

const Navbar = () => {
  const [det_visible, setdet_Visible] = useState(false);

  const [menu_visible, setmenu_Visible] = useState(false);

  var p;

  const [userdata, setuserdata] = useState({
    name: "",
    section: "",
    email: "",
    password: "",
    rollno: "",
    phoneno: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log("Token : ", accessToken);
        if (!accessToken) {
          setError("Access token not found"); // Handle missing token
          return;
        }
        const response = await axios.get(
          "http://localhost:2000/api/users/student-profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response && response.data) {
          p = response.data;
          setuserdata({
            name: response.data.name,
            rollno: response.data.rollno,
            phoneno: response.data.phoneno,
            section: response.data.section,
            email: response.data.email,
            password: response.data.password,
          });
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        setError(
          error.message || "An error occurred while fetching user data."
        );
      }
    };

    fetchData();
  }, []);

  const [visiblecode, setVisiblecode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const openChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    setdet_Visible(false);
  };

  const openmenu = () => {
    setmenu_Visible(!menu_visible);
  };

  const [contact_visible, setcontact_visible] = useState(false);
  const [counsellor_visible, setcounsellor_visible] = useState(false);

  return (
    // Navbar
    <nav className="Navbar">
      <div className="left-menu">
        <li onClick={openmenu}>
          <GiHamburgerMenu style={{ fontSize: "30px" }} />
        </li>
        <div className="Nav-left">
          <h1>
            <Link to="/dashboard">Dashboard</Link>
          </h1>
          <p>Here's the information about your activity and mental condition</p>
        </div>
      </div>

      {/* Menu Modal */}

      <Modal //// MENU ////
        isOpen={menu_visible}
        onRequestClose={() => setmenu_Visible(false)}
        style={{
          content: {
            width: "fit-content",
            height: "fit-content",
            overflow: "hidden",
            top: "0%",
            left: "0%",
            padding: "0px",
          },
        }}
      >
        <div className="modal-side">
          <h1>Manas Health</h1>
          <h2>General</h2>
          <ul>
            <Link to="/dashboard">
              <li>Home</li>
            </Link>
            <Link to="/dashboard/calendar">
              <li>Calendar</li>
            </Link>
            <li onClick={() => setcounsellor_visible(true)}>Counsellor</li>
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
                  transform: " translate(-50%, -50%)",
                  padding: "0",
                  margin: "0",
                  backgroundColor: "none",
                  borderRadius: "20px",
                },
              }}
            >
              <Counceller />
            </Modal>
            <li>Education</li>
          </ul>
          <h2>Tools</h2>
          <ul>
            <li onClick={() => setcontact_visible(!contact_visible)}>
              Contact us
            </li>
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
                  transform: " translate(-50%, -50%)",
                  padding: "0",
                  margin: "0",
                  backgroundColor: "none",
                  borderRadius: "20px",
                },
              }}
            >
              <Contactmodal />
            </Modal>
            <li>
              <Link to="/">
                <CiLogout
                  style={{ fontSize: "17px", margin: "0px 5px -4px -3px" }}
                />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </Modal>

      {/* Student Details */}

      <div className="Nav-right">
        <h3 onClick={() => setdet_Visible(true)} style={{ cursor: "pointer" }}>
          {userdata.name}
        </h3>
        <div className="stu-img" onClick={() => setdet_Visible(true)}></div>
      </div>
      <Modal
        isOpen={det_visible}
        onRequestClose={() => setdet_Visible(false)}
        style={{
          content: {
            backgroundColor: "#eaf2f8",
            width: "30vw",
            height: "25vh",
            overflow: "hidden",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            border: "none",
          },
        }}
      >
        {

          <div className="stu-details">
            
            Name : {userdata.name}
            <br />
            Rollno : {userdata.rollno}
            <br />
            <button className="change-password" onClick={openChangePassword}>
              change password
              <IoIosArrowForward
                style={{ fontSize: "17px", margin: "0px -7px -4px 10px" }}
              />
            </button>
          </div>
        }
      </Modal>

      {/* Change Password */}

      <Modal
        isOpen={showChangePassword}
        // onRequestClose={() => setShowChangePassword(false)}
        style={{
          content: {
            backgroundColor: "none",
            // width: "fit-content",
            height: "fit-content",
            padding: "0",
            overflow: "hidden",
            top: "10%",
            left: "",
            borderRadius: "20px",
            // border: "1px solid black",
          },
        }}
      >
        <div className="modal-changepass">
          <Changepassword
            isVisible={showChangePassword}
            closemodal={openChangePassword}
            roll={userdata.rollno}
          />
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
