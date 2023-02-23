/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCandidate } from 'types/types';
type TCandidateState = {
  candidate?: TCandidate,
  isLoading: boolean,
  toHomePage: boolean,
}

const initialState: TCandidateState = {
 candidate: undefined,
 isLoading: false,
 toHomePage: false,
};

const candidate = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    setCandidate: (state, action: PayloadAction<TCandidate>) => {
      state.candidate = action.payload;
    },
    resetCandidate: (state) => {
      state.candidate = undefined;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToHomePage: (state, action: PayloadAction<boolean>) => {
      state.toHomePage = action.payload;
    },

    fetchCandidateAction: (_state, _action: PayloadAction<number>) => {},
    deleteCandidateAction: (_state, _action: PayloadAction<number>) => {},
  },
});

export const {
    setCandidate,
    setIsLoading,
    resetCandidate,
    setToHomePage,
    fetchCandidateAction,
    deleteCandidateAction,
} = candidate.actions;

export default candidate.reducer;
