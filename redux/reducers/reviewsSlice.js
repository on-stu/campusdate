import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      return (state = action.payload);
    },
    setReviewById: (state, action) => {
      const newState = state.map((charm) => {
        if (charm.id === action.payload.id) {
          return action.payload;
        } else {
          return charm;
        }
      });
      return (state = newState);
    },
    initReviews: (state) => {
      return (state = initialState);
    },
  },
});

export const { setReviews, initReviews, setReviewById } = reviewsSlice.actions;

export default reviewsSlice.reducer;
