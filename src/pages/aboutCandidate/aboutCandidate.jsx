import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Spin, message } from "antd"
import CandidateForm from '../../components/CandidateForm';
import PageTitle from '../../components/PageTitle';


const AboutCandidate = () => {
  const { id } = useParams()
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [candidate, setInfoAboutCandidate] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const onDeleteCandidate = () => {
    fetch(`http://localhost:4000/candidates/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Candidate is deleted")
        navigate("/")
      })
      .catch((error) => {
        message.error("Candidate data is not deleted")
        console.log("Error:", error)
      })

  }
  /* <Spin spinning={isLoading && !candidate}>
         <CandidateForm onFinish={onChangeCandidate} form={form} initialValues={candidate} deleteOneCandidate={onDeleteCandidate} />
       </Spin>*/
  /*
   {(!isLoading && candidate) ? <CandidateForm onFinish={onChangeCandidate} form={form} initialValues={candidate} deleteOneCandidate={onDeleteCandidate} /> : <Spin />}
  */
  //console.log(!isLoading && candidate)
  return (
    <div>
      <PageTitle title="About Candidate:" />
      {(!isLoading && candidate) ? <CandidateForm onFinish={onChangeCandidate} form={form} initialValues={candidate} deleteOneCandidate={onDeleteCandidate} /> : <Spin />}    </div>
  );
};

export default AboutCandidate;
