import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import AppModal from "../common/AppModal";
import ContactModal from "../profile/ContactModal";
import Counceller from "../profile/Counceller";
import useStudentProfile from "../../hooks/useStudentProfile";
import { fetchSuggestions } from "../../services/student";

const Sidebar = ({ visible, onRequestClose }) => {
  const [suggestion, setsuggestion] = useState([]);
  const { profile } = useStudentProfile();

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const response = await fetchSuggestions();
        setsuggestion(response || []);
      } catch (error) {
        console.error(
          "Error while fetching the suggestions given by teacher",
          error
        );
      }
    };

    loadSuggestions();
  }, []);

  const latestSuggestion = useMemo(() => {
    if (!profile.name || !suggestion.length) {
      return null;
    }

    const suggestionOfUser = suggestion.find(
      (item) => item.username === profile.name
    );

    if (!suggestionOfUser?.suggestion?.length) {
      return null;
    }

    return suggestionOfUser.suggestion.at(-1);
  }, [profile.name, suggestion]);

  const [contact_visible, setcontact_visible] = useState(false);
  const [counsellor_visible, setcounsellor_visible] = useState(false);
  const [suggestion_visible, setsuggestion_visible] = useState(false);

  const logout = () => {
    localStorage.removeItem("accessToken");
  };
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 transition lg:hidden ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onRequestClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white px-6 py-8 shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "min(20rem, 24vw)" }}
      >
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
          Wellness Platform
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Manas Health</h1>
        <p className="mt-2 text-sm text-slate-500">
          Personalized support, tracking, and guided mental wellness resources.
        </p>
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            General
          </h2>
          <ul className="space-y-2">
        <Link to="/dashboard">
          <li className="rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700">Home</li>
        </Link>
        <Link to="/dashboard/calendar">
          <li className="rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700">Calendar</li>
        </Link>
        <Link to="/dashboard/result-history">
          <li className="rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700">Results</li>
        </Link>
        <li
          className="cursor-pointer rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
          onClick={() => setsuggestion_visible(true)}
        >
          Suggestions
        </li>
        <AppModal
          isOpen={suggestion_visible}
          onRequestClose={() => setsuggestion_visible(false)}
          contentStyle={{
            width: "fit-content",
            height: "fit-content",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)",
            padding: "20px",
            margin: "0",
          }}
        >
          {latestSuggestion || "No suggestion available yet"}
        </AppModal>
        <li
          className="cursor-pointer rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
          onClick={() => setcounsellor_visible(true)}
        >
          Counsellor
        </li>
        <AppModal
          isOpen={counsellor_visible}
          onRequestClose={() => setcounsellor_visible(false)}
          contentStyle={{
            width: "fit-content",
            height: "fit-content",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)",
            padding: "0",
            margin: "0",
          }}
        >
          <Counceller />
        </AppModal>
          </ul>
        </div>
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Tools
        </h2>
      <ul className="space-y-2">
        <li
          className="cursor-pointer rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
          onClick={() => setcontact_visible(!contact_visible)}
        >
          Contact us
        </li>
        <AppModal
          isOpen={contact_visible}
          onRequestClose={() => setcontact_visible(false)}
          contentStyle={{
            width: "fit-content",
            height: "fit-content",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)",
            padding: "0",
            margin: "0",
          }}
        >
          <ContactModal />
        </AppModal>
        <Link to="/student-login" onClick={logout}>
          <li className="flex items-center gap-2 rounded-2xl px-4 py-3 font-medium text-rose-600 transition hover:bg-rose-50">
            <CiLogout style={{ fontSize: "17px" }} />
            Logout
          </li>
        </Link>
      </ul>
      </div>
      </div>
      <div className="mt-auto rounded-3xl bg-slate-900 p-4 text-white">
        <p className="text-sm font-semibold">Welcome back</p>
        <p className="mt-1 text-lg font-bold">{profile.name || "Student"}</p>
        <p className="mt-1 text-xs text-slate-300">
          Keep tracking your progress and stay consistent.
        </p>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
