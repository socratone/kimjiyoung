import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sacredThings',
  initialState: {},
  reducers: {
    setItems: (state, action) => {
      return action.payload;
    },
    removeItem: (sacredThings, action) => {
      const { category, id } = action.payload;
      const items = sacredThings[category].items.filter(item => item.id !== id);
      sacredThings[category].items = items;
    }
  }
});

export const { setItems, removeItem } = slice.actions;
export default slice.reducer;