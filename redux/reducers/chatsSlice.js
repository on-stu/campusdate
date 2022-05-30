import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const chats = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      return (state = action.payload);
    },
    addChat: (state, action) => {
      const existInState = state.some((l) => l.id === action.payload.id);
      if (!existInState) {
        return [...state, action.payload];
      } else {
        return state;
      }
    },
    setChatsById: (state, action) => {
      const newState = state.map((chat) => {
        if (chat.id === action.payload.id) {
          return action.payload;
        } else {
          return chat;
        }
      });
      return (state = newState);
    },
    initChats: (state) => {
      return (state = initialState);
    },
  },
});

export const { setChats, initChats, setChatsById, addChat } = chats.actions;

export default chats.reducer;
