import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Results = () => {
    const [result, setResult] = useState([]);
    const [userdata, setuserdata] = useState({
        name: "",
        section: "",
        email: "",
        password: "",
        rollno: "",
        phoneno: "",
      });
    useEffect(() => {
        // Your fetch code here to get the user data
        const fetchResult = async () => {
          try {
            const response = await axios.get('http://localhost:2000/api/result/all-result');
            setResult(response.data);
            console.log(setResult)
          } catch (error) {
            console.error('Error fetching user result:', error);
          }
        };
    
        fetchResult();


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
            } catch (error) {
              console.log(error);
              setError(
                error.message || "An error occurred while fetching user data."
              );
            }
          };
      
          fetchStudent();
      }, []);


  return (
    <div>
      
    </div>
  )
}

export default Results
