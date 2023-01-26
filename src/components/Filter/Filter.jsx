import React from 'react';
import { Input } from 'antd';
import styles from "./filter.module.css"

const Filter = ({ onFilterCandidate }) => {
  return <Input className={styles.filter} onChange={onFilterCandidate} allowClear placeholder="Search" />
}
export default Filter;