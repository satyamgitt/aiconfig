import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState, UserProfile } from '../types/profile';

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setProfile, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;