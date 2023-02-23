/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  filterData: defaultFilterData
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

    fetchCandidatesAction: (_state, _action: PayloadAction<TFilterData>) => {},

    deleteCandidateAction: (_state, _action: PayloadAction<number>) => {}
  },
});

export const {
    setCandidates,
    setLoading,
    setFilters,
    fetchCandidatesAction,
    deleteCandidateAction,
} = candidates.actions;

export default candidates.reducer;
