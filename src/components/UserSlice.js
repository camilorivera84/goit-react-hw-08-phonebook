// UserSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    name: '',
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload;
    },
    logoutUser: state => {
      state.isLoggedIn = false;
      state.name = '';
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectIsLoggedIn = state => state.user.isLoggedIn;
export const selectUserName = state => state.user.name;
export default userSlice.reducer;
