import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Modal from "react-modal";
import axios from "axios";
import {ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgetpassword from "../Forgetpassword";

const Login = ({ name }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    rollno: "",
    password: "",
  });

  const [tchr_data, settchr_data] = useState({
    username: "",
    password: "",
  });

  const [p, setp] = useState("");

  const stu_login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/users/student-login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      console.log(response.data);
      if (response && response.data && response.data.token) {
        const accessToken = await response.data.token;
        localStorage.setItem("accessToken", accessToken);
        console.log("login successful");
        console.log("Access Token:", accessToken);

        toast.success('Login successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose:1000,
        });

        navigate("/dashboard");
        // alert("login successful");
      } else {
        alert("no token recieved");
        console.log(response.data);
      }
    } catch (error) {
      setp("Invalid credentials!");
      console.log(error);
    }
  };

  const tchr_login = async (e) => {
    e.preventDefault();
    // console.log(data)
    try {
      const response = await axios.post(
        "http://localhost:2000/api/teacher/teacher-login",
        tchr_data,
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      console.log(response.data);
      if (response && response.data) {
        console.log("login successful");
        
        toast.success('Login successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose:1000,
        });
        navigate("/tchr_dashboard");

        // alert("login successful");
      } else {
        alert("no token recieved");
        console.log(response.data);
      }
    } catch (error) {
      setp("Invalid credentials!");
      console.log(error);
    }
  };

  const [FP, setFP] = useState(false);

  const openFP = () => {
    alert("Endhuk marchipoinav ra pulka....");
  };

  return (
    <>
      <Nav />
      <div className="Lgn-body">
        <form
          id="student"
          className="login-box"
          onSubmit={name == "Student" ? stu_login : tchr_login}
          >
          <h2>{name}'s Login</h2>
          <label className="details" htmlFor="S-Username">
            Username
          </label>
          <input
            className="input"
            type="text"
            // readOnly
            id="S-Username"
            placeholder={
              name == "Student" ? "Enter your rollno." : "Enter your username"
            }
            value={name == "Student" ? data.rollno : tchr_data.username}
            onChange={
              name == "Student"
              ? (e) => setData({ ...data, rollno: e.target.value })
              : (e) => settchr_data({ ...tchr_data, username: e.target.value })
            }
            required
            />
          <label className="details" htmlFor="S-Password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="S-Password"
            placeholder="Enter your Password"
            value={name == "Student" ? data.password : tchr_data.password}
            onChange={
              name == "Student"
              ? (e) => setData({ ...data, password: e.target.value })
              : (e) => settchr_data({ ...tchr_data, password: e.target.value })
            }
            required
            />
          <a className="forget" onClick={openFP}>
            Forget Password ?
          </a>

          {/* <Modal
            isOpen={FP}
            onRequestClose={() => setFP(false)}
            style={{
              content: {
                width: "fit-content",
                height: "fit-content",
                overflow: "hidden",
                top: "30vh",
                left: "",
                padding: "0px",
                border:"none",
              },
            }}
          >
            <Forgetpassword className="modal-FP"/>
          </Modal> */}

          <p className="error">{p}</p>
          <button type="submit" className="lg-btn">
            Log in
          </button>

          {name == "Student" ? (
            <p>
              New here ?
              <Link to="/student-signup" className="su-anc" id="stu-signbtn">
                Sign up
              </Link>
            </p>
          ) : (
            ""
            )}
        </form>

        {/* {name == "Student" ? (
          <div className="lgn-btns">
            <Link to="/teacher-login">Teacher Login</Link>
          </div>
        ) : (
          <div className="lgn-btns">
            <Link to="/student-login">Student Login</Link>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Login;





// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Nav from "./Nav";
// import Modal from "react-modal";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Forgetpassword from "../Forgetpassword";

// const Login = ({ name }) => {
  //   const navigate = useNavigate();
  
//   const [data, setData] = useState({
//     rollno: "",
//     password: "",
//   });

//   const [p, setp] = useState("");

//   const click = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:2000/api/users/student-login",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             // "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       console.log(response);
//       console.log(response.data);
//       if (response && response.data && response.data.token) {
//         const accessToken = await response.data.token;
//         localStorage.setItem("accessToken", accessToken);
//         console.log("login successful");
//         console.log("Access Token:", accessToken);
//         navigate("/dashboard");
//         alert("login successful");
//         // toast('Login Successful')
//       } else {
//         alert("no token recieved");
//         console.log(response.data);
//       }
//     } catch (error) {
//       setp("Invalid credentials!");
//       console.error(error);
//     }
//   };



//   const [FP, setFP] = useState(false);

//   const openFP = () => {
//   };

//   return (
//     <>
//       <Nav />
//       {/* <ToastContainer/> */}
//       <div className="Lgn-body" >
//         <form id="student" className="login-box" onSubmit={click}>
//           <h2>{name}'s Login</h2>
//           <label className="details" htmlFor="S-Username">
//             Username
//           </label>
//           <input
//             className="input"
//             type="text"
//             id="S-Username"
//             placeholder={
//               name == "Student" ? "Enter your rollno." : "Enter your username"
//             }
//             value={data.rollno}
//             onChange={(e) => setData({ ...data, rollno: e.target.value })}
//             required
//           />
//           <label className="details" htmlFor="S-Password">
//             Password
//           </label>
//           <input
//             className="input"
//             type="password"
//             id="S-Password"
//             placeholder="Enter your Password"
//             value={data.password}
//             onChange={(e) => setData({ ...data, password: e.target.value })}
//             required
//           />
//           <a className="forget" onClick={openFP}>
//             Forget Password ?
//           </a>

//           {/* <Modal
//             isOpen={FP}
//             onRequestClose={() => setFP(false)}
//             style={{
//               content: {
//                 width: "fit-content",
//                 height: "fit-content",
//                 overflow: "hidden",
//                 top: "30vh",
//                 left: "",
//                 padding: "0px",
//                 border:"none",
//               },
//             }}
//           >
//             <Forgetpassword className="modal-FP"/>
//           </Modal> */}

//           <p className="error">{p}</p>
//           <button type="submit" className="lg-btn">
//             Log in
//           </button>

//           {name == "Student" ? (
//             <p>
//               New here ?
//               <Link to="/student-signup" className="su-anc" id="stu-signbtn">
//                 Sign up
//               </Link>
//             </p>
//           ) : (
//             ""
//           )}
//         </form>

//         {name == "Student" ? (
//           <div className="lgn-btns">
//             <Link to="/teacher-login">Teacher Login</Link>
//           </div>
//         ) : (
//           <div className="lgn-btns">
//             <Link to="/student-login">Student Login</Link>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Login;
