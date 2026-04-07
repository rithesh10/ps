import React from "react";
import { Link } from "react-router-dom";
import { FiUserCheck, FiUsers } from "react-icons/fi";

const Buttons = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        to="/student-login"
        className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-500 hover:shadow-lg"
      >
        <FiUserCheck size={18} />
        Student Login
      </Link>
      <Link
        to="/teacher-login"
        className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
      >
        <FiUsers size={18} />
        Teacher Login
      </Link>
    </div>
  );
};

export default Buttons;
