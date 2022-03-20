import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "../../services/authService";
import CONST from "../../shared/CONST";
import {
  createAlert,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../shared/utils";

const initialState = {
  currentUser: null,
  token: null,
  isLoading: false,
};

// const getMe = createAsyncThunk("user/getMe", async () => {
//   const response = await authService.getMe();
//   return response.data;
// });

/**
 * @param {object} body
 * @param {string} body.email
 * @param {string} body.password
 * @param {string} [body.name]
 *
 * @returns {object}
 */
const getAuth = createAsyncThunk("user/getAuth", async (body) => {
  try {
    const res = body.name
      ? await authService.register(body)
      : await authService.login(body);

    if (res.data.success) {
      setLocalStorageItem(CONST.JWT_TOKEN, res.data.data.token);
      const resUser = await authService.getUser();
      if (resUser.data.success) {
        createAlert({ type: "success", message: "Successfully logged in" });
        return {
          currentUser: resUser.data.data.user,
          token: res.data.data.token,
        };
      } else {
        throw new Error(res.data.data.message); //test
      }
    } else {
      throw new Error(res.data.data.message); //test
    }
  } catch (error) {
    createAlert({ type: "error", message: error.response.data.message });
    return initialState;
  }
});

const reAuthenticate = createAsyncThunk("user/reAuthenticate", async () => {
  try {
    const resUser = await authService.getUser();
    if (resUser.data.success) {
      return {
        currentUser: resUser.data.data.user,
        token: resUser.data.data.token,
      };
    } else {
      throw new Error(resUser.data.data.message); //test
    }
  } catch (error) {
    createAlert({ type: "error", message: error.response.data.message });
    removeLocalStorageItem(CONST.JWT_TOKEN);
    return initialState;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      removeLocalStorageItem(CONST.JWT_TOKEN);
      createAlert({ type: "info", message: "You've logged out" });
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuth.fulfilled, (state, { payload }) => {
      state.currentUser = payload.currentUser;
      state.token = payload.token;
      state.isLoading = false;
    });

    builder.addCase(getAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAuth.rejected, (state) => {
      state.isLoading = false;
      createAlert({ type: "error", message: "Something went wrong" });
    });

    builder.addCase(reAuthenticate.fulfilled, (state, { payload }) => {
      state.currentUser = payload.currentUser;
      state.token = payload.token;
      state.isLoading = false;
    });

    builder.addCase(reAuthenticate.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(reAuthenticate.rejected, (state) => {
      state.isLoading = false;
      createAlert({ type: "error", message: "Something went wrong" });
    });
  },
});

export const userActions = { getAuth, reAuthenticate, ...userSlice.actions };

export default userSlice.reducer;
