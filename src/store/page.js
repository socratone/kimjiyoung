import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'page',
  initialState: '',
  reducers: {
    setPage: (state, action) => {
      return action.payload
    }
  }
});

export const { setPage } = slice.actions;
export default slice.reducer;