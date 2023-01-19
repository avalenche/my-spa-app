import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Spin } from "antd"
import CandidateForm from '../../components/CandidateForm';
import PageTitle from '../../components/PageTitle';
import { useDeleteCandidate } from '../../utils/useDeleteCandidate';
import { useChangeCandidate } from '../../utils/useChangeCandidate';


const AboutCandidate = () => {
  const { id } = useParams()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const toHomePage = () => navigate("/")

  const [candidate, setInfoAboutCandidate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoading: isLoadingDelete, onDeleteCandidate } = useDeleteCandidate(toHomePage);
  const { isLoading: isLoadingChange, onChangeCandidate } = useChangeCandidate(id);

  useEffect(() => {
    if (candidate) form.resetFields();
  }, [candidate, form])

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:4000/candidates/${id}`)
      .then(response => response.json())
      .then(body => setInfoAboutCandidate(body))
      .finally(() => setIsLoading(false))
  }, [id])

  const onDelete = useCallback(() => {
    onDeleteCandidate(id)
  }, [id, onDeleteCandidate]);

  return (
    <div>
      <PageTitle title="About Candidate:" />
      <Spin spinning={isLoading || isLoadingDelete || isLoadingChange}>
        <CandidateForm onFinish={onChangeCandidate} form={form} initialValues={candidate} deleteOneCandidate={onDelete} />
      </Spin>
    </div>
  );
};

export default AboutCandidate;
