import React from "react";
import CandidateForm from '../../components/CandidateForm';
import { Form, message } from "antd"
import PageTitle from '../../components/PageTitle';

const AddCandidate = () => {
  const [form] = Form.useForm();

  const onAddCandidate = (value) => {
    fetch('http://localhost:4000/candidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((value) => {
        message.success("Candidate data is upload")
        form.resetFields();
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
