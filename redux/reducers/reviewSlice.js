import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorId: 0,
  comments: [],
  contents: "",
  isAnonymous: true,
  thumbs: [],
  title: "",
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      try {
        state = Object.assign(state, action.payload);
        console.log(state);
      } catch (error) {
        console.log(error);
      }
    },
    initReview: (state) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReview, initReview } = reviewSlice.actions;

export default reviewSlice.reducer;
