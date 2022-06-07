import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorId: 0,
  comments: [],
  contents: "",
  isAnonymous: true,
  thumbs: [],
  title: "",
};

export const charmSlice = createSlice({
  name: "charm",
  initialState,
  reducers: {
    setCharm: (state, action) => {
      try {
        state = Object.assign(state, action.payload);
      } catch (error) {
        console.log(error);
      }
    },
    initCharm: (state) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCharm, initCharm } = charmSlice.actions;

export default charmSlice.reducer;
