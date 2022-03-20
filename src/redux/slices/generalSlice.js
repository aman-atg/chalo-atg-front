import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import mainService from "../../services/mainService";
import { createAlert } from "../../shared/utils";

const initialState = {
  notifications: [],
  showUploadModal: false,
  routes: {
    isLoading: false,
    data: [],
  },
};

const createOrUpdateRoute = createAsyncThunk(
  "general/createOrUpdateRoute",
  async ({ data, isUpdate = false }) => {
    try {
      const res = isUpdate
        ? await mainService.updateRoute(data)
        : await mainService.createRoute(data);
      if (res.data.success) {
        createAlert({
          type: "success",
          message: `Successfully ${isUpdate ? "updated" : "created"} route`,
        });
        return res.data.data;
      } else {
        throw new Error(res.data.data.message);
      }
    } catch (error) {
      createAlert({ type: "error", message: error.response.data.message });
      return initialState;
    }
  }
);

const getRoutes = createAsyncThunk("general/getRoutes", async () => {
  try {
    const res = await mainService.getRoutes();
    if (res.data.success) {
      return res.data.data.routes;
    } else {
      throw new Error(res.data.data.message);
    }
  } catch (error) {
    createAlert({ type: "error", message: error.response.data.message });
    return initialState;
  }
});

const deleteRoute = createAsyncThunk(
  "general/deleteRoute",
  async (id, { dispatch }) => {
    try {
      const res = await mainService.deleteRoute(id);
      if (res.data.success) {
        console.log(res.data);
        createAlert({
          type: "success",
          message: "Successfully deleted the route",
        });
        dispatch(getRoutes());
        return res.data.data;
      } else {
        throw new Error(res.data.data.message);
      }
    } catch (error) {
      createAlert({ type: "error", message: error.response.data.message });
      return initialState;
    }
  }
);

const GeneralReducer = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleUploadModal: (state) => {
      state.showUploadModal = !state.showUploadModal;
    },
  },
  extraReducers: {
    // [createOrUpdateRoute.fulfilled]: (state, { payload }) => {
    // state.routes.data.push(payload);
    // },
    [getRoutes.fulfilled]: (state, { payload }) => {
      state.routes.isLoading = false;
      state.routes.data = payload;
    },
    [getRoutes.pending]: (state) => {
      state.routes.isLoading = true;
    },
    [getRoutes.rejected]: (state) => {
      state.isLoading = false;
      createAlert({ type: "error", message: "Something went wrong" });
    },
  },
});

export const generalActions = {
  createOrUpdateRoute,
  getRoutes,
  deleteRoute,
  ...GeneralReducer.actions,
};

export default GeneralReducer.reducer;
