import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

import AppModal from "../common/AppModal";
import ChangePassword from "../profile/ChangePassword";
import Sidebar from "./Sidebar";
import EditProfile from "../profile/EditProfile";
import useStudentProfile from "../../hooks/useStudentProfile";

const Navbar = () => {
  const [det_visible, setdet_Visible] = useState(false);
  const [menu_visible, setmenu_Visible] = useState(false);
  const { profile } = useStudentProfile();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const openChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    setdet_Visible(false);
  };

  const openmenu = () => {
    setmenu_Visible(!menu_visible);
  };

  const [profile_visible, setprofile_visible] = useState(false);

  const openprofile_edit = () => {
    setprofile_visible(!profile_visible);
    setdet_Visible(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6 lg:pl-[calc(min(20rem,24vw)+1.5rem)]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openmenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-600 lg:hidden"
          >
            <FiMenu size={18} />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
              Manas Health
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              <Link to="/dashboard">Dashboard</Link>
            </h1>
            <p className="hidden text-sm text-slate-500 md:block">
              Your activity, suggestions, and mental wellness summary in one
              place.
            </p>
          </div>
        </div>

        {/* Profile button */}
        <button
          type="button"
          onClick={() => setdet_Visible(true)}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-left shadow-sm transition hover:border-sky-300 hover:bg-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 text-sm font-bold text-white">
            {(profile.name || "U").charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {profile.name || "Student"}
            </p>
            <p className="text-xs text-slate-500">
              {profile.rollno || "Profile"}
            </p>
          </div>
        </button>
      </div>

      <Sidebar visible={menu_visible} onRequestClose={openmenu} />

      {/* Profile dropdown */}
      <AppModal
        isOpen={det_visible}
        onRequestClose={() => setdet_Visible(false)}
        contentStyle={{
          position: "fixed",
          top: "5rem",
          right: "1rem",
          left: "auto",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <div className="animate-fade-in w-72 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
          <div className="mb-5">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-xl font-bold text-white">
              {(profile.name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                {profile.name}
              </h3>
              <p className="text-sm text-slate-500">{profile.rollno}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="rounded-2xl bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
              onClick={openprofile_edit}
            >
              Edit Profile
            </button>
            <button
              className="flex items-center justify-between rounded-2xl bg-sky-600 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-sky-700"
              onClick={openChangePassword}
            >
              Change Password
              <IoIosArrowForward style={{ fontSize: "17px" }} />
            </button>
          </div>
        </div>
      </AppModal>

      {/* Change Password Modal */}
      <AppModal
        isOpen={showChangePassword}
        onRequestClose={openChangePassword}
        contentStyle={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ChangePassword
          isVisible={showChangePassword}
          closemodal={openChangePassword}
          roll={profile.rollno}
        />
      </AppModal>

      {/* Edit Profile Modal */}
      <AppModal
        isOpen={profile_visible}
        onRequestClose={openprofile_edit}
        contentStyle={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <EditProfile
          isVisible={profile_visible}
          close_profile={openprofile_edit}
          roll={profile.rollno}
          profile={profile}
        />
      </AppModal>
    </nav>
  );
};

export default Navbar;
