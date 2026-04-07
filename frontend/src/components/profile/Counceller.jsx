import React from "react";
import { FaUserDoctor } from "react-icons/fa6";

const Counceller = () => {
  return (
    <div className="animate-fade-in w-[400px] rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
      {/* Header */}
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
          Professional Help
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Counsellor Support
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Connect with a licensed professional for guidance.
        </p>
      </div>

      {/* Card */}
      <a
        href="https://www.google.com/search?q=psychiatrist+near+me+for+depression+and+anxiety"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-sky-50 to-cyan-50 p-8 transition hover:border-sky-200 hover:shadow-md"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 transition group-hover:bg-sky-200 group-hover:text-sky-700">
          <FaUserDoctor size={40} />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            Find a Psychiatrist
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Search for licensed professionals near you
          </p>
        </div>
        <span className="rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-sky-700">
          Search Now →
        </span>
      </a>
    </div>
  );
};

export default Counceller;
