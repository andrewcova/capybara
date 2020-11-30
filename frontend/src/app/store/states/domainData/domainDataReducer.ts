import { combineReducers } from '@reduxjs/toolkit';
import authorisation from './slices/auth/auth';

const domainDataReducer = combineReducers({ authorisation });

export default domainDataReducer;
