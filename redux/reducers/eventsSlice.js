import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      return (state = action.payload);
    },
    setEventById: (state, action) => {
      const newState = state.map((notice) => {
        if (notice.id === action.payload.id) {
          return action.payload;
        } else {
          return notice;
        }
      });
      return (state = newState);
    },
    initEvents: (state) => {
      return (state = initialState);
    },
  },
});

export const { setEvents, initEvents, setEventById } = eventsSlice.actions;

export default eventsSlice.reducer;
