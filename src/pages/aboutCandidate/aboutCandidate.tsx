import React, { useCallback, useMemo } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from "antd"

import CandidateForm from '../../components/CandidateForm';
import PageTitle from '../../components/PageTitle';

import { useDeleteCandidate } from '../../utils/hooks/useDeleteCandidate';
import { useChangeCandidate } from '../../utils/hooks/useChangeCandidate';
import { useFetchAboutCandidate } from 'utils/hooks/useFetchAboutCandidate';

const AboutCandidate: React.FC = () => {
  const { id } = useParams();
  const currentId = useMemo(() => Number(id), [id]);

  const navigate = useNavigate();
  const toHomePage = () => navigate("/")

  const { isLoading: isLoadingDelete, onDeleteCandidate } = useDeleteCandidate(toHomePage);
  const { isLoading: isLoadingChange, onChangeCandidate } = useChangeCandidate(currentId);
  const {isLoading, candidate } = useFetchAboutCandidate(currentId);

  const onDelete = useCallback(() => {
    onDeleteCandidate(currentId)
  }, [currentId, onDeleteCandidate]);


  return (
    <div>
      <PageTitle title="About Candidate:" />
      <Spin spinning={isLoading || isLoadingDelete || isLoadingChange}>
        <CandidateForm onFinish={onChangeCandidate} initialValues={candidate} deleteOneCandidate={onDelete} />
      </Spin>
    </div>
  );
};

export default AboutCandidate;
