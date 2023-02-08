import React from 'react';
import styles from './PageTitle.module.scss';

interface IProps {
  title: string;
}

const PageTitle: React.FC<IProps> = ({ title }:IProps) => <h1 className={styles.pageTitle}>{title}</h1>
export default PageTitle;