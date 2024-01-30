import React from "react";
import { Link } from "react-router-dom";

const Working = () => {
  return (
    <>
      <div className="working">
        <h1 className="work-prog">We are working on it.</h1>
        <div className="working-img"></div>
        <Link to="/dashboard">{"<--"} Go back</Link>
      </div>
    </>
  );
};

export default Working;
