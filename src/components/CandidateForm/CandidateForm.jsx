import React from 'react';
import { Form, Input, Select, Button } from "antd"

const { TextArea } = Input;

const CandidateForm = ({ onFinish, form, initialValues, deleteOneCandidate }) => {

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      onFinish={onFinish}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
        <Input type='text' />
      </Form.Item>
      <Form.Item label="Surname" name="surname" rules={[{ required: true, message: 'Please input your Surname!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="tech" label="Tech" >
        <Select mode='multiple'>
          <Select.Option value="ReastJS">ReastJS</Select.Option>
          <Select.Option value="HTML">HTML</Select.Option>
          <Select.Option value="CSS">CSS</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="About" name="about">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Submit">
        <Button htmlType='submit' >Send</Button>

      </Form.Item>
      <Form.Item label="Delete">
        <Button onClick={deleteOneCandidate} >Send</Button>

      </Form.Item>
    </Form>
  )
}

export default CandidateForm;