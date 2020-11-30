import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Authorisation as AuthState } from './types';

const initialState: AuthState = { username: null };

export const authStateSlice = createSlice({
  name: 'authorisation',
  initialState,
  reducers: {
    unauthorise: () => initialState,
    authorise: (state, action: PayloadAction<string>) => ({ username: action.payload }),
  },
});

export const { authorise, unauthorise } = authStateSlice.actions;

export default authStateSlice.reducer;
