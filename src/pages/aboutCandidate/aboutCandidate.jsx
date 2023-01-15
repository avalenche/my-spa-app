import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Form, Spin, message } from "antd"
import CandidateForm from '../../components/CandidateForm';
import PageTitle from '../../components/PageTitle';


const AboutCandidate = () => {
  const { id } = useParams()

  const [form] = Form.useForm();


  const [candidate, setInfoAboutCandidate] = useState();
  const [isLoading, setIsLoading] = useState(false);



  const onChangeCandidate = (value) => {
    fetch(`http://localhost:4000/candidates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Candidate data is upload")
      })
      .catch((error) => {
        message.error("Candidate data is upload")
        console.log("Error:", error)
      });
  }


  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetch(`http://localhost:4000/candidates/${id}`)
      .then(response => response.json())
      .then(body => !cancelled && setInfoAboutCandidate(body))
      .finally(() => setIsLoading(false))
    return () => {
      cancelled = true;
    }
  }, [])

  return (
    <div>
      <PageTitle title="About Candidate:" />
      {(!isLoading && candidate) ? <CandidateForm onFinish={onChangeCandidate} form={form} initialValues={candidate} /> : <Spin />}
    </div>
  );
};

export default AboutCandidate;
