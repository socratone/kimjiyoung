import { combineReducers } from 'redux';
import isAdmin from './isAdmin';
import page from './page';
import isBars from './isBars';

export default combineReducers({
  page,
  isBars,
  isAdmin,
});