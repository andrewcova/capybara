import { combineReducers } from '@reduxjs/toolkit';
import layout from './slices/layout/layout';

const appStateReducer = combineReducers({ layout });

export default appStateReducer;
