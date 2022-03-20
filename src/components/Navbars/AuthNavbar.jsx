import React from "react";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <>
      <div className="AuthNavbar">
        <Link to="/" className="logo-container">
          <span id="text">Chalo ATG</span>
          <span id="country-code-icon">IN</span>
        </Link>
      </div>
    </>
  );
};

export default AuthNavbar;

AuthNavbar.propTypes = {};
