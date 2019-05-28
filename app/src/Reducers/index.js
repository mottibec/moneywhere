import { combineReducers } from 'redux';
import userData from './DataReducer';
import userMode from './userMode';
import myLocation from './LocationReducer';

export default combineReducers({
    userData, userMode, myLocation
});