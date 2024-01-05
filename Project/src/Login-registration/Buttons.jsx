import React from "react";
import { Link } from "react-router-dom";


const Buttons = () => {
  return (
    <div className="lgn-btns">
      <Link to="/student-login">
        Student Login
      </Link>
      <Link to="/teacher-login">
        Teacher Login
      </Link>
    </div>
  );
};

export default Buttons;
