import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authSlice from "./features/auth/authSlice";
import branchSlice from "./features/branch/branchSlice";
import layoutSlice from "./features/layout/layoutSlice";
import localSlice from "./features/locals/localSlice";
import notificationSlice from "./features/notification/notificationSlice";
import otpSlice from "./features/otp/otpSlice";
import PropertySlice from "./features/property/propertySlice";
import tableSlice from "./features/table/tableSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);
// const persistPropertyReducer = persistReducer(persistConfig, PropertySlice);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    otp: otpSlice,
    layout: layoutSlice,
    table: tableSlice,
    notification: notificationSlice,
    branch: branchSlice,
    lang: localSlice,
    property: PropertySlice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
