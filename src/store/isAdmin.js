import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'isAdmin',
  initialState: false,
  reducers: {
    activateAdmin: (state, action) => {
      return true;
    },
    disableAdmin: (state, action) => {
      return false;
    }
  }
});

export const { activateAdmin, disableAdmin } = slice.actions;
export default slice.reducer;