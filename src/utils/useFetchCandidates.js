import { useState } from "react";

export const useFethcCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:4000/candidates/";

  const fetchCandidates = (queryString) => {
    setIsLoading(true);
    fetch(url + queryString)
      .then((response) => response.json())
      .then((body) => setCandidates(body))
      .finally(() => setIsLoading(false));
  };
  return {
    candidates,
    isLoading,
    fetchCandidates,
  };
};
