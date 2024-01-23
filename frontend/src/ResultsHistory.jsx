import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import axios from "axios";

const ResultsHistory = () => {
  const [depressionValue, setdv] = useState(0);
  const [stressValue, setsv] = useState(0);
  const [anxietyValue, setav] = useState(0);
  const overall = (depressionValue + stressValue + anxietyValue) / 3;

  const [depression, setdepression] = useState([]);
  const [anxiety, setanxiety] = useState([]);
  const [stress, setstress] = useState([]);
  const [dates, setdates] = useState([]);
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
        const results = await fetchResult();
        console.log("results : ", results);
        const userid = user.id;
        const resultOfUser = results.find((item) => item.user === userid);

        if (resultOfUser) {
          const stu_results = resultOfUser.options;
          console.log("stu_results : ", stu_results);

          setdepression(stu_results.map((item) => item.Depression));
          setanxiety(stu_results.map((item) => item.Anxiety));
          setstress(stu_results.map((item) => item.Stress));

          setdv(depression[depression.length - 1]);
          setav(anxiety[anxiety.length - 1]);
          setsv(stress[stress.length - 1]);

          const newDailyDateList = stu_results.map((item) => {
            const dateObject = new Date(item.date);
            return dateObject.toISOString().split("T")[0];
          });

          setdates(newDailyDateList);

          console.log("Depression :", depression);
          console.log("Anxiety :", anxiety);
          console.log("Stress :", stress);
          console.log("dates : ", dates);
          console.log("d-value",depressionValue)
          console.log("a-value",anxietyValue)
          console.log("s-value",stressValue)
        }
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
      // setResult(response.data);
      // console.log("result : ",response.data);
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
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred while fetching user data.");
    }
  };

  const totalWeeks = depression.length;
  
  const [dep, setdep] = useState(0);
  const [str, setstr] = useState(0);
  const [anx, setanx] = useState(0);
  const [date, setdate] = useState();

  useEffect(() => {
    latest(totalWeeks);
  }, []);

  const handleWeekChange = (selectedWeek) => {
    console.log("total:", totalWeeks);
    console.log("week:", selectedWeek);
    latest(selectedWeek);
  };

  const latest = (selectedWeek) => {
    setdep(depression[selectedWeek - 1]);
    setstr(stress[selectedWeek - 1]);
    setanx(anxiety[selectedWeek - 1]);
    setdate(dates[selectedWeek - 1]);
  };

  const [results, setresults] = useState([]);

  const renderResults = () => {
    const r = [];
    for (let week = 1; week <= totalWeeks; week++) {
      r.push(
        <option key={week} value={week}>
          Attempt {week}
        </option>
      );
    }
    return r;
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="BodyBox">
        <div className="mainBox">
          <div className="Depression">
            Depression is recorded as {dep} on {date}
          </div>
          <div className="Stress">
            Stress is recorded as {str} on {date}
          </div>
          <div className="Anxiety">
            Anxiety is recorded as {anx} on {date}
          </div>
          <select
            name="weekSelector"
            className="weekSelector"
            onChange={(e) => handleWeekChange(e.target.value)}
          >
            {renderResults()}
          </select>
        </div>
      </div>
    </>
  );
};

export default ResultsHistory;
