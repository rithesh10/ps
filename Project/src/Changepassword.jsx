import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import Forgetpassword from "./Forgetpassword";
import axios from "axios";

import { IoClose } from "react-icons/io5";

const Changepassword = ({ isVisible, closemodal,roll}) => {
  const [data, setData] = useState({
    rollno:{roll},
    password: "",
    changepassword: "",
  });

  const [confirmNewpass, setconfirmNewpass] = useState("");

  const [err,seterr]=useState('')

  const click = async (e) => {
    e.preventDeafault();

    if (data.changepassword == confirmNewpass) {
      seterr('')
      try {
        const response = await axios.post(
          "http://localhost:3000/api/users/student-passwordChange",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("Password changed successfully!");
        console.log("Password changed successfully!")

        setData({
          password: "",
          changepassword: "",
        });

        setconfirmNewpass("");

        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const { data } = error.response;
          console.log(data);
          console.log("password error")
          seterr(data.error)

        } 
        // else {
        //   alert("Failed to submit the form. Please try again.");
        // }
      }
    }else{
      seterr('New password did not match')
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
          <label className="details" htmlFor="S-Username">
            Current Password
          </label>
          <input
            className="input"
            type="password"
            // id="S-Username"
            placeholder="Enter current password"
            value={data.currentpass}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          <label className="details" htmlFor="S-Password">
            New Password
          </label>
          <input
            className="input"
            type="password"
            // id="S-Password"
            placeholder="Enter New Password"
            value={data.newpass}
            onChange={(e) => setData({ ...data, changepassword: e.target.value })}
            required
          />
          <label className="details" htmlFor="S-Password">
            Confirm New Password
          </label>
          <input
            className="input"
            type="password"
            // id="S-Password"
            placeholder="Re-enter New Password"
            value={confirmNewpass}
            onChange={(e) => setconfirmNewpass(e.target.value)}
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
