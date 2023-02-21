/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: [] as any[],
};

const candidates = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    fetchCandidatesAction: (_state, _action: PayloadAction<{ queryString: string }>) => {},
  },
});

export const {
    setCandidates,
    setLoading,
    fetchCandidatesAction,
} = candidates.actions;

export default candidates.reducer;
