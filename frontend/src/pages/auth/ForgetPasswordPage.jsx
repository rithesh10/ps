import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { API_ROUTES } from "../../constants/api";

const ForgetPasswordPage = () => {
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const [invalid, setinvalid] = useState("");
  const [loading, setLoading] = useState(false);

  const Change_pass = async (e) => {
    e.preventDefault();
    setinvalid("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_ROUTES.users.forgotPassword,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        navigate("/");
        alert("Password reset link sent to your email.");
      }
    } catch (error) {
      setinvalid("No account found with this email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 px-4">
      <div className="animate-slide-up w-full max-w-md">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <FiMail size={24} />
          </div>

          <h2 className="text-center text-2xl font-bold text-slate-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Enter your email and we'll send you a reset link.
          </p>

          <form onSubmit={Change_pass} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="reset-email"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            {invalid && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-600">
                {invalid}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Reset Link"}
              {!loading && <FiArrowRight size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
