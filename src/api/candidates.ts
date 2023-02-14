import { SagaIterator } from 'redux-saga';

import axios from 'api/apiClient';

export const fetchCandidates = ({
  queryString,
}: {queryString: string}): SagaIterator => {
  return axios.get(`/candidates?${queryString}`);
};

export function fetchCandidate(payload: number) {
  return axios.get(`/candidates/${payload}`);
}

export function createCandidate(payload: number) {
  return axios.post(`/candidates/${payload}`);
}

export function updateCandidate(payload: number) {
  return axios.patch(`/candidates/${payload}`);
}

export function deleteCandidate(payload: number) {
  return axios.delete(`/candidates/${payload}/`, {});
}
