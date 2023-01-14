import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';


const AboutCandidate = () => {
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    let cancelled = false;
    fetch(`http://localhost:4000/candidates/${id}`)
      .then(response => response.json())
      .then(body => !cancelled && console.log(body))

    return () => {
      cancelled = true;
    }

  }, [])

  return (
    <div>
      <h1>About Candidate</h1>
    </div>
  );
};

export default AboutCandidate;
