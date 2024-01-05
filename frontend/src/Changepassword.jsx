import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import Forgetpassword from "./Forgetpassword";
import axios from "axios";

import { IoClose } from "react-icons/io5";

const Changepassword = ({ isVisible, closemodal, roll }) => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    rollno: roll,
    password: "",
    newpassword: "",
    confirmpassword: "",
  });
  

  // const [confirmNewpass, setconfirmNewpass] = useState("");

  const [err, seterr] = useState("");

  const click = async (e) => {
    e.preventDefault();

    if (data.newpassword === data.confirmpassword) {
      seterr("");
      try {
        const response = await axios.post(
          "http://localhost:2000/api/users/student-passwordChange",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("Password changed successfully!");
        console.log("Password changed successfully!");

        setData({
          rollno: "",
          password: "",
          newpassword: "",
          confirmpassword: "",
        });

        navigate("/student-login")
        alert("Please login again after changing the password.")

        // console.log(response.data)

      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log("password error = ",error.response.data.error);
          seterr(error.response.data.error);
        }
        else {
          alert("Failed to submit the form. Please try again.");
        }
      }
    } else {
      seterr("*New password did not match");
    }
  };

  return (
    <>
      <div
        className="CP-body "
        style={{ display: isVisible ? "block" : "none" }}
      >
        <form id="student" className="CP-box changepass" onSubmit={click}>
          <IoClose className="close-CP" onClick={closemodal} />
          <h2>Change password</h2>


          <label className="details" htmlFor="rollno" style={{display:"none"}}>
            Username
          </label>
          <input
            className="input"
            type="text"
            id="rollno"
            name="rollno"
            placeholder="Enter current rollno"
            value={data.rollno}
            onChange={(e) => setData({ ...data, rollno: e.target.value })}
            style={{ display: "none" }}
            required
          />

          <label className="details" htmlFor="password">
            Current Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Enter current password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          <label className="details" htmlFor="newpassword">
            New Password
          </label>
          <input
            className="input"
            type="password"
            id="newpassword"
            name="newpassword"
            placeholder="Enter New Password"
            value={data.newpassword}
            onChange={(e) =>
              setData({ ...data, newpassword: e.target.value })
            }
            required
          />
          <label className="details" htmlFor="confirmpassword">
            Confirm New Password
          </label>
          <input
            className="input"
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Re-enter New Password"
            value={data.confirmpassword}
            onChange={(e) =>              
               setData({ ...data, confirmpassword: e.target.value })
          }
            required
          />
          <p>{err}</p>
          <button type="submit" className="lg-btn">
            Change password
          </button>
        </form>
      </div>
    </>
  );
};

export default Changepassword;
