import React, { useCallback, useMemo, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from "antd"
import { useSelector, useDispatch } from 'react-redux';

import {fetchCandidateAction,
  updateCandidateAction,
   getCandidate,
   getCandidateIsLoading,
   resetCandidate,
   getToHomePage,
   setToHomePage,
   deleteCandidateAction} from './store'
import CandidateForm from '../../components/CandidateForm';
import PageTitle from '../../components/PageTitle';
import moment from 'moment';
import { TCandidate } from 'types/types';

const AboutCandidate: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentId = useMemo(() => Number(id), [id]);

  const navigate = useNavigate();

  const candidate = useSelector(getCandidate);
  const isLoading = useSelector(getCandidateIsLoading);
  const toHomePage = useSelector(getToHomePage);

  useEffect(() => {
    dispatch(fetchCandidateAction(currentId));
    return () => {dispatch(resetCandidate())};
  }
  ,[dispatch, currentId])

  useEffect(()=> {
    if (toHomePage) {
      navigate("/");
      dispatch(setToHomePage(false))
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toHomePage])

  const onChangeCandidate = useCallback ((value: Omit<TCandidate, "addDate">)=> {
    const dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
    const newValue = {
      ...value,
      addDate: dateNow,
      id: currentId,
    };
    console.log("newValue onChange:", newValue)
    dispatch(updateCandidateAction(newValue))
  }, [currentId, dispatch])

  const onDelete = useCallback(() => {
    dispatch(deleteCandidateAction(currentId))
  }, [currentId, dispatch]);

  return (
    <div>
      <PageTitle title="About Candidate:" />
      <Spin spinning={isLoading}>
        <CandidateForm onFinish={onChangeCandidate} initialValues={candidate} deleteOneCandidate={onDelete} />
      </Spin>
    </div>
  );
};

export default AboutCandidate;
