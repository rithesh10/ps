import React from "react";
import Buttons from "./Buttons";
import Nav from "./Nav";

const Bodys = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Nav />

      {/* Hero Section */}
      <div className="flex min-h-screen items-center justify-center px-4 pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left - Text */}
          <div className="animate-fade-in text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
              Mental Health Platform
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
              Manas
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                Health Care
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 md:text-lg">
              Understanding minds, healing hearts — your mental health mentor.
              Personalized support, tracking, and guided mental wellness resources.
            </p>
            <div className="mt-8">
              <Buttons />
            </div>
          </div>

          {/* Right - Card */}
          <div className="animate-slide-up hidden lg:block">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <div className="space-y-6">
                {[
                  {
                    icon: "🧠",
                    title: "Self-Assessment",
                    desc: "Track depression, anxiety, and stress with validated screening tools.",
                  },
                  {
                    icon: "📊",
                    title: "Progress Tracking",
                    desc: "Visualize your mental wellness journey with detailed charts.",
                  },
                  {
                    icon: "🧘",
                    title: "Wellness Activities",
                    desc: "Explore yoga, meditation, and mindfulness exercises.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                  >
                    <span className="mt-0.5 text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bodys;
