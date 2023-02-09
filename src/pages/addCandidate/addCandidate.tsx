import React from "react";
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

import CandidateForm from '../../components/CandidateForm';
import PageTitle from '../../components/PageTitle';
import { useAddCandidate } from '../../utils/hooks/useAddCandidate';

const AddCandidate: React.FC = () => {
  const navigate = useNavigate();

  const toHomePage = () => navigate("/");
  const { onAddCandidate, isLoading } = useAddCandidate(toHomePage)

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
