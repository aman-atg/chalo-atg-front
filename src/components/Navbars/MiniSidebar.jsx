import AddRoadIcon from "@mui/icons-material/AddRoad";
import HomeIcon from "@mui/icons-material/Home";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

const MiniSidebar = ({ children }) => {
  return (
    <>
      <div className="MiniSidebar">
        <div className="SidebarList">
          <NavLink exact to="/" className="SidebarItem">
            <span className="leftIcon">
              <HomeIcon />
            </span>
            <span className="text">Home</span>
          </NavLink>

          <NavLink exact to="/tickets" className="SidebarItem">
            <span className="leftIcon">
              <LocalActivityIcon />
            </span>
            <span className="text">Tickets</span>
          </NavLink>
          <NavLink exact to="/favorites" className="SidebarItem">
            <span className="leftIcon">
              <StarIcon />
            </span>
            <span className="text">Favorites </span>
          </NavLink>
        </div>

        <div className="SidebarList SL-Two">
          <NavLink exact to="/addNewRoute" className="SidebarItem">
            <span className="leftIcon">
              <AddRoadIcon />
            </span>
            <span className="text">Add Route </span>
          </NavLink>
        </div>
      </div>
      {children}
    </>
  );
};

export default MiniSidebar;

MiniSidebar.propTypes = {
  children: PropTypes.node,
};
