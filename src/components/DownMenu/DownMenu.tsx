import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Popover, Space } from 'antd';
import { Link } from 'react-router-dom';

interface IProps {
  id: number;
  deleteEl: ()=> void;
}

const DownMenu: React.FC<IProps>  = ({ id, deleteEl }) => {


  const content = <div>
    <Space direction="vertical">
      <Link to={`about/${id}`} ><Button>About</Button></Link >
      <Button danger onClick={deleteEl} >Delete</Button >
    </Space>
  </div>


  return (
    <Popover placement="bottomRight" content={content} >
      <Button shape='circle' icon={<MoreOutlined />} />
    </ Popover>
  )
}
export default DownMenu;