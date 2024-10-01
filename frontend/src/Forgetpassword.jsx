import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { IoClose } from "react-icons/io5";

const Forgetpassword = ({ visible }) => {
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const [invalid, setinvalid] = useState("");

  const Change_pass = async (e) => {
    console.log(email);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/users/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response)
      if (response.status == 200) {
        console.log("super");
        navigate("/");
        alert("password reset link sent to your email");
      }
    } catch (error) {
      console.log(error.response);
      setinvalid("Invalid email");
    }
  };

  return (
    <>
      <form className="Forget-password" onSubmit={Change_pass}>
        {/* <IoClose className="close-CP" onClick={closemodal} /> */}
        <h2>Forget password</h2>
        <label className="details" htmlFor="S-Username">
          Email
        </label>
        <input
          className="input"
          type="email"
          name="email"
          id="S-Username"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          placeholder="Enter your email"
          required
        />
        <h3 className="error">{invalid}</h3>
        <button className="FP">Next</button>
      </form>
    </>
  );
};

export default Forgetpassword;
