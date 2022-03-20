import AddRoadIcon from "@mui/icons-material/AddRoad";
import HomeIcon from "@mui/icons-material/Home";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { useUserActions } from "../../hooks/useActions";
import useCloseOnOutside from "../../hooks/useCloseOnOutside";
import { selectCurrentUser } from "../../redux/selectors";
import CONST from "../../shared/CONST";
import { ReactComponent as HamIcon } from "./../../assets/icons/hamburger.svg";
import MiniSidebar from "./MiniSidebar";
import SidebarItem from "./SidebarItem";

const primaryList = [
  {
    path: "/",
    leftIcon: <HomeIcon />,
    text: "Home",
  },

  {
    path: "/tickets",
    leftIcon: <LocalActivityIcon />,
    text: "Your tickets / passes",
  },

  {
    path: "/favorites",
    leftIcon: <StarIcon />,
    text: "Favorites",
  },
];

const secondaryList = [
  {
    path: "/addNewRoute",
    leftIcon: <AddRoadIcon />,
    text: "Add Route",
  },
  {
    path: "/busMap",
    leftIcon: <MapIcon />,
    text: "Bus Map",
  },
];

const Sidebar = ({ toggle, onClose }) => {
  const { innerWidth: width } = window;
  const sidebarRef = useRef();
  const user = useSelector(selectCurrentUser, shallowEqual);

  const { logout } = useUserActions();

  useCloseOnOutside(sidebarRef, () => {
    if (width < CONST.BREAKPOINTS.MOBILE) {
      onClose();
    }
  });

  const tertiaryList = [
    {
      path: "/settings",
      leftIcon: <SettingsIcon />,
      text: "Settings",
    },
  ];

  if (user) {
    tertiaryList.push({
      onClick: logout,
      leftIcon: <LogoutIcon />,
      text: "Logout",
    });
  } else {
    tertiaryList.push({
      path: "/Join",
      leftIcon: <LoginIcon />,
      text: "Login",
    });
  }

  return (
    <>
      <AnimatePresence>
        {toggle && (
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: "-20vw" }}
            transition={{
              ease: "easeOut",
              duration: width < 1190 ? 0.2 : 0,
            }}
            exit={{ x: "-20vw" }}
            className="Sidebar"
            ref={sidebarRef}
          >
            <div className="Sidebar_header">
              <span className="ham">
                <HamIcon onClick={onClose} />
              </span>
              <NavLink to="/" className="logo-container">
                <span id="text">Chalo ATG</span>
                <span id="country-code-icon">IN</span>
              </NavLink>
            </div>

            <div className="SidebarList SL-One">
              {primaryList.map((item, index) => (
                <SidebarItem {...item} key={index} />
              ))}
            </div>

            <div className="SidebarList SL-Two">
              {secondaryList.map((item, index) => (
                <SidebarItem {...item} key={index} />
              ))}
            </div>

            <div className="SidebarList SL-Three">
              {tertiaryList.map((item, index) => (
                <SidebarItem {...item} key={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* overlay */}
      {width < CONST.BREAKPOINTS.MOBILE && (
        <div className={`sidebar-overlay ${toggle ? "active" : ""}`}></div>
      )}

      {/* Mini Menu*/}
      <MiniSidebar />
    </>
  );
};

export default Sidebar;

Sidebar.defaultProps = {
  toggle: false,
  onClose: () => {},
};

Sidebar.propTypes = {
  toggle: PropTypes.bool,
  onClose: PropTypes.func,
};
