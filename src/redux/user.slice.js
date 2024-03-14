import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isAuth: false,
  },
  reducers: {
    logIn: (state) => {
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
    },
    isLogged: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { logIn, logOut, isLogged } = userSlice.actions;
export default userSlice.reducer;
