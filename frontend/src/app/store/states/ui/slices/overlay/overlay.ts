import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Overlay } from './types';

const initialState: Overlay = {
  isActive: false,
  type: null,
  data: null,
};

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    setOverlay: (state, action: PayloadAction<Overlay>) => action.payload,
    unsetOverlay: (state) => {
      state.isActive = false;
    },
  },
});

export const { setOverlay, unsetOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;
