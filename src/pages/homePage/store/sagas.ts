import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchCandidates } from 'api/candidates';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  fetchCandidatesAction,
  setCandidates,
  setLoading
} from './index';

function* fetchCandidatesSaga(action: PayloadAction<{ queryString: string }>): SagaIterator {
  yield put(setLoading(true));

  try {
    const data = yield call(fetchCandidates, { queryString: action.payload.queryString });
    yield put(setCandidates(data));
  } catch (error) {
    yield call(console.error, error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchCandidatesSagas() {
  yield takeLatest(fetchCandidatesAction, fetchCandidatesSaga);
}
