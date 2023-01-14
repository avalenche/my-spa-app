import React, { useState } from "react";
import { Link } from "react-router-dom"
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import styles from "./appHeader.module.css"

const items = [
  {
    label: (<Link to="/">Home</Link>),
    key: 'home',
    icon: <MailOutlined />
  },
  {
    label: (<Link to="/add">Add Candidates</Link>),
    key: 'add',
    icon: <AppstoreOutlined />
  }
];

const AppHeader = () => {
  const [current, setCurrent] = useState('home');

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return <Menu className={styles.appheader} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};


export default AppHeader;
