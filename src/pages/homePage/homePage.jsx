import React, { useEffect, useState } from "react";
//import styles from "./homePage.module.css"
import PageTitle from '../../components/PageTitle';
import { Empty, Spin } from 'antd';
import TitleTable from '../../components/TitleTable';

//const { content } = styles;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

const HomePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetch('http://localhost:4000/candidates', { headers })
      .then(response => response.json())
      .then(body => !cancelled && setCandidates(body))
      .finally(() => setIsLoading(false))
    return () => {
      cancelled = true;
    }
  }, [])

  return (
    <div >
      <PageTitle title="Candidates:" />

      <div>
        {
          !candidates ? <Empty /> : (
            <Spin spinning={isLoading}>
              <TitleTable data={candidates} />
            </Spin>
          )
        }
      </div>

    </div>
  );
};

export default HomePage;
