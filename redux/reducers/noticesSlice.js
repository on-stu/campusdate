import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setNotices: (state, action) => {
      return (state = action.payload);
    },
    setNoticeById: (state, action) => {
      const newState = state.map((notice) => {
        if (notice.id === action.payload.id) {
          return action.payload;
        } else {
          return notice;
        }
      });
      return (state = newState);
    },
    initNotices: (state) => {
      return (state = initialState);
    },
  },
});

export const { setNotices, initNotices, setNoticeById } = noticesSlice.actions;

export default noticesSlice.reducer;
