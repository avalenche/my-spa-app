import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import { deleteCandidate, fetchCandidate, updateCandidate } from 'api/candidates';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  updateCandidateAction,
  fetchCandidateAction,
  deleteCandidateAction,
  setIsLoading,
  setCandidate,  
  setToHomePage,
  } from './index';
import { TCandidate } from 'types/types';


  function* updateCandidateSaga(action: PayloadAction<TCandidate>): SagaIterator {
    yield put(setIsLoading(true));
  
    try {
      yield call(updateCandidate, action.payload);
      message.success("Candidate data is updated");
    } catch (error) {  
      yield call(console.error, error);
      message.error("Candidate data is not updated");
    } finally {
  
      yield put(setIsLoading(false));
    }
  }

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
    message.success("The Candidate is deleted");

    } catch (error) {
    yield call(console.error, error);
    message.error("The Candidate did not delete");

  } finally {
    yield put(setIsLoading(false));
  }
}

export function* watchCandidateSagas() {
  yield takeLatest(fetchCandidateAction, fetchCandidateSaga);
  yield takeLatest(deleteCandidateAction, deleteCandidateSaga);
  yield takeLatest(updateCandidateAction, updateCandidateSaga);
}

