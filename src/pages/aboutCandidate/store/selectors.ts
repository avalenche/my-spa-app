import { TStore } from 'store';
import { createSelector } from '@reduxjs/toolkit';

export const getState = (state: TStore) => state.selectedCandidate;

export const getCandidate = createSelector(getState, (state) => state.candidate);
export const getCandidateIsLoading = createSelector(getState, (state) => state.isLoading);
export const getToHomePage = createSelector(getState, (state) => state.toHomePage);

