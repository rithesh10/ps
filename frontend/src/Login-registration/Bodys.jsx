import React, { useEffect } from "react";
import Buttons from "./Buttons";
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";

const Bodys = () => {
  return (
    <>
      <Nav />
      <div className="body-top">
        <div className="bodyleft">
          <h1 className="heading">Manas health care</h1>
          <p className="matter">
            "Understanding minds,Healing hearts: <br />
            Your Mental Health Mentor"
          </p>
        </div>
        <div className="bodyright">
          <h1>Manas health care</h1>
          <p>Project Manas Health stands as a beacon of innovation in addressing the mental health challenges faced by students returning to in-person schooling post-pandemic.</p>
          <Buttons />
        </div>
      </div>
    </>
  );
};

export default Bodys;
