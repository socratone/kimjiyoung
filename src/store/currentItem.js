import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentItem',
  initialState: {},
  reducers: {
    setCurrentItem: (state, action) => {
      return action.payload
    }
  }
});

export const { setCurrentItem } = slice.actions;
export default slice.reducer;