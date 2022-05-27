import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    setFaqs: (state, action) => {
      console.log(action.payload);
      return (state = action.payload);
    },
    setFaqsById: (state, action) => {
      const newState = state.map((faq) => {
        if (faq.id === action.payload.id) {
          return action.payload;
        } else {
          return faq;
        }
      });
      return (state = newState);
    },
    initFaqs: (state) => {
      return (state = initialState);
    },
  },
});

export const { setFaqs, initFaqs, setFaqsById } = faqsSlice.actions;

export default faqsSlice.reducer;
