import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { API_ROUTES } from "../../../constants/api";

const Login = ({ name }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({ rollno: "", password: "" });
  const [tchr_data, settchr_data] = useState({ username: "", password: "" });
  const [p, setp] = useState("");

  const stu_login = async (e) => {
    e.preventDefault();
    setp("");
    try {
      const response = await axios.post(API_ROUTES.users.login, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response?.data?.token) {
        localStorage.setItem("accessToken", response.data.token);
        toast.success("Login successful!", { autoClose: 1000 });
        navigate("/dashboard");
      } else {
        setp("No authentication token received.");
      }
    } catch (error) {
      setp("Invalid credentials. Please try again.");
    }
  };

  const tchr_login = async (e) => {
    e.preventDefault();
    setp("");
    try {
      const response = await axios.post(API_ROUTES.teacher.login, tchr_data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response?.data) {
        toast.success("Login successful!", { autoClose: 1000 });
        navigate("/tchr_dashboard");
      } else {
        setp("No authentication token received.");
      }
    } catch (error) {
      setp("Invalid credentials. Please try again.");
    }
  };

  const isStudent = name === "Student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      <Nav />

      <div className="flex min-h-screen items-center justify-center px-4 pt-16">
        <div className="animate-slide-up w-full max-w-md">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <FiLogIn size={24} />
            </div>

            <h2 className="text-center text-2xl font-bold text-slate-900">
              {name} Login
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500">
              {isStudent
                ? "Sign in with your roll number and password."
                : "Sign in with your username and password."}
            </p>

            <form
              onSubmit={isStudent ? stu_login : tchr_login}
              className="mt-8 space-y-5"
            >
              {/* Username/Rollno */}
              <div>
                <label
                  htmlFor="login-username"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  {isStudent ? "Roll Number" : "Username"}
                </label>
                <input
                  id="login-username"
                  type="text"
                  placeholder={
                    isStudent
                      ? "Enter your roll number"
                      : "Enter your username"
                  }
                  value={isStudent ? data.rollno : tchr_data.username}
                  onChange={
                    isStudent
                      ? (e) => setData({ ...data, rollno: e.target.value })
                      : (e) =>
                          settchr_data({
                            ...tchr_data,
                            username: e.target.value,
                          })
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={isStudent ? data.password : tchr_data.password}
                    onChange={
                      isStudent
                        ? (e) =>
                            setData({ ...data, password: e.target.value })
                        : (e) =>
                            settchr_data({
                              ...tchr_data,
                              password: e.target.value,
                            })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
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
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <Link
                  to="/Password-reset"
                  className="text-xs font-medium text-sky-600 hover:text-sky-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error */}
              {p && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-600">
                  {p}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                Sign In
              </button>

              {/* Sign up link */}
              {isStudent && (
                <p className="text-center text-sm text-slate-500">
                  New here?{" "}
                  <Link
                    to="/student-signup"
                    className="font-semibold text-sky-600 hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
