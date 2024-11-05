import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/authSlice";
import mattersReducer from "../slice/mattersSlice";
import openAIReducer from "../slice/openAISlice";
import workflowReducer from "../slice/workflowSlice";

// Persist
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // storage: storageSession,

  whitelist: ["login"],

  storage,
};

const rootReducer = combineReducers({
  login: loginReducer,
  matters: mattersReducer,
  openAI: openAIReducer,
  workflow: workflowReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // Correct the middleware setup
  devTools: true, // Optionally, you can enable devTools
});

export const persistor = persistStore(store);
export default store;
export type AppDispatch = typeof store.dispatch;
