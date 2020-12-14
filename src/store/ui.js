import { combineReducers } from 'redux';
import isNav from './isNav';
import isBars from './isBars';

export default combineReducers({
  isNav,
  isBars
});