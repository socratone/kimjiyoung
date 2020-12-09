import { combineReducers } from 'redux';
import page from './page';
import isBars from './isBars';

export default combineReducers({
  page,
  isBars
});