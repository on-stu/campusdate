import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorId: 0,
  comments: [],
  contents: "",
  isImportant: true,
  thumbs: [],
  title: "",
};

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotice: (state, action) => {
      try {
        state = Object.assign(state, action.payload);
      } catch (error) {
        console.log(error);
      }
    },
    initNotice: (state) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotice, initNotice } = noticeSlice.actions;

export default noticeSlice.reducer;
