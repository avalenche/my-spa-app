import { combineReducers } from '@reduxjs/toolkit';
import candidatesReducer from 'pages/homePage/store';

export const createRootReducer = () => {
  return combineReducers({
    candidates: candidatesReducer,
  });
};
