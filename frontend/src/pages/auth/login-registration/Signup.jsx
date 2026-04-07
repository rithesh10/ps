import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUserPlus, FiEye, FiEyeOff } from "react-icons/fi";
import { API_ROUTES } from "../../../constants/api";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formdata, setFormData] = useState({
    name: "",
    section: "",
    phoneno: "",
    email: "",
    rollno: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    if (
      !formdata.name ||
      !formdata.section ||
      !formdata.phoneno ||
      !formdata.email ||
      !formdata.rollno ||
      !formdata.password
    ) {
      toast.warning("Please complete all fields before submitting.", {
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await axios.post(API_ROUTES.users.signup, formdata, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 1000,
      });

      setFormData({
        name: "",
        section: "",
        phoneno: "",
        email: "",
        rollno: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/student-login");
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        
        if (data.message) {
          toast.error(data.message, { autoClose: 3000 });
        }

        const newErrors = {};
        if (data.errors) {
          data.errors.forEach((msg) => {
            if (msg.includes("name")) newErrors.name = msg;
            else if (msg.includes("section")) newErrors.section = msg;
            else if (msg.includes("phone")) newErrors.phoneno = msg;
            else if (msg.includes("email")) newErrors.email = msg;
            else if (msg.includes("roll number")) newErrors.rollno = msg;
            else if (msg.includes("password")) newErrors.password = msg;
          });
        }
        setErrors(newErrors);
      } else {
        setGeneralError("Failed to register. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      <Nav />

      <div className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="animate-slide-up w-full max-w-lg">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <FiUserPlus size={24} />
            </div>

            <h2 className="text-center text-2xl font-bold text-slate-900">
              Student Registration
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500">
              Create an account to start your mental wellness journey.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formdata.name}
                    onChange={(e) =>
                      setFormData({ ...formdata, name: e.target.value })
                    }
                    required
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.name
                        ? "border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 bg-white focus:border-sky-400 focus:ring-sky-100"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs font-medium text-rose-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Rollno */}
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter roll number"
                    value={formdata.rollno}
                    onChange={(e) =>
                      setFormData({ ...formdata, rollno: e.target.value })
                    }
                    required
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.rollno
                        ? "border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 bg-white focus:border-sky-400 focus:ring-sky-100"
                    }`}
                  />
                  {errors.rollno && (
                    <p className="mt-1 text-xs font-medium text-rose-500">
                      {errors.rollno}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Section */}
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Section
                  </label>
                  <input
                    type="text"
                    placeholder="Enter section"
                    value={formdata.section}
                    onChange={(e) =>
                      setFormData({ ...formdata, section: e.target.value })
                    }
                    required
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.section
                        ? "border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 bg-white focus:border-sky-400 focus:ring-sky-100"
                    }`}
                  />
                  {errors.section && (
                    <p className="mt-1 text-xs font-medium text-rose-500">
                      {errors.section}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Mobile number"
                    value={formdata.phoneno}
                    onChange={(e) =>
                      setFormData({ ...formdata, phoneno: e.target.value })
                    }
                    required
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.phoneno
                        ? "border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 bg-white focus:border-sky-400 focus:ring-sky-100"
                    }`}
                  />
                  {errors.phoneno && (
                    <p className="mt-1 text-xs font-medium text-rose-500">
                      {errors.phoneno}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formdata.email}
                  onChange={(e) =>
                    setFormData({ ...formdata, email: e.target.value })
                  }
                  required
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                    errors.email
                      ? "border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 bg-white focus:border-sky-400 focus:ring-sky-100"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-medium text-rose-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formdata.password}
                    onChange={(e) =>
                      setFormData({ ...formdata, password: e.target.value })
                    }
                    required
                    className={`w-full rounded-xl border px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.password
                        ? "border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 bg-white focus:border-sky-400 focus:ring-sky-100"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-400">
                  Min 8 chars, including uppercase, lowercase, number, and symbol.
                </p>
                {errors.password && (
                  <p className="mt-1 text-xs font-medium text-rose-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* General Error */}
              {generalError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-600">
                  {generalError}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                >
                  Create Account
                </button>
              </div>

              <p className="pt-2 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/student-login"
                  className="font-semibold text-sky-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
