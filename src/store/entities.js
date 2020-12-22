import { combineReducers } from 'redux';
import user from './user';
import profile from './profile';
import sacredThings from './sacredThings';

export default combineReducers({
  user,
  profile,
  sacredThings
});