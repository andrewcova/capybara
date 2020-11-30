import { combineReducers } from '@reduxjs/toolkit';
import styles from './slices/styles/styles';
import overlay from './slices/overlay/overlay';

export default combineReducers({
  styles,
  overlay,
});
