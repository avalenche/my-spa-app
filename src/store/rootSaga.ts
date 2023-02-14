import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchCandidatesSagas } from 'pages/homePage/store';

export default function* rootSaga(): SagaIterator {
  yield all([fork(watchCandidatesSagas)]);
}
