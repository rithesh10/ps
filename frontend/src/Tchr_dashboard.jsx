import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Results_graph from "./Results_graph";

import { IoClose } from "react-icons/io5";

import {ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tchr_dashboard = () => {
  const condition = [
    "normal",
    "moderate",
    "mild",
    "severe",
    "extremely severe",
  ];

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

  const [suggestion, setsuggestion] = useState(""); ///
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [suggestion_visible, setsuggestion_visible] = useState(false);

  const open_suggestion = (item) => {
    setSelectedStudent(item);
    setsuggestion_visible(!suggestion_visible);
  };

  const [stu_name, setstu_name] = useState("");
  const [recent_result, setrecent_result] = useState(false);
  const [p, setp] = useState("No recent result found");

  const [stu_condition, setstu_condition] = useState(false);
  const open_condition = async (name) => {
    setstu_name(name);
    setp("\n No recent result found");
    setrecent_result(false);
    result.map((item) => {
      if (item.name === name) {
        setrecent_result(true);
        const newdate = new Date(item.options[item.options.length - 1].date)
          .toISOString()
          .split("T")[0];
        setp(
          <p>
            Date : {newdate} <br />
            {/* Date : {item.options[item.options.length-1].date.toISOString().split("T")[0]} <br /> */}
            Depression :{" "}
            {condition[item.options[item.options.length - 1].Depression]} <br />
            Anxiety : {
              condition[item.options[item.options.length - 1].Anxiety]
            }{" "}
            <br />
            Stress : {
              condition[item.options[item.options.length - 1].Stress]
            }{" "}
            <br />
          </p>
        );
      }
    });
    setstu_condition(!stu_condition);
  };

  //////// Suggestion box
  const handleTextareaChange = (e) => {
    setsuggestion(e.target.value);
  };

  const submitSuggestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/teacher/student-suggestion",
        {
          name: selectedStudent.name,
          suggestion: suggestion,
          id: selectedStudent._id,
        }
      );

      // Handle the response if needed
      setsuggestion_visible(false);
      setsuggestion("");
      toast.success('Submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose:1000,
      });
      // Close the suggestion modal
    } catch (error) {
      console.error("Error submitting suggestion:", error);
    }
  };

  return (
    <div>
      <nav className="lgn-nav td-nav">
        <h1 className="td">Teacher Dashboard</h1>
        <Link to="/teacher-login" className="td-item">Logout</Link>
      </nav>
      <div className="all-students">
        {students.map((item) => (
          <li className="student-details" key={item.id}>
            <div>{item.name}</div>
            <div>{item.rollno}</div>
            <div>{item.phoneno}</div>
            <button onClick={() => open_condition(item.name)}>Condition</button>
            <button onClick={() => open_suggestion(item)}>Suggetion</button>
          </li>
        ))}
      </div>
      <Modal
        isOpen={stu_condition}
        onRequestClose={() => setstu_condition(false)}
        style={{
          content: {
            width: "400px",
            fontSize:"23px",
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
        {/* {stu_name} */}
        {p}
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
        <form
          action=""
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={(e) => {
            e.preventDefault();
            submitSuggestion();
          }}
        >
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
