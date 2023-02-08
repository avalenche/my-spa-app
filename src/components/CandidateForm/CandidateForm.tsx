import React, {useEffect} from 'react';
import { Form, Input, Select, Button } from "antd"

import UploadImage from '../UploadImage';
import { TCandidate, TECH } from 'types/types';
import { techLabels } from 'components/TitleTable/config';

type TProps ={
  onFinish: (value: Omit<TCandidate, "addDate">) => void;
  initialValues?: TCandidate;
  deleteOneCandidate?:()=> void;
}

const { TextArea } = Input;

const CandidateForm: React.FC<TProps>  = ({ onFinish, initialValues,  deleteOneCandidate}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) form.resetFields();
  }, [initialValues, form])


  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      onFinish={onFinish}
      initialValues={initialValues}
     form={form}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
        <Input type='text' />
      </Form.Item>

      <Form.Item label="Surname" name="surname" rules={[{ required: true, message: 'Please input your Surname!' }]}>
        <Input type='text' />
      </Form.Item>

      <Form.Item name="tech" label="Tech" >
        <Select mode='multiple'>
          <Select.Option value={TECH.REACTJS}>{techLabels[TECH.REACTJS]}</Select.Option>
          <Select.Option value={TECH.HTML}>{techLabels[TECH.HTML]}</Select.Option>
          <Select.Option value={TECH.CSS}>{techLabels[TECH.CSS]}</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="About" name="about">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="uploadImage"
        label="Image"
      >
        <UploadImage name="uploadImage" maxSizeMb={5} />

      </Form.Item>

      <Form.Item label="Submit">
        <Button htmlType='submit' >Submit</Button>
      </Form.Item>

      {deleteOneCandidate && (
        <Form.Item label="Delete">
          <Button onClick={deleteOneCandidate} >Delete</Button>
        </Form.Item>
      )}

    </Form>
  )
}

export default CandidateForm;