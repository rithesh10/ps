import React, { useMemo, useState } from "react";
import Speedometer from "./Speedometer";
import useStudentResults from "../../hooks/useStudentResults";
import {
  calculateAverage,
  CONDITION_LABELS,
} from "../../constants/mentalHealth";

const MetricsPanel = () => {
  const { options, loading } = useStudentResults();
  const [isActive, setIsActive] = useState(true);

  const metrics = useMemo(() => {
    const depression = options.map((item) => item.Depression);
    const anxiety = options.map((item) => item.Anxiety);
    const stress = options.map((item) => item.Stress);
    const latest = options[options.length - 1] || {
      Depression: 0,
      Anxiety: 0,
      Stress: 0,
    };
    const average = {
      Depression: calculateAverage(depression),
      Anxiety: calculateAverage(anxiety),
      Stress: calculateAverage(stress),
    };

    return { latest, average };
  }, [options]);

  const activeMetrics = isActive ? metrics.latest : metrics.average;
  const overall =
    (activeMetrics.Depression + activeMetrics.Stress + activeMetrics.Anxiety) /
    3;

  return (
    <section className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
            Wellness Metrics
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Stress, anxiety, and depression snapshot
          </h3>
        </div>
        <div className="inline-flex rounded-2xl bg-slate-100 p-1">
          <button
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setIsActive(true)}
          >
            Latest
          </button>
          <button
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              !isActive
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setIsActive(false)}
          >
            Overall
          </button>
        </div>
      </div>
      <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <Speedometer prompt={activeMetrics.Depression} />
            <div className="mt-3 text-lg font-semibold text-slate-900">Depression</div>
            <div className="mt-1 text-sm text-slate-500">
              {!loading && isActive
                ? `is ${CONDITION_LABELS[activeMetrics.Depression]}`
                : ""}
            </div>
          </div>
          <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <Speedometer prompt={activeMetrics.Stress} />
            <div className="mt-3 text-lg font-semibold text-slate-900">Stress</div>
            <div className="mt-1 text-sm text-slate-500">
              {!loading && isActive
                ? `is ${CONDITION_LABELS[activeMetrics.Stress]}`
                : ""}
            </div>
          </div>
          <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <Speedometer prompt={activeMetrics.Anxiety} />
            <div className="mt-3 text-lg font-semibold text-slate-900">Anxiety</div>
            <div className="mt-1 text-sm text-slate-500">
              {!loading && isActive
                ? `is ${CONDITION_LABELS[activeMetrics.Anxiety]}`
                : ""}
            </div>
          </div>
          <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-900 p-5 text-white">
              <Speedometer prompt={overall} />
            <div className="mt-3 text-lg font-semibold">Average</div>
            <div className="mt-1 text-sm text-slate-300">
              Combined view of your latest wellness scores.
            </div>
          </div>
      </div>
    </section>
  );
};

export default MetricsPanel;
