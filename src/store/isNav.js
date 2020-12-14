import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'nav',
  initialState: true,
  reducers: {
    activateNav: (state, action) => {
      return true;
    },
    disableNav: (state, action) => {
      return false;
    }
  }
});

export const { activateNav, disableNav } = slice.actions;
export default slice.reducer;