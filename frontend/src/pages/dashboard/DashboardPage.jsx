import React from "react";

import ResultsGraph from "../../components/dashboard/ResultsGraph";
import Activity from "../../components/dashboard/Activity";
import MetricsPanel from "../../components/dashboard/MetricsPanel";
import DashboardLayout from "../../components/layout/DashboardLayout";

const DashboardPage = () => {
  return (
    <DashboardLayout showFooter>
      <div className="w-full space-y-8">
        {/* Hero banner */}
        <section className="animate-fade-in w-full rounded-[2rem] border border-slate-200 bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 px-6 py-6 text-white shadow-lg md:px-8 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">
            Student Wellness Hub
          </p>
          <h2 className="mt-2 max-w-4xl text-2xl font-bold leading-tight md:text-3xl">
            Track your emotional patterns and take action before stress builds up.
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-sky-50 md:text-base">
            Review your assessment history, explore self-care activities, and stay aligned with your routine from one dashboard.
          </p>
        </section>

        {/* Graph + Activity */}
        <div className="grid w-full gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="min-w-0">
            <ResultsGraph />
          </div>
          <div className="min-w-0">
            <Activity />
          </div>
        </div>

        {/* Metrics */}
        <MetricsPanel />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
