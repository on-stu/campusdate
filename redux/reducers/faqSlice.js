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

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setFaq: (state, action) => {
      try {
        state = Object.assign(state, action.payload);
      } catch (error) {
        console.log(error);
      }
    },
    initFaq: (state) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFaq, initFaq } = faqSlice.actions;

export default faqSlice.reducer;
