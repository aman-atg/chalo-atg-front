import React from "react";
import { Redirect } from "react-router-dom";

import { AddRoute, Error, Home, Join, JoinEmail } from "../pages/index";

// type: auth|public|private|error
const allRoutes = [
  {
    path: "/join",
    exact: true,
    component: Join,
    type: "auth",
  },

  {
    path: "/join/email",
    exact: true,
    component: JoinEmail,
    type: "auth",
  },

  {
    path: "/",
    exact: true,
    component: Home,
    type: "public",
  },

  // {
  //   path: "/tickets",
  //   exact: true,
  //   component: AddRoute,
  //   type: "public",
  // },

  // {
  //   path: "/favorites",
  //   exact: true,
  //   component: AddRoute,
  //   type: "public",
  // },

  {
    path: "/addNewRoute",
    exact: true,
    component: AddRoute,
    type: "private",
  },

  {
    path: "/editRoute",
    // exact: true,
    component: AddRoute,
    type: "private",
  },

  // error
  { path: "/404", exact: true, component: Error, type: "error" },

  // *
  {
    path: "/",
    component: () => <Redirect to="/404" />,
    type: "error",
  },
];

export default allRoutes;
