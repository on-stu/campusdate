import { createContext } from "react";

export const UserContext = createContext({
  userInfo: {},
  setUserInfo: () => {},
  refreshUserInfo: () => {},
});
