import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import AssessmentQuestion from "../../components/dashboard/AssessmentQuestion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  ASSESSMENT_OPTIONS,
  ASSESSMENT_SECTIONS,
} from "../../constants/assessment";
import { FLASK_ROUTES } from "../../constants/api";
import useStudentProfile from "../../hooks/useStudentProfile";

const buildSelectedOptionsPayload = (selectedOptions) => {
  return Object.entries(selectedOptions).reduce(
    (payload, [questionId, value]) => {
      payload[`selectedoptionselectedoption${questionId}`] = value;
      return payload;
    },
    {}
  );
};

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { profile } = useStudentProfile();
  const [examOver, setExamOver] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const questionCount = useMemo(
    () =>
      ASSESSMENT_SECTIONS.reduce(
        (count, section) => count + section.questions.length,
        0
      ),
    []
  );

  const userData = useMemo(
    () => ({
      name: profile.name,
      rollno: profile.rollno,
      phoneno: profile.phoneno,
      id: profile.id,
    }),
    [profile]
  );

  const handleOptionChange = (questionId, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(selectedOptions).length !== questionCount) return;

    try {
      const response = await fetch(FLASK_ROUTES.result, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userdata: userData,
          selectedOptions: buildSelectedOptionsPayload(selectedOptions),
        }),
      });

      await response.json();
      const today = new Date().toLocaleDateString();
      localStorage.setItem("lastExamDate", today);
      navigate("./result");
    } catch (error) {
      console.error("Error sending data to Flask:", error);
    }
  };

  const progress =
    questionCount > 0
      ? Math.round((Object.keys(selectedOptions).length / questionCount) * 100)
      : 0;

  return (
    <DashboardLayout>
      {/* Exam-already-taken modal */}
      <Modal
        isOpen={examOver}
        style={{
          content: {
            width: "440px",
            height: "fit-content",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            borderRadius: "1.5rem",
            padding: "2rem",
          },
        }}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
            📋
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Assessment Already Completed
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            You've already taken the assessment today.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Back to Dashboard
          </button>
        </div>
      </Modal>

      {/* Assessment form */}
      <div className="animate-slide-up mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
            Mental Health Check-In
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Wellness Assessment
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Answer honestly — your responses remain confidential.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Sections */}
        <form onSubmit={handleSubmit}>
          {ASSESSMENT_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <h2 className="mb-6 text-center text-lg font-bold text-slate-900">
                {section.title}
              </h2>
              <div className="space-y-5">
                {section.questions.map((question) => (
                  <AssessmentQuestion
                    key={question.id}
                    question={question}
                    options={ASSESSMENT_OPTIONS}
                    selectedValue={selectedOptions[question.id]}
                    onChange={handleOptionChange}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-4 pb-8">
            <button
              type="reset"
              onClick={() => setSelectedOptions({})}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Clear All
            </button>
            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
              disabled={Object.keys(selectedOptions).length !== questionCount}
            >
              Submit Assessment
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AssessmentPage;
