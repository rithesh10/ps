import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  const [depressionValue, setdp] = useState(0);
  const [stressValue, setsv] = useState(0);
  const [anxietyValue, setav] = useState(0);
  const overall = (depressionValue + stressValue + anxietyValue) / 3;

  const [result, setResult] = useState([]);
  var p, q;
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
        const response = await axios.get(
          "http://localhost:2000/api/result/all-result"
        );
        setResult(response.data);
        q = response.data;
        // console.log(setResult)
        console.log(response.data);

        return q;
      } catch (error) {
        console.error("Error fetching user result:", error);
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
    const userresult = async () => {
      const user = await fetchStudent();
      const result = await fetchResult();
      let userid = user.id;
      console.log(userid);
      const resultOfUser = result.find((item) => item.user === userid);
      console.log("resultofuser=", resultOfUser);
      const useroptions = resultOfUser.options;
      console.log(useroptions);
      console.log(useroptions.length);
      const useroptionslast = useroptions[useroptions.length - 1];
      console.log(useroptionslast);
      setdp(useroptionslast["Depression"]);
      setav(useroptionslast["Anxiety"]);
      setsv(useroptionslast["Stress"]);
      console.log(depressionValue, anxietyValue, stressValue);
      // console.log(resultOfUser.options[-1])
    };
    userresult();
  }, []);

  const condition = ["normal", "mild", "moderate", "severe", "Extremely severe"];

  const goto_dash = () => {
    navigate("/dashboard");
  };
  return (
    <div className="result-img">
      <div className="result">
        <h3>You have {condition[depressionValue]} Depression</h3>
        <h3>You have {condition[anxietyValue]} Anxiety</h3>
        <h3>You have {condition[stressValue]} Stress</h3>
        <button onClick={goto_dash}> Go to Dashboard{`  ~>`}</button>
      </div>
    </div>
  );
};

export default Results;
