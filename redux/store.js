import { configureStore } from "@reduxjs/toolkit";
import noticeReducer from "./reducers/noticeSlice";
import noticesReduceer from "./reducers/noticesSlice";
import faqSlice from "./reducers/faqSlice";
import faqsSlice from "./reducers/faqsSlice";
import charmSlice from "./reducers/charmSlice";
import charmsSlice from "./reducers/charmsSlice";
import reviewSlice from "./reducers/reviewSlice";
import reviewsSlice from "./reducers/reviewsSlice";
import eventSlice from "./reducers/eventSlice";
import eventsSlice from "./reducers/eventsSlice";
import reportSlice from "./reducers/reportSlice";
import reportsSlice from "./reducers/reportsSlice";

export const store = configureStore({
  reducer: {
    notice: noticeReducer,
    notices: noticesReduceer,
    faq: faqSlice,
    faqs: faqsSlice,
    charm: charmSlice,
    charms: charmsSlice,
    review: reviewSlice,
    reviews: reviewsSlice,
    event: eventSlice,
    events: eventsSlice,
    report: reportSlice,
    reports: reportsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
