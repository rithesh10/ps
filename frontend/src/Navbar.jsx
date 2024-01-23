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
import Edit_profile from "./Edit_profile";

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

  const [profile_visible, setprofile_visible] = useState(false);

  const openprofile_edit = () => {
    setprofile_visible(!profile_visible);
    setdet_Visible(false);
  };

  return (
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
          <Sidebar visible={menu_visible}/>
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

            width: "0",
            height: "0",

            overflow: "hidden",
            top: "10%",
            left: "-1%",
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
            <button className="change-password" onClick={openprofile_edit}>
              Edit profile
            </button>
            <button className="change-password" onClick={openChangePassword}>
              change password
              <IoIosArrowForward className="arrow"
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


      {/* Edit_profile */}

      <Modal
        isOpen={profile_visible}
        style={{
          content: {
            backgroundColor: "none",
            width: "fit-content",
            height: "fit-content",
            padding: "0",
            overflow: "hidden",
            top: "10%",
            left: "",
            borderRadius: "20px",
          },
        }}
      >
        <Edit_profile
          isVisible={profile_visible}
          close_profile={openprofile_edit}
          roll={userdata.rollno}
          profile={userdata}
        />
      </Modal>
    </nav>
  );
};

export default Navbar;
