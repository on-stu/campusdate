import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import noticeReducer from "./reducers/noticeSlice";
import noticesReduceer from "./reducers/noticesSlice";
import faqSlice from "./reducers/faqSlice";
import faqsSlice from "./reducers/faqsSlice";
import chatsSlice from "./reducers/chatsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,

    notice: noticeReducer,
    notices: noticesReduceer,
    faq: faqSlice,
    faqs: faqsSlice,
    chats: chatsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
