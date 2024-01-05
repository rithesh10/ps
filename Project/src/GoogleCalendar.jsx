import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const GoogleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Add any other logic you need when a date is clicked
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarGrid = () => {
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Adjust to start from Monday
    const totalDays = daysInMonth(selectedMonth, selectedYear);
    const currentDate = new Date();

    return Array.from({ length: 42 }, (_, index) => {
      const day = index - firstDayIndex + 1;
      const date = new Date(selectedYear, selectedMonth, day);
      const isCurrentDate = date.toDateString() === currentDate.toDateString();

      return (
        <div
          key={index}
          onClick={() => handleDateClick(date)}
          className={`CalendarDay ${
            day > 0 && day <= totalDays
              ? isCurrentDate
                ? "CurrentDay"
                : ""
              : "Inactive"
          }`}
        >
          {day > 0 && day <= totalDays ? (
            <div>
              <div
                className={`DayNumber ${
                  isCurrentDate ? "CurrentDayNumber" : ""
                }`}
              >
                {day}
              </div>
              {/* Add any additional content you want for each day */}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  return (
    <>
      <Sidebar/>
      <Navbar/>
      <div className="GoogleCalendar">
        <h2>Calendar</h2>
        <div className="CalendarControls">
          <select value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index}>
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange}>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index} value={selectedYear - 5 + index}>
                {selectedYear - 5 + index}
              </option>
            ))}
          </select>
        </div>
        <div className="Weekdays">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className="CalendarGrid">{generateCalendarGrid()}</div>
      </div>
    </>
  );
};

export default GoogleCalendar;
