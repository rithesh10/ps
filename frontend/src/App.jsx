import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./pages/auth/login-registration/Log_Reg.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bodys = lazy(() => import("./pages/auth/login-registration/Bodys.jsx"));
const Login = lazy(() => import("./pages/auth/login-registration/Login.jsx"));
const Signup = lazy(() => import("./pages/auth/login-registration/Signup.jsx"));
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage.jsx"));
const GoogleCalendarPage = lazy(() =>
  import("./pages/dashboard/GoogleCalendarPage.jsx")
);
const AssessmentPage = lazy(() =>
  import("./pages/dashboard/AssessmentPage.jsx")
);
const ForgetPasswordPage = lazy(() =>
  import("./pages/auth/ForgetPasswordPage.jsx")
);
const MeditationPage = lazy(() =>
  import("./pages/wellness/MeditationPage.jsx")
);
const YogaPage = lazy(() => import("./pages/wellness/YogaPage.jsx"));
const PasswordResetPage = lazy(() =>
  import("./pages/auth/PasswordResetPage.jsx")
);
const ResultsPage = lazy(() => import("./pages/dashboard/ResultsPage.jsx"));
const ResultsHistoryPage = lazy(() =>
  import("./pages/dashboard/ResultsHistoryPage.jsx")
);
const TeacherDashboardPage = lazy(() =>
  import("./pages/dashboard/TeacherDashboardPage.jsx")
);
const WorkingPage = lazy(() => import("./pages/info/WorkingPage.jsx"));
const AboutPage = lazy(() => import("./pages/info/AboutPage.jsx"));


const App = () => {
  return (
    <div className="min-h-screen font-sans text-slate-900 antialiased bg-slate-50">
      <Suspense fallback={<div className="page-loader">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Bodys />} />
          <Route path="/student-login" element={<Login name="Student" />} />
          <Route path="/teacher-login" element={<Login name="Teacher" />} />
          <Route path="/student-signup" element={<Signup />} />

          <Route path="/dashboard/assessment" element={<AssessmentPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/calendar" element={<GoogleCalendarPage />} />
          <Route path="/Pasword-reset" element={<ForgetPasswordPage />} />
          <Route path="/dashboard/meditation" element={<MeditationPage />} />
          <Route path="/dashboard/yoga" element={<YogaPage />} />

          <Route path="/Password-reset" element={<ForgetPasswordPage />} />
          <Route
            path="/reset-password/:id/:token"
            element={<PasswordResetPage />}
          />
          <Route path="/dashboard/assessment/result" element={<ResultsPage />} />
          <Route
            path="/dashboard/result-history"
            element={<ResultsHistoryPage />}
          />
          <Route path="/tchr_dashboard" element={<TeacherDashboardPage />} />
          <Route path="/working" element={<WorkingPage />} />
          <Route path="/aboutus" element={<AboutPage />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </div>
  );
};

export default App;
