import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ROUTES } from "../../constants/api";

const TeacherDashboardPage = () => {
  const condition = ["Normal", "Moderate", "Mild", "Severe", "Extremely Severe"];

  const [result, setResult] = useState([]);
  const [students, setstudents] = useState([]);
  const [suggestion, setsuggestion] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [suggestion_visible, setsuggestion_visible] = useState(false);
  const [stu_name, setstu_name] = useState("");
  const [stu_condition, setstu_condition] = useState(false);
  const [conditionData, setConditionData] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(API_ROUTES.result.all);
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    fetchResult();
  }, []);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(API_ROUTES.teacher.students, {
          headers: { "Content-Type": "application/json" },
        });
        if (response?.data) setstudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getdata();
  }, []);

  const open_suggestion = (item) => {
    setSelectedStudent(item);
    setsuggestion_visible(true);
  };

  const open_condition = (name) => {
    setstu_name(name);
    setConditionData(null);

    const found = result.find((item) => item.name === name);
    if (found?.options?.length) {
      const latest = found.options[found.options.length - 1];
      const newdate = new Date(latest.date).toISOString().split("T")[0];
      setConditionData({
        date: newdate,
        depression: condition[latest.Depression],
        anxiety: condition[latest.Anxiety],
        stress: condition[latest.Stress],
      });
    }
    setstu_condition(true);
  };

  const submitSuggestion = async () => {
    try {
      await axios.post(API_ROUTES.teacher.suggestion, {
        name: selectedStudent.name,
        suggestion: suggestion,
        id: selectedStudent._id,
      });
      setsuggestion_visible(false);
      setsuggestion("");
      toast.success("Suggestion submitted successfully!", { autoClose: 1500 });
    } catch (error) {
      console.error("Error submitting suggestion:", error);
    }
  };

  const modalStyle = {
    content: {
      width: "min(480px, 90vw)",
      height: "fit-content",
      overflow: "hidden",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "1.5rem",
      padding: "0",
    },
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
            Manas Health
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Teacher Dashboard
          </h1>
        </div>
        <Link
          to="/teacher-login"
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Logout
        </Link>
      </nav>

      {/* Student list */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
            Overview
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Students ({students.length})
          </h2>
        </div>

        <div className="space-y-3">
          {students.map((item) => (
            <div
              key={item._id || item.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition hover:border-sky-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sm font-bold text-sky-700">
                  {(item.name || "S").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">{item.rollno}</p>
                </div>
              </div>
              <p className="text-sm text-slate-500">{item.phoneno}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => open_condition(item.name)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                >
                  Condition
                </button>
                <button
                  onClick={() => open_suggestion(item)}
                  className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-700"
                >
                  Suggestion
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Condition Modal */}
      <Modal
        isOpen={stu_condition}
        onRequestClose={() => setstu_condition(false)}
        style={modalStyle}
      >
        <div className="p-6 md:p-8">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">{stu_name}</h3>
            <button
              onClick={() => setstu_condition(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <IoClose size={18} />
            </button>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            Latest Condition
          </p>

          {conditionData ? (
            <div className="mt-5 space-y-3">
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Date:</span>{" "}
                {conditionData.date}
              </div>
              {[
                { label: "Depression", val: conditionData.depression },
                { label: "Anxiety", val: conditionData.anxiety },
                { label: "Stress", val: conditionData.stress },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-slate-700">{label}</span>
                  <span className="font-semibold text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              No recent results found for this student.
            </p>
          )}
        </div>
      </Modal>

      {/* Suggestion Modal */}
      <Modal
        isOpen={suggestion_visible}
        onRequestClose={() => setsuggestion_visible(false)}
        style={modalStyle}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitSuggestion();
          }}
          className="p-6 md:p-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                Feedback
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                Suggestion for {selectedStudent?.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setsuggestion_visible(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <IoClose size={18} />
            </button>
          </div>

          <textarea
            value={suggestion}
            onChange={(e) => setsuggestion(e.target.value)}
            placeholder="Write your suggestion here…"
            rows={8}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Submit Suggestion
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherDashboardPage;
