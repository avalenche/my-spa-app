import React from "react";
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import CandidateForm from '../../components/CandidateForm';
import PageTitle from '../../components/PageTitle';
import { useAddCandidate } from '../../utils/useAddCandidate';


const AddCandidate = () => {
  const navigate = useNavigate();

  const toHomePage = () => navigate("/");
  const { onAddCandidate, isLoading } = useAddCandidate(toHomePage)

  return (
    <div>
      <PageTitle title="Add Candidate:" />
      <Spin spinning={isLoading}>
        <CandidateForm onFinish={onAddCandidate} isShowDelButton />
      </Spin>
    </div>

  );
};

export default AddCandidate;
