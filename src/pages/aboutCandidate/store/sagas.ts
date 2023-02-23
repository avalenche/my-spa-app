import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { deleteCandidate, fetchCandidate } from 'api/candidates';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  fetchCandidateAction,
  setIsLoading,
  setCandidate,
  deleteCandidateAction,
  setToHomePage,
  } from './index';

function* fetchCandidateSaga(action: PayloadAction<number>): SagaIterator {
  yield put(setIsLoading(true));

  try {
    const data = yield call(fetchCandidate, action.payload);
    yield put(setCandidate(data));
  } catch (error) {

    yield call(console.error, error);
  } finally {

    yield put(setIsLoading(false));
  }
}

function* deleteCandidateSaga(action: PayloadAction<number>): SagaIterator {
  yield put(setIsLoading(true));

  try {
    yield call(deleteCandidate, action.payload);
    yield put(setToHomePage(true))

    } catch (error) {
    yield call(console.error, error);

  } finally {
    yield put(setIsLoading(false));
  }
}

export function* watchCandidateSagas() {
  yield takeLatest(fetchCandidateAction, fetchCandidateSaga);
  yield takeLatest(deleteCandidateAction, deleteCandidateSaga);
}

