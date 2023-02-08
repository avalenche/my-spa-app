import React, {ChangeEvent} from 'react';
import { Input } from 'antd';
import styles from './filter.module.scss';

interface IProps {
  onFilterCandidate: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<IProps>  = ({ onFilterCandidate }: IProps) => {
  return <Input className={styles.filter} onChange={onFilterCandidate} allowClear placeholder="Search" />
}
export default Filter;