import { combineReducers } from 'redux';
import groupsReducer from './groupsReducer';
import statusReducer from './statusReducer';

const rootReducer = combineReducers({
  groups: groupsReducer,
  status: statusReducer,
});

export default rootReducer;
