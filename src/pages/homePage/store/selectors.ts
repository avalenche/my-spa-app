import { TStore } from 'store';
import { createSelector } from '@reduxjs/toolkit';

export const getState = (state: TStore) => state.candidates;

export const getCandidatesData = createSelector(getState, (state) => state.data);
export const getCandidatesLoading = createSelector(getState, (state) => state.loading);
