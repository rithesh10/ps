import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const asanas = [
  {
    name: "Garudasana",
    alt: "Eagle Pose",
    desc: "Helps stop anxiety attacks by improving focus. It requires steady breathing while balancing the body.",
    color: "from-sky-50 to-cyan-100",
    accent: "text-sky-700",
    border: "hover:border-sky-300",
  },
  {
    name: "Natarajasana",
    alt: "Dancer's Pose",
    desc: "Great for balancing mood and beneficial for those dealing with anxiety and depression.",
    color: "from-rose-50 to-pink-100",
    accent: "text-rose-700",
    border: "hover:border-rose-300",
  },
  {
    name: "Vriksasana",
    alt: "Tree Pose",
    desc: "Brings balance to mind and body. Improves self-awareness and mindfulness.",
    color: "from-emerald-50 to-lime-100",
    accent: "text-emerald-700",
    border: "hover:border-emerald-300",
  },
  {
    name: "Padmasana",
    alt: "Lotus Pose",
    desc: "Aids digestion, strengthens the spine, and promotes a calm, focused mind.",
    color: "from-violet-50 to-purple-100",
    accent: "text-violet-700",
    border: "hover:border-violet-300",
  },
  {
    name: "Virabhadrasana",
    alt: "Warrior Pose",
    desc: "Builds strength and stamina while requiring steady and focused breathing.",
    color: "from-amber-50 to-orange-100",
    accent: "text-amber-700",
    border: "hover:border-amber-300",
  },
  {
    name: "Savasana",
    alt: "Corpse Pose",
    desc: "One of the most relaxing poses — similar to lying down for deep rest and recovery.",
    color: "from-slate-50 to-slate-100",
    accent: "text-slate-700",
    border: "hover:border-slate-300",
  },
  {
    name: "Vajrasana",
    alt: "Diamond Pose",
    desc: "A simple yet effective sitting pose. The name derives from the Sanskrit word meaning thunderbolt.",
    color: "from-teal-50 to-cyan-100",
    accent: "text-teal-700",
    border: "hover:border-teal-300",
  },
  {
    name: "Chakrasana",
    alt: "Wheel Pose",
    desc: "Known as the circle pose — effectively improves calmness, focus, and spinal flexibility.",
    color: "from-fuchsia-50 to-pink-100",
    accent: "text-fuchsia-700",
    border: "hover:border-fuchsia-300",
  },
];

const Yoga = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in mx-auto max-w-6xl">
        {/* Hero */}
        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 px-8 py-12 text-center text-white shadow-lg md:px-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100">
            Movement & Balance
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Yoga Asanas
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-50 md:text-lg">
            Explore postures designed to reduce stress, restore focus, and
            strengthen the mind-body connection.
          </p>
        </div>

        {/* Asana grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {asanas.map((asana) => (
            <div
              key={asana.name}
              className={`group rounded-3xl border border-slate-200 bg-gradient-to-br ${asana.color} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${asana.border}`}
            >
              <div className="mb-4 inline-flex rounded-2xl bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {asana.alt}
              </div>
              <h3
                className={`text-lg font-bold ${asana.accent}`}
              >
                {asana.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {asana.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Yoga;
