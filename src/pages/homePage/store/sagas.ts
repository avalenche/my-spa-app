import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { deleteCandidate, fetchCandidates, createCandidate } from 'api/candidates';
import { PayloadAction } from '@reduxjs/toolkit';
import { message } from "antd";

import {
  fetchCandidatesAction,
  deleteCandidateAction,
  addCandidateAction,
  setCandidates,
  setLoading,
  setToHomePage,
  getFilterData,
  TFilterData
} from './index';
import { TCandidate } from 'types/types';


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
    message.success("Candidate is deleted");
    } catch (error) {
    yield call(console.error, error);
    message.error("Candidate is not deleted");
  } finally {
    yield put(setLoading(false));
  }
}

function* addCandidateSaga(action: PayloadAction<TCandidate>): SagaIterator {
  yield put(setLoading(true));

  try {
    yield call(createCandidate, action.payload)
    yield put(setToHomePage(true));
    message.success("Candidate data is upload");
  } catch (error) {
    yield call(console.error, error);
    message.error("Candidate data is not upload");
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchCandidatesSagas() {
  yield takeLatest(fetchCandidatesAction, fetchCandidatesSaga);
  yield takeLatest(deleteCandidateAction, deleteCandidateSaga);
  yield takeLatest(addCandidateAction, addCandidateSaga);
}
