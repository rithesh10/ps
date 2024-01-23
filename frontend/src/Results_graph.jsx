import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";

let lineChart;

const Results_graph = () => {
  const [depressionValue, setdp] = useState(0);
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

        const newDepressionList = useroptions.map((item) => item.Depression);
        const newAnxietyList = useroptions.map((item) => item.Anxiety);
        const newStressList = useroptions.map((item) => item.Stress);

        setdepression(newDepressionList);
        setanxiety(newAnxietyList);
        setstress(newStressList);

        setdp(useroptions[useroptions.length - 1]["Depression"]);
        setav(useroptions[useroptions.length - 1]["Anxiety"]);
        setsv(useroptions[useroptions.length - 1]["Stress"]);

        console.log("depressionValue",depressionValue);
        console.log("anxietyValue",anxietyValue);
        console.log("stressValue",stressValue);

        console.log("Depression List:", newDepressionList);
        console.log("Anxiety List:", newAnxietyList);
        console.log("Stress List:", newStressList);
        console.log("ddd",depression);
        console.log("ddd",stress);
        console.log("ddd",anxiety);
      } catch (error) {
        console.log("Error in useEffect:", error);
      }
    };

    fetchData();

    // const lineChartCtx = document.getElementById("lineChart").getContext("2d");

    // const lineChartData = {
    //   labels: [1,2,3,4,5,6,7,8,9,10],
    //   datasets: [
    //     {
    //       label: "depression",
    //       data: depression,
    //       borderColor: "red", // Customize the color if needed
    //       borderWidth: 2,
    //       fill: false,
    //     },
    //     {
    //       label: "anxiety",
    //       data: anxiety,
    //       borderColor: "blue", // Customize the color if needed
    //       borderWidth: 2,
    //       fill: false,
    //     },
    //     {
    //       label: "stress",
    //       data: stress,
    //       borderColor: "orange", // Customize the color if needed
    //       borderWidth: 2,
    //       fill: false,
    //     },
    //   ],
    // };

    // const options = {
    //   scales: {
    //     y: {
    //       beginAtZero: true,
    //     },
    //   },
    // };

    // let lineChart = new Chart(lineChartCtx, {
    //   type: "line",
    //   data: lineChartData,
    //   options: options,
    // });

    // // Clean up the chart when the component is unmounted
    // return () => {
    //   lineChart.destroy();
    // };

    // console.log(newDepressionList);
  }, []);

  const updateChart = () => {
    const lineChartCtx = document.getElementById("lineChart").getContext("2d");

    const lineChartData = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      datasets: [
        {
          label: "depression",
          data: depression,
          borderColor: "rgb(66, 124, 248)", // Customize the color if needed

          borderWidth: 3,

          fill: false
        },
        {
          label: "anxiety",
          data: anxiety,
          borderColor: "rgb(233, 66, 66)", // Customize the color if needed

          borderWidth: 3,

          fill: false,
        },
        {
          label: "stress",
          data: stress,
          borderColor: "rgb(250, 181, 54)", // Customize the color if needed

          borderWidth: 3,

          fill: false,
        },
      ],
    };

    const options = {
      plugins: {
        subtitle: {
          display: true,
          text: 'Progress Graph',
          color: 'black', // Corrected property name
          font: {
            size: 20
          }
        }
      },
    //   animations: {
    //     tension: {
    //         duration: 1200,
    //         // easing: 'linear',
    //         easing:'easeIn',
    //         from: 1,
    //         to: 0,
    //         loop: true
    //     }
    // },
      scales: {
        x: {

          // ticks:{
          //   // color:'#000000'
          // },
          grid:{
            color:''
          }
        },
        y: {
        //   ticks:{
        //     // color:'#000000'
        //   },

          grid:{
            color:'rgb(66, 65, 65)'
          }
        }
        
      },
    };

    // Destroy the existing chart if it exists
    if (lineChart) {
      lineChart.destroy();
    }

    // Create a new chart
    lineChart = new Chart(lineChartCtx, {
      type: "line",
      data: lineChartData,
      options: options,
    });
  };

  // Call the updateChart function whenever the state variables change
  useEffect(() => {
    updateChart();
  }, [depression, anxiety, stress]);



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
  // useEffect(() => {
  //     // Your fetch code here to get the user data
  //     const fetchResult = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:2000/api/result/all-result');
  //         setResult(response.data);
  //         q=response.data;
  //         // console.log(setResult)
  //         console.log(response.data)

  //         return q;
  //       } catch (error) {
  //         console.error('Error fetching user result:', error);
  //       }
  //     };

  //     const fetchStudent = async () => {
  //         try {
  //             const accessToken = localStorage.getItem("accessToken");
  //           console.log("Token : ", accessToken);
  //           if (!accessToken) {
  //             setError("Access token not found"); // Handle missing token
  //             return;
  //         }
  //         const response = await axios.get(
  //             "http://localhost:2000/api/users/student-profile",
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${accessToken}`,
  //                     "Content-Type": "application/json",
  //                 },
  //             }
  //             );
  //             if (response && response.data) {
  //                 p = response.data;
  //                 setuserdata({
  //                     name: response.data.name,
  //                     rollno: response.data.rollno,
  //                     phoneno: response.data.phoneno,
  //                     section: response.data.section,
  //                     email: response.data.email,
  //                     password: response.data.password,
  //                 });
  //                 console.log(response.data);

  //             }
  //         return p;
  //         } catch (error) {
  //             console.log(error);
  //             setError(
  //                 error.message || "An error occurred while fetching user data."
  //                 );
  //             }
  //         };
  //     const userresult = async ()=>{
  //         const user= await fetchStudent();
  //         const result= await fetchResult();
  //         let userid = user.id
  //         console.log(userid);
  //         const resultOfUser = result.find(item => item.user === userid);
  //         console.log("resultofuser=",resultOfUser);
  //         const useroptions=resultOfUser.options
  //         console.log(useroptions)

  //         const newDepressionList = useroptions.map(item => item.Depression);
  //         const newAnxietyList = useroptions.map(item => item.Anxiety);
  //         const newStressList = useroptions.map(item => item.Stress);

  //         setdepression(newDepressionList);
  //         setanxiety(newAnxietyList);
  //         setstress(newStressList);

  //         console.log('Depression List:', depression);
  //         console.log('Anxiety List:', anxiety);
  //         console.log('Stress List:', stress);

  //         const lineChartCtx = document.getElementById('lineChart').getContext('2d');

  //   const lineChartData = {
  //     labels: ["week1","week2","week3","week4"],
  //     datasets: [
  //       {
  //         label: 'depression',
  //         data: depression,
  //         borderColor: 'red', // Customize the color if needed
  //         borderWidth: 2,
  //         fill: false,
  //       },
  //       {
  //         label: 'anxiety',
  //         data: anxiety,
  //         borderColor: 'blue', // Customize the color if needed
  //         borderWidth: 2,
  //         fill: false,
  //       },
  //       {
  //         label: 'stress',
  //         data: stress,
  //         borderColor: 'orange', // Customize the color if needed
  //         borderWidth: 2,
  //         fill: false,
  //       },

  //     ],
  //   };

  //   const options = {
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   };

  //   let lineChart = new Chart(lineChartCtx, {
  //     type: 'line',
  //     data: lineChartData,
  //     options: options,
  //   });

  //   // Clean up the chart when the component is unmounted
  //   return () => {
  //     lineChart.destroy();
  //   };

  //     }
  //     userresult();

  //   }, []);

  return (
    <div className="Results_graph graph">
      <canvas id="lineChart"></canvas>
    </div>
  );
};

export default Results_graph;
