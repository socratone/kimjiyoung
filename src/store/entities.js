import { combineReducers } from 'redux';
import user from './user';
import sacredThings from './sacredThings';

export default combineReducers({
  user,
  sacredThings
});