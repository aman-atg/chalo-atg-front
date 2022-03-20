import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbars/Navbar";
import Sidebar from "../components/Navbars/Sidebar";
import { useSettingsActions } from "../hooks/useActions";

const DesktopContainer = ({ children, clx }) => {
  const { sidebarState } = useSelector((state) => state.setting);
  const { toggleSidebar } = useSettingsActions();

  const onMenuClick = () => {
    console.log("called");
    toggleSidebar();
  };

  console.log({ sidebarState });
  return (
    <>
      <Navbar onMenuClick={onMenuClick} />
      <Sidebar toggle={sidebarState.isOpen} onClose={onMenuClick} />
      <div className={`content ${clx}`}>{children}</div>
    </>
  );
};

export default DesktopContainer;

DesktopContainer.defaultProps = {
  clx: "",
};

DesktopContainer.propTypes = {
  children: PropTypes.node.isRequired,
  clx: PropTypes.string,
};
