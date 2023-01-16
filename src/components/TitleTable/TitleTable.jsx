import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const TitleTable = ({ data }) => {

  const columns = [
    {
      width: "20%",
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, el) => <Link to={`/about/${el.id}`}>{text}</Link>,
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Tech',
      dataIndex: 'tech',
      key: 'tech',
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, el) => {
        console.log(el)
        return <div>ok</div>
      }
    },
  ];

  return (
    <Table rowKey="id" dataSource={data} columns={columns} />
  );
};

export default TitleTable;