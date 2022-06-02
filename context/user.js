import { createContext } from "react";

export const UserContext = createContext({
  userInfo: {},
  setUserInfo: () => {},
  refreshUserInfo: () => {},
  userChatList: [],
  refreshChatList: () => {},
  setUserChatList: () => {},
  addChatRoom: () => {},
  addChat: () => {},
});
