import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { IoClose } from "react-icons/io5";

const Password_reset = ({visible}) => {

  const [password,setpassword]=useState("")
  const {id,token}=useParams()
  const navigate=useNavigate()
  const [err,seterr]=useState()
  
  const Change_pass=async (e)=>{
    console.log(password)
    e.preventDefault();
    try{

      const response = await axios.post(
        `http://localhost:2000/api/users/reset-forgotten-password/${id}/${token}`,
        {password},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        );
        console.log(response);
        if(response.status==200)
        {
            navigate("/student-login")
            alert("Password reset successfully")
        }
       
      }
    catch(error)
    {
      console.log(error.response);
      seterr(error.response.data.message)
    //   alert("catch block executed")
    }
  }

  return (
    <>
      <form className="Forget-password" onSubmit={Change_pass}>
      {/* <IoClose className="close-CP" onClick={closemodal} /> */}
        <h2>Forget password</h2>
        <label className="details" htmlFor="S-Username">
          Change-Password 
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="S-Username"
          value={password}
          onChange={(e)=>{setpassword(e.target.value)}}
          placeholder="Enter your password"
          required
        />
        <b className="error">{err}</b>
        <button className="FP">Next</button>
      </form>
    </>
  );
};

export default Password_reset;
