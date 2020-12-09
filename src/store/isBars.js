import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'bars',
  initialState: false,
  reducers: {
    activateBars: (state, action) => {
      return true;
    },
    disableBars: (state, action) => {
      return false;
    }
  }
});

export const { activateBars, disableBars } = slice.actions;
export default slice.reducer;