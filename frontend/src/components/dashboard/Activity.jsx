import React from "react";
import { Link } from "react-router-dom";

const Activity = () => {
  return (
    <section className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
            Weekly Focus
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Your activity plan
          </h3>
        </div>
      </div>
      <div className="grid w-full gap-4 md:grid-cols-3 xl:grid-cols-1">
      <Link
        to="./assessment"
        className="group block w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 to-cyan-100 p-6 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
      >
        <div className="mb-4 inline-flex rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Check-in
        </div>
        <h4 className="text-xl font-semibold text-slate-900">Assessment</h4>
        <p className="mt-2 text-sm text-slate-600">
          Complete your screening and refresh your wellness insights.
        </p>
      </Link>
      <Link
        to="./yoga"
        className="group block w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-lime-100 p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
      >
        <div className="mb-4 inline-flex rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Movement
        </div>
        <h4 className="text-xl font-semibold text-slate-900">Yoga</h4>
        <p className="mt-2 text-sm text-slate-600">
          Follow posture routines designed to reduce stress and restore focus.
        </p>
      </Link>
      <Link
        to="./meditation"
        className="group block w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-amber-50 to-orange-100 p-6 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
      >
        <div className="mb-4 inline-flex rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          Recovery
        </div>
        <h4 className="text-xl font-semibold text-slate-900">Meditation</h4>
        <p className="mt-2 text-sm text-slate-600">
          Slow down with guided breathing and calming mindfulness practices.
        </p>
      </Link>
      </div>
    </section>
  );
};

export default Activity;
