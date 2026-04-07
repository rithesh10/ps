import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const GoogleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarGrid = () => {
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
    const totalDays = daysInMonth(selectedMonth, selectedYear);
    const currentDate = new Date();

    return Array.from({ length: 42 }, (_, index) => {
      const day = index - firstDayIndex + 1;
      const date = new Date(selectedYear, selectedMonth, day);
      const isCurrentDate = date.toDateString() === currentDate.toDateString();
      const isActive = day > 0 && day <= totalDays;
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      return (
        <div
          key={index}
          onClick={() => isActive && handleDateClick(date)}
          className={`flex min-h-[48px] items-center justify-center rounded-xl text-sm font-medium transition-all ${
            !isActive
              ? "text-slate-300"
              : isCurrentDate
              ? "bg-sky-600 font-bold text-white shadow-md shadow-sky-200"
              : isSelected
              ? "bg-sky-100 font-semibold text-sky-700 ring-2 ring-sky-300"
              : "cursor-pointer text-slate-700 hover:bg-slate-100"
          }`}
        >
          {isActive ? day : ""}
        </div>
      );
    });
  };

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  return (
    <DashboardLayout>
      <div className="animate-fade-in mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
            Schedule
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Calendar</h2>
        </div>

        {/* Calendar card */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {/* Controls */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              {monthNames.map((name, index) => (
                <option key={index} value={index}>
                  {name}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index} value={selectedYear - 5 + index}>
                  {selectedYear - 5 + index}
                </option>
              ))}
            </select>
          </div>

          {/* Weekday headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarGrid()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GoogleCalendar;
