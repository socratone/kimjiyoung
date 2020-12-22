import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'profile',
  initialState: {
    firstItem: {
      image: '',
      text: ''
    },
    secondItem: {
      image: '',
      text: ''
    },
    thirdItem: {
      image: '',
      text: ''
    },
    items: []
  },
  reducers: {
    setItems: (state, action) => {
      return action.payload;
    },
    setFirstItemText: (profile, action) => {
      profile.firstItem.text = action.payload.text;
    },
    setSecondItemText: (profile, action) => {
      profile.secondItem.text = action.payload.text;
    },
    setThirdItemText: (profile, action) => {
      profile.thirdItem.text = action.payload.text;
    },
    setItem: (profile, action) => {
      const { id, text } = action.payload;
      const [item] = profile.items.filter(item => item.id === id);
      if (item) item.text = text;
    },
    removeItem: (profile, action) => {
      const { id } = action.payload;
      const items = profile.items.filter(item => item.id !== id);
      profile.items = items;
    },
  }
});

export const { 
  setItems, 
  setFirstItemText,
  setSecondItemText,
  setThirdItemText,
  setItem,
  removeItem
} = slice.actions;
export default slice.reducer;