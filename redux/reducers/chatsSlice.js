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
        if (chat === action.payload) {
          return action.payload;
        } else {
          return chat;
        }
      });
      return (state = newState);
    },
    setEachChat: (state, action) => {
      const { message, chatRoomId } = action.payload;
      const whichChat = state.filter((elm) => elm.id === chatRoomId)[0];
      console.log(whichChat);
      const existInChats = whichChat.chats.some((l) => l.id === chatRoomId);
      if (existInChats) {
        const newState = whichChat.chats.map((chat) => {
          if (existInChats && chat.id === message.id) {
            return chat.concat(message);
          } else {
            return chat;
          }
        });
        return state.concat(newState);
      } else {
        const newState = { ...whichChat, chats: [...whichChat.chats, message] };
        return [...state.chats, newState];
      }
    },
    initChats: (state) => {
      return (state = initialState);
    },
  },
});

export const { setChats, initChats, setChatsById, addChat, setEachChat } =
  chats.actions;

export default chats.reducer;
