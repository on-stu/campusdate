import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorId: 0,
  comments: [],
  contents: "",
  isActive: true,
  thumbs: [],
  title: "",
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent: (state, action) => {
      try {
        state = Object.assign(state, action.payload);
      } catch (error) {
        console.log(error);
      }
    },
    initEvent: (state) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEvent, initEvent } = eventSlice.actions;

export default eventSlice.reducer;
