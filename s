[1mdiff --git a/frontend/src/App.css b/frontend/src/App.css[m
[1mindex 5b8c1ee..84c48a2 100644[m
[1m--- a/frontend/src/App.css[m
[1m+++ b/frontend/src/App.css[m
[36m@@ -1151,6 +1151,20 @@[m [mbutton:hover {[m
 [m
 [m
 [m
[32m+[m[32m.NTR{[m
[32m+[m[32m  width: 20vw;[m
[32m+[m[32m  height: 40vh;[m
[32m+[m[32m  background-image: url(./NTR3.jpg);[m
[32m+[m[32m  background-repeat: no-repeat;[m
[32m+[m[32m  background-size: cover;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-direction: column;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  justify-content: center;[m
[32m+[m
[32m+[m
[32m+[m[32m}[m
[32m+[m
 [m
 /*    MEDIA QUERIES    */[m
 [m
[1mdiff --git a/frontend/src/Asnmt_page.jsx b/frontend/src/Asnmt_page.jsx[m
[1mindex 17407da..e3c8ae3 100644[m
[1m--- a/frontend/src/Asnmt_page.jsx[m
[1m+++ b/frontend/src/Asnmt_page.jsx[m
[36m@@ -2,82 +2,81 @@[m [mimport React, { useState, useEffect } from "react";[m
 import Sidebar from "./Sidebar";[m
 import Navbar from "./Navbar";[m
 import axios from "axios";[m
[31m-import { useNavigate } from "react-router-dom";[m
[31m-[m
[32m+[m[32mimport { Link, useNavigate } from "react-router-dom";[m
[32m+[m[32mimport Modal from "react-modal";[m
 [m
 const Asnmt_page = () => {[m
[32m+[m[32m  const navigate = useNavigate();[m
 [m
[31m-  const navigate=useNavigate()[m
[31m-[m
[31m-[m
[31m-  const [selectedOptions, setSelectedOptions] = useState({[m
[31m-  });[m
[32m+[m[32m  const [examover,setexamover]=useState(false);[m
[32m+[m[41m  [m
[32m+[m[32m  const [selectedOptions, setSelectedOptions] = useState({});[m
 [m
   var p;[m
[31m-  const [userdata,setuserdata]=useState({[m
[31m-    name:"",[m
[31m-    rollno:"",[m
[31m-    phoneno:"",[m
[31m-    id:""[m
[31m-  })[m
[32m+[m[32m  const [userdata, setuserdata] = useState({[m
[32m+[m[32m    name: "",[m
[32m+[m[32m    rollno: "",[m
[32m+[m[32m    phoneno: "",[m
[32m+[m[32m    id: "",[m
[32m+[m[32m  });[m
   const [error, setError] = useState(null);[m
 [m
   useEffect(() => {[m
     const fetchData = async () => {[m
       try {[m
[31m-        const accessToken = localStorage.getItem('accessToken');[m
[31m-        console.log("AC===",accessToken)[m
[32m+[m[32m        const accessToken = localStorage.getItem("accessToken");[m
[32m+[m[32m        console.log("AC===", accessToken);[m
         if (!accessToken) {[m
[31m-          setError('Access token not found'); // Handle missing token[m
[32m+[m[32m          setError("Access token not found"); // Handle missing token[m
           return;[m
         }[m
[31m-        const response = await axios.get('http://localhost:2000/api/users/student-profile', {[m
[31m-          headers: {[m
[31m-            'Authorization': `Bearer ${accessToken}`,[m
[31m-            'Content-Type': 'application/json',[m
[32m+[m[32m        const response = await axios.get([m
[32m+[m[32m          "http://localhost:2000/api/users/student-profile",[m
[32m+[m[32m          {[m
[32m+[m[32m            headers: {[m
[32m+[m[32m              Authorization: `Bearer ${accessToken}`,[m
[32m+[m[32m              "Content-Type": "application/json",[m
[32m+[m[32m            },[m
           }[m
[31m-        });[m
[31m-        console.log("res===",response)[m
[32m+[m[32m        );[m
[32m+[m[32m        console.log("res===", response);[m
 [m
         if (response && response.data) {[m
[31m-          p=response.data[m
[32m+[m[32m          p = response.data;[m
           setuserdata({[m
[31m-            name:p.name,[m
[31m-            rollno:p.rollno,[m
[31m-            phoneno:p.phoneno,[m
[31m-            id:p.id,[m
[32m+[m[32m            name: p.name,[m
[32m+[m[32m            rollno: p.rollno,[m
[32m+[m[32m            phoneno: p.phoneno,[m
[32m+[m[32m            id: p.id,[m
[32m+[m[32m          });[m
 [m
[31m-          })[m
[31m-          [m
[31m-          console.log(re