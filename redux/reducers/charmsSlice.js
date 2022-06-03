import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const charmsSlice = createSlice({
  name: "charms",
  initialState,
  reducers: {
    setCharms: (state, action) => {
      return (state = action.payload);
    },
    setCharmById: (state, action) => {
      const newState = state.map((charm) => {
        if (charm.id === action.payload.id) {
          return action.payload;
        } else {
          return charm;
        }
      });
      return (state = newState);
    },
    initCharms: (state) => {
      return (state = initialState);
    },
  },
});

export const { setCharms, initCharms, setCharmById } = charmsSlice.actions;

export default charmsSlice.reducer;
