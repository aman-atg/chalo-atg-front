import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

import AuthContainer from "../container/AuthContainer";
import DesktopContainer from "../container/DesktopContainer";
import { useSettingsActions } from "../hooks/useActions";
import { selectCurrentUser } from "../redux/selectors";
import CONST from "../shared/CONST";
import { getLocalStorageItem } from "../shared/utils";

const SiteRoute = ({ component: Component, type, path, exact }) => {
  const { innerWidth: width } = window;
  const user = useSelector(selectCurrentUser, shallowEqual);
  const token = getLocalStorageItem(CONST.JWT_TOKEN);
  const history = useHistory();

  const { setSidebarState } = useSettingsActions();

  // For small screen devices (less than 1190px) the sidebar is collapsed
  // Also when path changes
  useEffect(() => {
    if (CONST.BREAKPOINTS.MOBILE > width) {
      setSidebarState({ isOpen: false });
    }
  }, [path]);

  // useEffect(() => {
  //   if (!user && token) {
  //     console.log("reauthenticating user", token);
  //     reAuthenticate();
  //   }
  // }, [user]);

  // redirect to /join if not authenticated
  useEffect(() => {
    if (!token && !user && type === "private") {
      history.push("/join");
    }
  }, [user, token]);

  // redirect to homeapge if authenticated
  useEffect(() => {
    if (token && type === "auth") {
      console.log("redirecting to homepage");
      history.push("/");
    }
  }, [token, history, type]);

  return (
    <Route
      exact={exact}
      render={(props) => {
        if (type === "public" || type === "private")
          return (
            <DesktopContainer path={path}>
              <Component {...props} token={token} />
            </DesktopContainer>
          );
        else if (type === "auth")
          return (
            <AuthContainer path={path}>
              <Component {...props} />
            </AuthContainer>
          );
        return (
          <DesktopContainer path={path}>
            <Component {...props} />
          </DesktopContainer>
        );
      }}
    />
  );
};

export default SiteRoute;

SiteRoute.defaultProps = {
  exact: false,
  type: "public",
};

SiteRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
  type: PropTypes.string,
};
