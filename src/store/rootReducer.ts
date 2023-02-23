import { combineReducers } from '@reduxjs/toolkit';
import candidatesReducer from 'pages/homePage/store';
import candidateReducer from 'pages/aboutCandidate/store'

export const createRootReducer = () => {
  return combineReducers({
    candidates: candidatesReducer,
    selectedCandidate: candidateReducer,
  });
};
