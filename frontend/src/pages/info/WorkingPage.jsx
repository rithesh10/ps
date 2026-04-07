import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Working = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 px-4">
      <div className="animate-slide-up text-center">
        <div className="mx-auto mb-6 text-6xl">🚧</div>
        <h1 className="text-3xl font-bold text-slate-900">
          Under Construction
        </h1>
        <p className="mt-3 text-base text-slate-500">
          We're working on this page. Check back soon!
        </p>
        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          <FiArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Working;
