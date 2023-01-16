import React from "react";
import CandidateForm from '../../components/CandidateForm';
import { Form, message } from "antd"
import PageTitle from '../../components/PageTitle';
import { useNavigate } from 'react-router-dom';

const AddCandidate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const onAddCandidate = (value) => {
    fetch('http://localhost:4000/candidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Candidate data is upload")
        form.resetFields()
        navigate("/")
      })
      .catch((error) => {
        message.error("Candidate data is not upload")
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <PageTitle title="Add Candidate:" />
      <CandidateForm onFinish={onAddCandidate} form={form} />
    </div>

  );
};

export default AddCandidate;
