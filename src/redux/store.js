import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { logger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import allSlices from "./slices";

const history = createBrowserHistory();

const rootReducer = combineReducers({
  ...allSlices,
  router: connectRouter(history),
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      // .concat(logger)
      .concat(routerMiddleware(history)),
  // devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export { history };
