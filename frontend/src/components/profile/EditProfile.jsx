import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import { FiEdit3, FiSave } from "react-icons/fi";
import { updateStudentProfile } from "../../services/student";

const EditProfile = ({ isVisible, close_profile, roll, profile }) => {
  const [formdata, setFormData] = useState({
    name: "",
    section: "",
    phoneno: "",
    email: "",
    rollno: "",
  });

  useEffect(() => {
    setFormData({
      name: profile?.name || "",
      section: profile?.section || "",
      phoneno: profile?.phoneno || "",
      email: profile?.email || "",
      rollno: profile?.rollno || "",
    });
  }, [profile]);

  const [edit, setedit] = useState(false);
  const [errors, setErrors] = useState({});

  const enable_edit = (e) => {
    e.preventDefault();
    setedit(!edit);
  };

  const submit_edit = async (e) => {
    e.preventDefault();
    if (
      profile.name === formdata.name &&
      profile.email === formdata.email &&
      profile.phoneno === formdata.phoneno &&
      profile.section === formdata.section
    ) {
      toast.info("No changes detected.", { autoClose: 2000 });
      return;
    }

    if (
      !formdata.name || !formdata.section ||
      !formdata.phoneno || !formdata.email || !formdata.rollno
    ) {
      toast.warning("Please complete all fields before submitting.", { autoClose: 2500 });
      return;
    }

    try {
      await updateStudentProfile(formdata);
      setErrors({});
      toast.success("Profile updated successfully!", { autoClose: 2000 });
      setTimeout(() => window.location.reload(), 2500);
    } catch (error) {
      if (error.response?.status === 400) {
        const errs = {};
        (error.response.data.errors || []).forEach((msg) => {
          if (msg === "Invalid name") errs.name = msg;
          else if (msg === "Invalid section") errs.section = msg;
          else if (msg === "Invalid phone number") errs.phoneno = msg;
          else if (msg === "Invalid email") errs.email = msg;
          else if (msg === "Invalid roll number") errs.rollno = msg;
        });
        setErrors(errs);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Enter your name", readOnly: !edit },
    { key: "section", label: "Section", type: "text", placeholder: "Enter your section", readOnly: !edit },
    { key: "phoneno", label: "Phone Number", type: "text", placeholder: "Enter phone number", readOnly: !edit },
    { key: "email", label: "Email Address", type: "email", placeholder: "Enter your email", readOnly: !edit },
    { key: "rollno", label: "Roll Number", type: "text", placeholder: "Roll number", readOnly: true },
  ];

  return (
    <div className="animate-fade-in w-[380px] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
            Account
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Edit Profile</h2>
        </div>
        <button
          onClick={close_profile}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <IoClose size={20} />
        </button>
      </div>

      {/* Avatar */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-2xl font-bold text-white shadow-lg">
          {(formdata.name || "U").charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={submit_edit} className="space-y-4">
        {fields.map(({ key, label, type, placeholder, readOnly }) => (
          <div key={key}>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              readOnly={readOnly}
              value={formdata[key]}
              onChange={(e) => setFormData({ ...formdata, [key]: e.target.value })}
              required
              className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 outline-none transition ${
                readOnly
                  ? "cursor-default border-slate-100 bg-slate-50 text-slate-500"
                  : "border-slate-200 bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              }`}
            />
            {errors[key] && (
              <p className="mt-1 text-xs font-medium text-rose-500">{errors[key]}</p>
            )}
          </div>
        ))}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={enable_edit}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
              edit
                ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                : "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
            }`}
          >
            <FiEdit3 size={15} />
            {edit ? "Lock Fields" : "Enable Edit"}
          </button>
          <button
            type="submit"
            disabled={!edit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiSave size={15} />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
