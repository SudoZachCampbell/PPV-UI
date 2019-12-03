import { combineReducers } from 'redux';
import searchState from './searchState';
import pageState from './pageState';

const appState = combineReducers({
  pageState,
  searchState 
});

export default appState;
