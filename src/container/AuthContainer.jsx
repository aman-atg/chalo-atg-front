import PropTypes from "prop-types";
import React from "react";

import AuthNavbar from "../components/Navbars/AuthNavbar";

const AuthContainer = ({ children }) => {
  return (
    <>
      <div className="authContainer">
        <AuthNavbar />
        <div className="authContent">{children}</div>
      </div>
    </>
  );
};

export default AuthContainer;

AuthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
