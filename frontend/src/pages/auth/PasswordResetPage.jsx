import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { API_ROUTES } from "../../constants/api";

const PasswordResetPage = () => {
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [err, seterr] = useState("");
  const [loading, setLoading] = useState(false);

  const Change_pass = async (e) => {
    e.preventDefault();
    seterr("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_ROUTES.users.resetPassword(id, token),
        { password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        navigate("/student-login");
        alert("Password reset successfully!");
      }
    } catch (error) {
      seterr(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 px-4">
      <div className="animate-slide-up w-full max-w-md">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <FiLock size={24} />
          </div>

          <h2 className="text-center text-2xl font-bold text-slate-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Enter your new password below.
          </p>

          <form onSubmit={Change_pass} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="new-password"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {err && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-600">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
            >
              {loading ? "Resetting…" : "Reset Password"}
              {!loading && <FiArrowRight size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
