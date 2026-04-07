import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../constants/api";

const Results = () => {
  const navigate = useNavigate();

  const [depressionValue, setdp] = useState(0);
  const [stressValue, setsv] = useState(0);
  const [anxietyValue, setav] = useState(0);

  const [error, setError] = useState(null);

  useEffect(() => {
    const userresult = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) { setError("Access token not found"); return; }

        const userRes = await axios.get(API_ROUTES.users.profile, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const resultRes = await axios.get(API_ROUTES.result.all);
        const user = userRes.data;
        const resultOfUser = resultRes.data.find((item) => item.user === user.id);
        const useroptions = resultOfUser.options;
        const latest = useroptions[useroptions.length - 1];

        setdp(latest["Depression"]);
        setav(latest["Anxiety"]);
        setsv(latest["Stress"]);
      } catch (err) {
        console.error(err);
      }
    };
    userresult();
  }, []);

  const condition = ["Normal", "Mild", "Moderate", "Severe", "Extremely Severe"];

  const getColor = (val) => {
    const colors = [
      "from-emerald-400 to-emerald-500",
      "from-lime-400 to-yellow-400",
      "from-amber-400 to-orange-400",
      "from-orange-500 to-red-500",
      "from-red-600 to-rose-700",
    ];
    return colors[val] || colors[0];
  };

  const metrics = [
    { label: "Depression", value: depressionValue },
    { label: "Anxiety", value: anxietyValue },
    { label: "Stress", value: stressValue },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="animate-slide-up w-full max-w-lg">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-lg md:p-10">
          {/* Header */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/20 text-3xl">
            📊
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-400">
            Assessment Complete
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Your Results</h1>

          {/* Metric cards */}
          <div className="mt-8 space-y-4">
            {metrics.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4"
              >
                <span className="text-sm font-medium text-slate-300">
                  {label}
                </span>
                <span
                  className={`rounded-xl bg-gradient-to-r ${getColor(value)} px-4 py-1.5 text-xs font-bold text-white shadow-sm`}
                >
                  {condition[value]}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 w-full rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-500"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
