import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  done: false,
  content: "",
  authorId: 0,
  createdAt: new Date(),
  isSecret: true,
  answerId: 0,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport: (state, action) => {
      try {
        state = Object.assign(state, action.payload);
      } catch (error) {
        console.log(error);
      }
    },
    initReport: (state) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReport, initReport } = reportSlice.actions;

export default reportSlice.reducer;
