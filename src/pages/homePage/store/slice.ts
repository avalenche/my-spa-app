/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCandidate } from 'types/types';
import { TFilterData } from './types';

const defaultFilterData: TFilterData = {
  q: undefined,
  _sort: "id",
  _order: "desc",
  _limit: 10,
  _page: 1,
  tech_like: undefined,
}

const initialState = {
  loading: false,
  data: [] as any[],
  filterData: defaultFilterData,
  toHomePage: false,
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
    setFilters: (state, action: PayloadAction<TFilterData>) => {
      state.filterData = action.payload;
    },
    setToHomePage: (state, action: PayloadAction<boolean>) => {
      state.toHomePage = action.payload;
    },

    fetchCandidatesAction: (_state, _action: PayloadAction<TFilterData>) => {},
    deleteCandidateAction: (_state, _action: PayloadAction<number>) => {},
    addCandidateAction: (_state, _action: PayloadAction<TCandidate>) => {}
  },
});

export const {
    setCandidates,
    setLoading,
    setFilters,
    setToHomePage,
    fetchCandidatesAction,
    deleteCandidateAction,
    addCandidateAction,
} = candidates.actions;

export default candidates.reducer;
