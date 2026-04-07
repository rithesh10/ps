import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { API_ROUTES } from "../../constants/api";

const ChangePassword = ({ isVisible, closemodal, roll }) => {
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [data, setData] = useState({
    rollno: roll,
    password: "",
    newpassword: "",
    confirmpassword: "",
  });

  const [err, seterr] = useState("");

  const click = async (e) => {
    e.preventDefault();
    seterr("");

    if (data.newpassword !== data.confirmpassword) {
      seterr("New password and confirmation do not match.");
      return;
    }

    try {
      await axios.post(API_ROUTES.users.changePassword, data, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Password changed successfully! Please log in again.");
      setData({ rollno: "", password: "", newpassword: "", confirmpassword: "" });
      navigate("/student-login");
    } catch (error) {
      if (error.response?.status === 400) {
        seterr(error.response.data.error || "Invalid request.");
      } else {
        seterr("Something went wrong. Please try again.");
      }
    }
  };

  if (!isVisible) return null;

  const PasswordField = ({ label, id, value, onChange, show, toggleShow, placeholder }) => (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in w-[380px] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">Security</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Change Password</h2>
        </div>
        <button
          onClick={closemodal}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <IoClose size={20} />
        </button>
      </div>

      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
          <FiLock size={24} />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={click} className="space-y-4">
        <input type="hidden" name="rollno" value={data.rollno} />

        <PasswordField
          label="Current Password"
          id="current-password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          show={showCurrent}
          toggleShow={() => setShowCurrent(!showCurrent)}
          placeholder="Enter current password"
        />
        <PasswordField
          label="New Password"
          id="new-password"
          value={data.newpassword}
          onChange={(e) => setData({ ...data, newpassword: e.target.value })}
          show={showNew}
          toggleShow={() => setShowNew(!showNew)}
          placeholder="Enter new password"
        />
        <PasswordField
          label="Confirm New Password"
          id="confirm-password"
          value={data.confirmpassword}
          onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
          show={showConfirm}
          toggleShow={() => setShowConfirm(!showConfirm)}
          placeholder="Re-enter new password"
        />

        {err && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-600">
            {err}
          </div>
        )}

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
