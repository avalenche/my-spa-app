import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { deleteCandidate, fetchCandidates } from 'api/candidates';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  fetchCandidatesAction,
  deleteCandidateAction,
  setCandidates,
  setLoading,
  getFilterData,
  TFilterData
} from './index';


function* fetchCandidatesSaga(action: PayloadAction<TFilterData>): SagaIterator {
  yield put(setLoading(true));

  try {
    const data = yield call(fetchCandidates, action.payload);
    yield put(setCandidates(data));
  } catch (error) {
    yield call(console.error, error);
  } finally {
    yield put(setLoading(false));
  }
}

function* deleteCandidateSaga(action: PayloadAction<number>): SagaIterator {
  yield put(setLoading(true));

  try {
    yield call(deleteCandidate, action.payload);
    const filterData: TFilterData = yield select(getFilterData);
    yield put(fetchCandidatesAction(filterData))
    } catch (error) {
    yield call(console.error, error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchCandidatesSagas() {
  yield takeLatest(fetchCandidatesAction, fetchCandidatesSaga);
  yield takeLatest(deleteCandidateAction, deleteCandidateSaga);
}
