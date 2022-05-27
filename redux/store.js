import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import userReducer from "./reducers/userSlice";
import noticeReducer from "./reducers/noticeSlice";
import noticesReduceer from "./reducers/noticesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    notice: noticeReducer,
    notices: noticesReduceer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
