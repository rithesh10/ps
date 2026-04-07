import React from "react";

const Aboutus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      {/* Hero */}
      <section className="px-4 py-20 text-center md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
          About Us
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Cultivating Mental Health &amp; Flourishing Well-being
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 md:text-lg">
          Mental health matters. It's the foundation for our emotional,
          psychological, and social well-being — impacting everything from how
          we think and feel to how we connect with others.
        </p>
      </section>

      {/* Mission section */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
              Our Mission
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Making Mental Wellness Accessible
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: "🎯",
                title: "Evidence-Based Tools",
                desc: "Access guided meditations, mindfulness exercises, mood trackers, and curated resources to manage stress and boost well-being.",
              },
              {
                icon: "🤝",
                title: "Community Support",
                desc: "Connect with a supportive community where you can share experiences, offer encouragement, and grow together.",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                desc: "Your data stays private. We follow strict privacy guidelines to ensure your mental health journey is safe and confidential.",
              },
              {
                icon: "📊",
                title: "Track Progress",
                desc: "Monitor your wellness trends over time with visual insights, giving you clarity on your emotional patterns.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition hover:border-sky-200 hover:bg-sky-50/50"
              >
                <div className="mb-3 text-3xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 p-8 text-white shadow-lg md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
            Our Promise
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            We believe everyone deserves access to quality mental healthcare.
          </h2>
          <p className="mt-4 max-w-3xl text-base text-sky-50 md:text-lg">
            Manas Health was created to break the stigma surrounding mental
            health. We are a passionate team of developers, designers, and
            advocates working to build a future where mental wellness is openly
            discussed, understood, and supported.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
