import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import noticeReducer from "./reducers/noticeSlice";
import noticesReduceer from "./reducers/noticesSlice";
import faqSlice from "./reducers/faqSlice";
import faqsSlice from "./reducers/faqsSlice";
import charmSlice from "./reducers/charmSlice";
import charmsSlice from "./reducers/charmsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notice: noticeReducer,
    notices: noticesReduceer,
    faq: faqSlice,
    faqs: faqsSlice,
    charm: charmSlice,
    charms: charmsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
