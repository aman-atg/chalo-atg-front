import { createAction, createSlice } from "@reduxjs/toolkit";

const isDarkModeOn = localStorage.getItem("darkMode") || "";

const initialState = {
  sidebarState: {
    isOpen: true,
    isFloating: false, // not being used
    isMini: false, // not being used
    // floating: false, //when width is less than 1190px
  },
  showTnCForAuth: true,
  initialPath: "/",
  darkMode: isDarkModeOn === "on" ? true : false,
};

const routeChange = createAction("@@router/LOCATION_CHANGE");

const SettingsReducer = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setInitialPath: (state, action) => {
      state.initialPath = action.payload;
    },

    toggleSidebar: (state) => {
      state.sidebarState.isOpen = !state.sidebarState.isOpen;
    },

    setSidebarState: (state, action) => {
      state.sidebarState = { ...state.sidebarState, ...action.payload };
    },

    toggleShowTnCForAuth: (state) => {
      state.showTnCForAuth = !state.showTnCForAuth;
    },

    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode ? "on" : "off");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(routeChange, (state) => {
      state.sidebarState.isOpen = false;
      console.log("route change");
    });
  },
});

export const settingsActions = { ...SettingsReducer.actions };

export default SettingsReducer.reducer;
