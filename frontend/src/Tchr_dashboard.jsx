import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Results_graph from "./Results_graph";

import { IoClose } from "react-icons/io5";

const Tchr_dashboard = () => {
  const [depressionValue, setdp] = useState(0);
  const [stressValue, setsv] = useState(0);
  const [anxietyValue, setav] = useState(0);
  const overall = (depressionValue + stressValue + anxietyValue) / 3;

  const [depression, setdepression] = useState([]);
  const [anxiety, setanxiety] = useState([]);
  const [stress, setstress] = useState([]);
  const [result, setResult] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchResult();
        console.log(result);
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
      console.log("result : ", response.data);
      // console.log("result : ",result);
      return response.data;
    } catch (error) {
      console.error("Error fetching user result:", error);
    }
  };

  const [stu_data, setStu_data] = useState({
    name: "",
    section: "",
    email: "",
    password: "",
    rollno: "",
    phoneno: "",
  });

  const [students, setstudents] = useState([]);

  ///////    Students details

  const getdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/teacher/student-data",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.data) {
        console.log("res : ", response);
        console.log("data : ", response.data);
        setstudents(response.data);
        console.log(students);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const [suggestion_visible, setsuggestion_visible] = useState(false);
  const open_suggestion = () => {
    setsuggestion_visible(!suggestion_visible);
  };

  const [stu_name, setstu_name] = useState("");
  const [recent_result, setrecent_result] = useState(false);
  const [stu_condition, setstu_condition] = useState(false);
  const open_condition = async (name) => {
    setstu_name(name);
    setrecent_result(false);
    result.map((item) => {
      if (item.name === stu_name) {
        setrecent_result(true);
      }
    });
    setstu_condition(!stu_condition);
  };

  //////// Suggestion box

  const [suggestion, setsuggestion] = useState("");

  const handleTextareaChange = (e) => {
    setsuggestion(e.target.value);
  };

  return (
    <div>
      <h1 className="td">Teacher Dashboard</h1>
      <div className="all-students">
        {students.map((item) => (
          <li className="student-details" key={item.id}>
            <div>{item.name}</div>
            <div>{item.rollno}</div>
            <div>{item.phoneno}</div>
            <button onClick={() => open_condition(item.name)}>Condition</button>
            <button onClick={open_suggestion}>Suggetion</button>
          </li>
        ))}
      </div>
      <Modal
        isOpen={stu_condition}
        onRequestClose={() => setstu_condition(false)}
        style={{
          content: {
            // width: "50vw",
            width: "500px",
            height: "fit-content",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)",
            padding: "20px 0px",
            margin: "0",
            backgroundColor: "none",
            borderRadius: "27px",
          },
        }}
      >
        {stu_name}
        {/* Anxiety : {recent_result ? result.map((item) =>{item.name===stu_name ? item.options[0].Depression : " qwertyui"}) : "not found"} */}
      </Modal>
      <Modal
        isOpen={suggestion_visible}
        style={{
          content: {
            // width: "50vw",
            width: "500px",
            height: "fit-content",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)",
            padding: "20px 0px",
            margin: "0",
            backgroundColor: "none",
            borderRadius: "27px",
          },
        }}
      >
        <form action="" style={{ display: "flex", flexDirection: "column" }}>
          <IoClose
            className="close-CP"
            onClick={() => {
              setsuggestion_visible(false);
            }}
          />
          <h2 style={{ textAlign: "center" }}>Suggestion Box</h2>
          <textarea
            value={suggestion}
            onChange={handleTextareaChange}
            placeholder="Type something..."
            rows={20}
            cols={50}
            style={{
              border: "1px solid black",
              borderRadius: "20px",
              padding: "20px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100px",
              height: "30px",
              margin: "20px auto 0px auto",
              backgroundColor: "grey",
              color: "white",
              border: "1px solid black",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Tchr_dashboard;
