import React from 'react';
import { Form, Input, Select, Button } from "antd"

const { TextArea } = Input;

const CandidateForm = ({ onFinish, initialValues, form, deleteOneCandidate, isShowDelButton }) => {

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
        <Input />
      </Form.Item>

      <Form.Item name="tech" label="Tech" >
        <Select mode='multiple'>
          <Select.Option value="reactjs">ReastJS</Select.Option>
          <Select.Option value="html">HTML</Select.Option>
          <Select.Option value="css">CSS</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="About" name="about">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Submit">
        <Button htmlType='submit' >Submit</Button>
      </Form.Item>

      {isShowDelButton && (
        <Form.Item label="Delete">
          <Button onClick={deleteOneCandidate} >Delete</Button>
        </Form.Item>
      )}

    </Form>
  )
}

export default CandidateForm;