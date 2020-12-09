import { combineReducers } from 'redux';
import isAdmin from './isAdmin';
import page from './page';

export default combineReducers({
  page,
  isAdmin,
});