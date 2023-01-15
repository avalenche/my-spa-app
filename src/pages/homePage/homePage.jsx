import React, { useEffect, useState } from "react";
import styles from "./homePage.module.css"
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { Spin } from 'antd';


const { content } = styles;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}
//const [isLoading, setIsLoading] = useState(false);


const HomePage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    let cancelled = false;
    //setIsLoading(true);
    fetch('http://localhost:4000/candidates', { headers })
      .then(response => response.json())
      .then(body => !cancelled && setCandidates(body))
    // .finally(() => setIsLoading(false))
    return () => {
      cancelled = true;
    }

  }, [])

  return (


    <div >

      <PageTitle title="Candidates:" />
      <div>{

        candidates.map((candidate) => {
          return <Link to={`/about/${candidate.id}`} className={content} key={candidate.id}>Name: {candidate.name}</Link>
        })
      }

      </div>

    </div>
  );
};

export default HomePage;
