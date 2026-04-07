import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Meditation = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in mx-auto max-w-4xl">
        {/* Hero */}
        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-12 text-center text-white shadow-lg md:px-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-200">
            Mindfulness & Peace
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Meditation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-violet-100 md:text-lg">
            A practice of mindfulness — focusing the mind on a particular
            object, thought, or activity to train attention and awareness, and
            achieve a mentally clear and emotionally calm state.
          </p>
        </div>

        {/* Benefits section */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
              Why Meditate
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Benefits of Meditation
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "🧘",
                title: "Reduces Stress",
                desc: "Regular meditation decreases cortisol levels and promotes relaxation.",
              },
              {
                icon: "💤",
                title: "Improves Sleep",
                desc: "Calming the mind before rest leads to deeper, more restorative sleep.",
              },
              {
                icon: "🧠",
                title: "Mental Clarity",
                desc: "Meditation enhances focus, decision-making, and emotional regulation.",
              },
              {
                icon: "❤️",
                title: "Emotional Well-being",
                desc: "Develop a greater sense of awareness, self-compassion, and inner peace.",
              },
              {
                icon: "💪",
                title: "Boosts Immunity",
                desc: "Studies show meditation strengthens the body's immune response.",
              },
              {
                icon: "🌱",
                title: "Builds Resilience",
                desc: "Navigate life's challenges with a calm, grounded, and focused mind.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-violet-200 hover:bg-violet-50/50"
              >
                <div className="mb-3 text-2xl">{item.icon}</div>
                <h3 className="text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Meditation;
