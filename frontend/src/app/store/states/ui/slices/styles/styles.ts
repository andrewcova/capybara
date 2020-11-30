import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoundingValue, Styles } from './types';

const initialState: Styles = { rounding: 0 };

export const stylesSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    setRounding: (state, action: PayloadAction<RoundingValue>) => {
      state.rounding = action.payload;
    },
  },
});

export const {} = stylesSlice.actions;

export default stylesSlice.reducer;
