import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchCandidatesSagas } from 'pages/homePage/store';
import { watchCandidateSagas } from 'pages/aboutCandidate/store';

export default function* rootSaga(): SagaIterator {
  yield all([fork(watchCandidatesSagas)]);
  yield all([fork(watchCandidateSagas)]);
}
