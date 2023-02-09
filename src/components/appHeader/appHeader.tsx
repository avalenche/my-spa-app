import React, { useState } from "react";
import { Link } from "react-router-dom"
import { Menu } from 'antd';
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
import styles from './appHeader.module.scss';

const items = [
  {
    label: (<Link to="/">Home</Link>),
    key: 'home',
    icon: <HomeOutlined />
  },
  {
    label: (<Link to="/add">Add Candidates</Link>),
    key: 'add',
    icon: <AppstoreOutlined />
  }
];

const AppHeader: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const onClick = (e: { key: React.SetStateAction<string>; }) => {
    setCurrent(e.key);
  };

  return <Menu 
  className={styles.appheader} 
  onClick={onClick} 
  selectedKeys={[current]} 
  mode="horizontal" 
  items={items} />;
};

export default AppHeader;
