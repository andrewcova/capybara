import { combineReducers } from '@reduxjs/toolkit';
import uiReducer from './ui/uiReducer';
import domainDataReducer from './domainData/domainDataReducer';
import appStateReducer from './appState/appStateReducer';

const reducer = combineReducers({
  domainData: domainDataReducer,
  appState: appStateReducer,
  ui: uiReducer,
});

export default reducer;
