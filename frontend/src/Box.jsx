import React, { useState, useEffect } from "react";
import Speedometer from "./Speedometer";
import axios from "axios";

const Box = () => {
  const condition=["normal","moderate","mild","severe","extremely severe"];
  
  // const condition=["extremely severe","severe","moderate","mild","normal"];


  const [depressionValue, setdv] = useState(0);
  const [stressValue, setsv] = useState(0);
  const [anxietyValue, setav] = useState(0);
  const overall = (depressionValue + stressValue + anxietyValue) / 3;

  const [depression, setdepression] = useState([]);
  const [anxiety, setanxiety] = useState([]);
  const [stress, setstress] = useState([]);

  const [result, setResult] = useState([]);

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
    const fetchData = async () => {
      try {
        const user = await fetchStudent();
        const result = await fetchResult();
        let userid = user.id;
        const resultOfUser = result.find((item) => item.user === userid);
        const useroptions = resultOfUser.options;
        console.log("useroptions : ", useroptions);

        const newDepressionList = useroptions.map((item) => item.Depression);
        const newAnxietyList = useroptions.map((item) => item.Anxiety);
        const newStressList = useroptions.map((item) => item.Stress);

        setdepression(newDepressionList);
        setanxiety(newAnxietyList);
        setstress(newStressList);

        setdv(useroptions[useroptions.length - 1]["Depression"]);
        setav(useroptions[useroptions.length - 1]["Anxiety"]);
        setsv(useroptions[useroptions.length - 1]["Stress"]);

        console.log("Depression List:", newDepressionList);
        console.log("Anxiety List:", newAnxietyList);
        console.log("Stress List:", newStressList);

        console.log("depressionValue", depressionValue);
        console.log("anxietyValue", anxietyValue);
        console.log("stressValue", stressValue);
      } catch (error) {
        console.log("Error in useEffect:", error);
      }
    };

    fetchData();
  }, []);

  const fetchResult = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/result/all-result"
      );
      setResult(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user result:", error);
    }
  };

  const fetchStudent = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Token : ", accessToken);
      if (!accessToken) {
        setError("Access token not found");
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
        setuserdata({
          name: response.data.name,
          rollno: response.data.rollno,
          phoneno: response.data.phoneno,
          section: response.data.section,
          email: response.data.email,
          password: response.data.password,
        });
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred while fetching user data.");
    }
  };

  const calculateMean = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum / arr.length;
  };

  const [isActive, setIsActive] = useState(true);

  const Latest = () => {
    setdv(depression[depression.length - 1]);
    setav(anxiety[anxiety.length - 1]);
    setsv(stress[stress.length - 1]);
    setIsActive(true)
  };

  const Average = () => {
    setdv(calculateMean(depression));
    setav(calculateMean(anxiety));
    setsv(calculateMean(stress));
    setIsActive(false)
  };
  return (
    <>
      <div className="latest_result">
        <div className="options">
          {/* <div className="options"> */}
          <button className={`latest ${isActive ? "active" : ""}`} onClick={Latest}>Latest</button>
          <button className={`average ${isActive ? "" : "active"}`} onClick={Average}>Overall</button>
        </div>
        <div className="Box">
          <div className="depression dabba">
            <div>
              <Speedometer prompt={depressionValue} />
            </div>
            <div className="type-name">Depression</div>
            <div>{isActive ?"is "+condition[depressionValue] :""}</div>
          </div>
          <div className="stress dabba">
            <div>
              <Speedometer prompt={stressValue} />
            </div>
            <div className="type-name">Stress</div>
            <div>{isActive ?"is "+condition[stressValue] :""}</div>
          </div>
          <div className="anxiety dabba">
            <div>
              <Speedometer prompt={anxietyValue} />
            </div>
            <div className="type-name">Anxiety</div>
            <div>{isActive ?"is "+condition[anxietyValue] :""}</div>
          </div>
          <div className="overall dabba">
            <div>
              <Speedometer prompt={overall} />
            </div>
            <div className="type-name">Overall</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Box;
