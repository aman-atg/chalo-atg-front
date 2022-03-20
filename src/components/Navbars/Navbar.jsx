import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as HamIcon } from "./../../assets/icons/hamburger.svg";
import { ReactComponent as SearchIcon } from "./../../assets/icons/search.svg";

const Navbar = ({ onMenuClick }) => {
  return (
    <>
      <div className="Navbar">
        <div className="Navbar_left">
          <span
            tabIndex={0}
            className="ham"
            onClick={onMenuClick}
            onKeyDown={() => {}}
            role="button"
          >
            <HamIcon />
          </span>
          <Link to="/" className="logo-container">
            <span id="text">Chalo ATG</span>
            <span id="country-code-icon">IN</span>
          </Link>
        </div>
        <div className="Navbar_center">
          <div className="searchbox">
            <form>
              <div className="search-input">
                <input
                  id="search"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  name="search_query"
                  tabIndex="0"
                  type="text"
                  spellCheck={false}
                  placeholder="Search"
                  aria-label="Search"
                  aria-haspopup={false}
                  // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                  role="combobox"
                  aria-autocomplete="list"
                  dir="ltr"
                />
              </div>

              <button>
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>
        <div className="Navbar_right">
          <div className="Navbar_right_buttons">
            {/* might add something */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};
