import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (state, action) => {
      return (state = action.payload);
    },
    setReportsById: (state, action) => {
      const newState = state.map((faq) => {
        if (faq.id === action.payload.id) {
          return action.payload;
        } else {
          return faq;
        }
      });
      return (state = newState);
    },
    initReports: (state) => {
      return (state = initialState);
    },
  },
});

export const { setReports, initReports, setReportsById } = reportsSlice.actions;

export default reportsSlice.reducer;
