import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Results = () => {
    const [result, setResult] = useState([]);
    var p,q;
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
        // Your fetch code here to get the user data
        const fetchResult = async () => {
          try {
            const response = await axios.get('http://localhost:2000/api/result/all-result');
            setResult(response.data);
            q=response.data;
            // console.log(setResult)
            console.log(response.data)

            return q;
          } catch (error) {
            console.error('Error fetching user result:', error);
          }
        };
    
        
        
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
        const userresult = async ()=>{
            const user= await fetchStudent();
            const result= await fetchResult();
            let userid = user.id
            console.log(userid);
            const resultOfUser = result.find(item => item.user === userid);
            console.log("resultofuser=",resultOfUser);
            const useroptions=resultOfUser.options
            console.log(useroptions)
            console.log(useroptions.length)
            const useroptionslast = useroptions[useroptions.length -1]
            console.log(useroptionslast);
            const Depression = useroptionslast['Depression']
            const Anxiety = useroptionslast['Anxiety']
            const Stress = useroptionslast['Stress']
            console.log(Depression,Anxiety,
                Stress)
            // console.log(resultOfUser.options[-1])
            
        }
        userresult();
      }, []);


  return (
    <div>
      
    </div>
  )
}

export default Results
