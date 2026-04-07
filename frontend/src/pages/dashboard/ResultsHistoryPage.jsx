import React, { useMemo, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  CONDITION_LABELS,
  formatResultDate,
} from "../../constants/mentalHealth";
import useStudentResults from "../../hooks/useStudentResults";

const severityColor = (level) => {
  const map = {
    0: "bg-emerald-100 text-emerald-700",
    1: "bg-lime-100 text-lime-700",
    2: "bg-amber-100 text-amber-700",
    3: "bg-orange-100 text-orange-700",
    4: "bg-rose-100 text-rose-700",
  };
  return map[level] || map[0];
};

const ResultsHistoryPage = () => {
  const { options } = useStudentResults();
  const [selectedAttempt, setSelectedAttempt] = useState("");

  const attempts = useMemo(
    () =>
      options.map((item, index) => ({
        id: index + 1,
        date: formatResultDate(item.date),
        Depression: item.Depression,
        Anxiety: item.Anxiety,
        Stress: item.Stress,
      })),
    [options]
  );

  const selectedResult = useMemo(() => {
    if (!attempts.length) return null;
    const selectedId = Number(selectedAttempt || attempts.length);
    return attempts.find((item) => item.id === selectedId) || attempts.at(-1);
  }, [attempts, selectedAttempt]);

  const metrics = selectedResult
    ? [
        { label: "Depression", value: selectedResult.Depression },
        { label: "Anxiety", value: selectedResult.Anxiety },
        { label: "Stress", value: selectedResult.Stress },
      ]
    : [];

  return (
    <DashboardLayout>
      <div className="animate-fade-in mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
            History
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Assessment Results
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review your past wellness screenings.
          </p>
        </div>

        {/* Attempt selector */}
        <div className="mb-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Select Attempt
          </label>
          <select
            value={selectedAttempt || attempts.length || ""}
            onChange={(e) => setSelectedAttempt(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          >
            {attempts.map((attempt) => (
              <option key={attempt.id} value={attempt.id}>
                Attempt {attempt.id} — {attempt.date}
              </option>
            ))}
          </select>
        </div>

        {/* Results card */}
        {selectedResult ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Attempt {selectedResult.id || ""}
              </h3>
              <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                {selectedResult.date}
              </span>
            </div>

            <div className="space-y-3">
              {metrics.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {label}
                  </span>
                  <span
                    className={`rounded-xl px-4 py-1.5 text-xs font-bold ${severityColor(value)}`}
                  >
                    {CONDITION_LABELS[value]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-500">
              No assessment results found. Take your first assessment to see
              results here.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResultsHistoryPage;
