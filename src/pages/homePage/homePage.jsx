import React, { useEffect, useState } from "react";

import styles from "./homePage.module.css"
import { Link } from 'react-router-dom';
const { content } = styles;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}



const HomePage = () => {
  const [candidates, setCandidates] = useState([]);


  useEffect(() => {
    let cancelled = false;
    fetch('http://localhost:4000/candidates', { headers })
      .then(response => response.json())
      .then(body => !cancelled && setCandidates(body))
    return () => {
      cancelled = true;
    }

  }, [])


  /*useEffect(() => {
    fetch('http://localhost:4000/candidates', { headers })
      .then((response) => {
        return response.json()
      })
      .then((body) => {
        return setCandidates(body)
      })
    return () => { }

  }, [])
*/

  return (
    <div >
      <h1>Candidates:</h1>

      <div>
        {candidates.map((candidate) => {
          return <div className={content} key={candidate.id}>Name: {candidate.name}</div>
        })}
      </div>
    </div>
  );
};

export default HomePage;
