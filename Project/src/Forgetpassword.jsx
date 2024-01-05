import React from "react";

const Forgetpassword = () => {
  return (
    <>
      <form className="Forget-password">
        <h2>Forget password</h2>
        <label className="details" htmlFor="S-Username">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="S-Username"
          placeholder="Enter your email"
          required
        />
        <button className="FP">Next</button>
      </form>
    </>
  );
};

export default Forgetpassword;
