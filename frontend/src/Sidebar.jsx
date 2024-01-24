import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CiLogout } from "react-icons/ci";
import Modal from "react-modal";
import Contactmodal from "./Contactmodal"
import Counceller from "./Counceller";

const Sidebar = ({visible}) => {
  var p,q,r;
  const [userdata, setuserdata] = useState({
    name: "",
    section: "",
    email: "",
    password: "",
    rollno: "",
    phoneno: "",
  });
  const [suggestion,setsuggestion]=useState([])
  const [latestsuggestion,setLatestSuggestion]=useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchSuggestion=async()=>{
      try{
        const response = await axios.get("http://localhost:2000/api/teacher/get-suggestion")
        setsuggestion(response.data);
        q = response.data;
        console.log(response.data)
        setsuggestion(q);

        return q;
      }
      catch(error)
      {
        console.error("Error while fetching the suggestions given by teacher",error);
      }
  }

  const fetchStudent = async () => {
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
      return p;
    } catch (error) {
      console.log(error);
      setError(
        error.message || "An error occurred while fetching user data."
      );
    }
  };

  const usersuggestion = async () => {
    try {
      const user = await fetchStudent();
      console.log(user);
      
      const suggestion = await fetchSuggestion();
      const username = user ? user.name : null;
  
      console.log('Suggestion data:', suggestion);
      console.log('Username:', username);
  
      if (username) {
        const suggestionOfUser = suggestion.find((item) => item.username === username);
        console.log(suggestionOfUser);
  
        if (suggestionOfUser) {
          console.log("Teacher's suggestion:", suggestionOfUser.suggestion);
          r = await suggestionOfUser.suggestion
          console.log(r.length)
            setLatestSuggestion(r[r.length-1]);
          console.log(latestsuggestion);
        } else {
          console.log("No suggestion found for the user with username:", username);
        }
      } else {
        console.log("Username not available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  usersuggestion();

  }, []);

  const [contact_visible,setcontact_visible]=useState(false)
  const [counsellor_visible,setcounsellor_visible]=useState(false)


  return (
    <div className={`Sidebar ${visible ? "side-modal" : ""}`}>
      <h1>Manas Health</h1>
      <h2>General</h2>
      <ul>
        <Link to="/dashboard"><li >Home</li></Link>
        <Link  to="/dashboard/calendar"><li>Calendar</li></Link>
        <Link to="/dashboard/result-history"><li>Results</li></Link>
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
