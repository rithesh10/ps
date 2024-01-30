import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Nav from "./Nav";

const Bodys = () => {
  const [close, setclose] = useState(false);
  useEffect(() => {
    setclose(true);
  }, []);
  return (
    <>
      <Nav />
      <div className="body-top">
        <div className={`bodyleft ${close ? "open-bl" : "close-bl"}`}>
          <h1 className="heading">Manas health care</h1>
          <p className="matter">
            "Understanding minds,Healing hearts: <br />
            Your Mental Health Mentor"
          </p>
        </div>
        <div className={`bodyright ${close ? "open-br" : "close-br"}`}>
          <h1>Manas health care</h1>
          <p>
            Project Manas Health stands as a beacon of innovation in addressing
            the mental health challenges faced by students returning to
            in-person schooling post-pandemic.
          </p>
          {/* <div onClick={()=>setclose(false)}> */}
            <Buttons />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Bodys;
