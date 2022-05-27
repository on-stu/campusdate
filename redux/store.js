import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import userReducer from "./reducers/userSlice";
import noticeReducer from "./reducers/noticeSlice";
import noticesReduceer from "./reducers/noticesSlice";
import faqSlice from "./reducers/faqSlice";
import faqsSlice from "./reducers/faqsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    notice: noticeReducer,
    notices: noticesReduceer,
    faq: faqSlice,
    faqs: faqsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
