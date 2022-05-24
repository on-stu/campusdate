import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  nickname: "",
  sex: "",
  age: "",
  photoUrl: "",
  myHobbies: [],
  myIdeals: [],
  whoAmI: [],
  introduction: "",
  university: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
