import React from "react";
import { IoIosCall } from "react-icons/io";
import { CiMail } from "react-icons/ci";

const ContactModal = () => {
  return (
    <div className="animate-fade-in w-[420px] rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
      {/* Header */}
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
          Support
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Get in Touch
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          We're here to help. Reach out via phone or email.
        </p>
      </div>

      {/* Contact cards */}
      <div className="space-y-4">
        {/* Phone */}
        <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-sky-50/50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <IoIosCall size={24} />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              By Phone
            </h3>
            <a
              href="tel:+917981991406"
              className="mt-1 block text-sm font-medium text-sky-600 hover:underline"
            >
              +91 798 199 1406
            </a>
            <a
              href="tel:+919182215237"
              className="mt-0.5 block text-sm font-medium text-sky-600 hover:underline"
            >
              +91 918 221 5237
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-sky-50/50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <CiMail size={24} />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              By Email
            </h3>
            <a
              href="mailto:22bd1a0565@gmail.com?subject=MANAS%20HEALTH"
              className="mt-1 block text-sm font-medium text-sky-600 hover:underline"
            >
              22bd1a0565@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
