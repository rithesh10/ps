import React from "react";
import { Link } from "react-router-dom";

const Activity = () => {
  return (
    <div className="Activity">
      <h3>Your weekly activity</h3>
      <Link to="./assessment" className="Activity-item">
        <div className="Activity-quiz"></div>
        Assessment
      </Link>
      <Link to="./yoga"  className="Activity-item">
        <div className="Activity-yoga"></div>
        Yoga
      </Link>
      <Link to="./meditation"  className="Activity-item">
        <div className="Activity-meditation"></div>
        Meditation
      </Link>
    </div>
  );
};

export default Activity;
