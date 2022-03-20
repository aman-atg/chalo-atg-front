import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ path, leftIcon, rightIcon, text, onClick }) => {
  const content = (
    <>
      {leftIcon && <span className="leftIcon">{leftIcon}</span>}
      <span className="text">{text}</span>
      {rightIcon && <span className="rightIcon">{rightIcon}</span>}
    </>
  );
  return !onClick ? (
    <NavLink exact to={path} className="SidebarItem">
      {content}
    </NavLink>
  ) : (
    <button className="SidebarItem" onClick={onClick}>
      {content}
    </button>
  );
};

export default SidebarItem;

SidebarItem.defaultProps = {
  path: "/",
  leftIcon: null,
  rightIcon: null,
  onClick: null,
};

SidebarItem.propTypes = {
  path: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
