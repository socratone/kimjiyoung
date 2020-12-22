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
    removeItem: (sacredThings, action) => {

    }
  }
});

export const { 
  setItems, 
  setFirstItemText,
  setSecondItemText,
  setThirdItemText,
  removeItem 
} = slice.actions;
export default slice.reducer;