import React, {useCallback, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import moment from 'moment';

import {addCandidateAction, getCandidatesLoading, getToHomePage, setToHomePage} from 'pages/homePage/store';
import CandidateForm from '../../components/CandidateForm';
import PageTitle from '../../components/PageTitle';
import { TCandidate } from 'types/types';


const AddCandidate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(getCandidatesLoading);
  const toHomePage = useSelector(getToHomePage);
  console.log("isLoading:" ,isLoading)
  
 const onAddCandidate = useCallback((value: Omit<TCandidate, "addDate">) => {
  
  const dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
    const newValue: TCandidate = {
      ...value,
      addDate: dateNow,
    };
    
    dispatch(addCandidateAction(newValue))
  }, [ dispatch ]);

  useEffect(()=> {
  if (toHomePage) {
  navigate("/")
  dispatch(setToHomePage(false))}}
  ,[dispatch, navigate, toHomePage])


  return (
    <div>
      <PageTitle title="Add Candidate:" />
      <Spin spinning={isLoading}>
        <CandidateForm onFinish={onAddCandidate} />
      </Spin>
    </div>

  );
};

export default AddCandidate;
