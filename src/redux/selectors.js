import { createSelector } from "@reduxjs/toolkit";

// Settings
const selectSettings = (state) => state.settings;

export const selectSidebarState = createSelector(
  [selectSettings],
  (settings) => settings.sidebarState
);

// General

const selectGeneral = (state) => state.general;

export const selectRoutes = createSelector(
  [selectGeneral],
  (general) => general.routes
);

// User
const selectUser = (state) => state.user;

export const selectToken = createSelector([selectUser], (user) => user.token);

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsUserLoading = createSelector(
  [selectUser],
  (user) => user.isLoading
);
