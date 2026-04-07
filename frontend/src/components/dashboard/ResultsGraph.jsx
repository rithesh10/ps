import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { API_ROUTES } from "../../constants/api";

let lineChart;

const ResultsGraph = () => {
  const chartRef = useRef(null);
  
  const [depression, setdepression] = useState([]);
  const [anxiety, setanxiety] = useState([]);
  const [stress, setstress] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("Access token not found");
          return;
        }

        const userRes = await axios.get(API_ROUTES.users.profile, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const user = userRes.data;

        const resultRes = await axios.get(API_ROUTES.result.all);
        const resultOfUser = resultRes.data.find(
          (item) => item.user === user.id
        );

        if (resultOfUser && resultOfUser.options) {
          const useroptions = resultOfUser.options;
          setdepression(useroptions.map((item) => item.Depression));
          setanxiety(useroptions.map((item) => item.Anxiety));
          setstress(useroptions.map((item) => item.Stress));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    
    const count = Math.max(depression.length, 10);
    const labels = Array.from({ length: count }, (_, i) => `Attempt ${i + 1}`);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Depression",
          data: depression,
          borderColor: "#0ea5e9", // sky-500
          backgroundColor: "#0ea5e920",
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: "#0ea5e9",
        },
        {
          label: "Anxiety",
          data: anxiety,
          borderColor: "#e11d48", // rose-600
          backgroundColor: "#e11d4820",
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: "#e11d48",
        },
        {
          label: "Stress",
          data: stress,
          borderColor: "#f59e0b", // amber-500
          backgroundColor: "#f59e0b20",
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: "#f59e0b",
        },
      ],
    };

    if (lineChart) {
      lineChart.destroy();
    }

    lineChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                family: "'Inter', sans-serif",
                size: 13,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleFont: { family: "'Inter', sans-serif", size: 13 },
            bodyFont: { family: "'Inter', sans-serif", size: 13 },
            padding: 12,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "'Inter', sans-serif" },
              color: "#64748b",
            },
            border: { display: false },
          },
          y: {
            min: 0,
            max: 4,
            grid: {
              color: "#f1f5f9",
            },
            ticks: {
              stepSize: 1,
              font: { family: "'Inter', sans-serif" },
              color: "#64748b",
              callback: function(value) {
                const labels = ["Normal", "Mild", "Moderate", "Severe", "Extreme"];
                return labels[value] || value;
              }
            },
            border: { display: false },
          },
        },
      },
    });

    return () => {
      if (lineChart) lineChart.destroy();
    };
  }, [depression, anxiety, stress]);

  return (
    <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
          Trend Analysis
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">
          Progress Graph
        </h3>
      </div>
      
      {error && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </div>
      )}

      <div className="w-full rounded-2xl bg-slate-50 p-4 pt-6 md:p-6 md:pt-8">
        <div className="relative h-[300px] w-full min-w-0 md:h-[380px]">
          <canvas ref={chartRef} className="h-full w-full"></canvas>
        </div>
      </div>
    </div>
  );
};

export default ResultsGraph;
