import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import axios from 'axios';

const ResultsHistory = () => {
  const [depressionValue, setdp] = useState(0);
  const [stressValue, setsv] = useState(0);
  const [anxietyValue, setav] = useState(0);
  const overall = (depressionValue + stressValue + anxietyValue) / 3;

  const [depression, setdepression] = useState([]);
  const [anxiety, setanxiety] = useState([]);
  const [stress, setstress] = useState([]);
  const [dailydate,setdailydate]=useState([]);
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
        const userid = user.id;
        const resultOfUser = results.find((item) => item.user === userid);

        if (resultOfUser) {
          const useroptions = resultOfUser.options;
          console.log(useroptions)
          const newDepressionList = useroptions.map((item) => item.Depression);
          const newAnxietyList = useroptions.map((item) => item.Anxiety);
          const newStressList = useroptions.map((item) => item.Stress);
          // const newdailydateList = useroptions.map((item)=>item.date);

          const newDailyDateList = useroptions.map((item) => {
            const dateObject = new Date(item.date);
            return dateObject.toISOString().split('T')[0];
        });
        
        console.log(newDailyDateList);
        

          setdepression(newDepressionList);
          setanxiety(newAnxietyList);
          setstress(newStressList);
          
          setdailydate(newDailyDateList);
          setdp(newDepressionList[newDepressionList.length - 1]);
          setav(newAnxietyList[newAnxietyList.length - 1]);
          setsv(newStressList[newStressList.length - 1]);

          console.log("depressionValue", newDepressionList[newDepressionList.length - 1]);
          console.log("anxietyValue", newAnxietyList[newAnxietyList.length - 1]);
          console.log("stressValue", newStressList[newStressList.length - 1]);

          console.log("Depression List:", newDepressionList);
          console.log("Anxiety List:", newAnxietyList);
          console.log("Stress List:", newStressList);
          console.log("date: ",newDailyDateList);
        }
      } catch (error) {
        console.log("Error in useEffect:", error);
      }
    };

    fetchData();
  }, []);

  const fetchResult = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/result/all-result");
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
      const response = await axios.get("http://localhost:2000/api/users/student-profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

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

  const totalWeeks = depression.length;
  console.log("depression:",depression);
  console.log("stress:",stress);
  console.log("anxiety:",anxiety);
  console.log(dailydate);
  const DateList = dailydate;
  const [dep, setdep] = useState();
  const [str, setstr] = useState();
  const [anx, setanx] = useState();
  const [date, setdate] = useState();

  const handleWeekChange = (selectedWeek) => {
    latest(selectedWeek);
  };

  const latest = (selectedWeek) => {
    setdep(depression[selectedWeek - 1]);
    setstr(stress[selectedWeek - 1]);
    setanx(anxiety[selectedWeek - 1]);
    setdate(DateList[selectedWeek - 1]);
  };

  const renderResults = () => {
    const results = [];
    for (let week = 1; week <= totalWeeks; week++) {
      results.push(<option key={week} value={week}>Week {week}</option>);
    }
    return results;
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className='BodyBox'>
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
          <select name="weekSelector" id="weekSelector" onChange={(e) => handleWeekChange(e.target.value)}>
            {renderResults()}
          </select>
        </div>
      </div>
    </>
  );
};

export default ResultsHistory;
