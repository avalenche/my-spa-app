import { SagaIterator } from 'redux-saga';

import queryString from "query-string"
import axios from 'api/apiClient';
import { TFilterData } from 'components/TitleTable/config';
import { TCandidate } from 'types/types';

export const fetchCandidates = (filterData: TFilterData): SagaIterator => {
  const query = queryString.stringify(filterData, { arrayFormat: 'bracket' });
  return axios.get(`/candidates?${query}`);
};

export function fetchCandidate(payload: number) {
  return axios.get(`/candidates/${payload}`);
}

export function createCandidate(payload: Omit<TCandidate, "id"> ) {
  return axios.post(`/candidates`, payload);
}

export function updateCandidate(payload: TCandidate  ) {
  const {id, ...rest} = payload;
  return axios.patch(`/candidates/${id}`, rest);
}

export function deleteCandidate(id: number) {
  return axios.delete(`/candidates/${id}/`, {});
}
