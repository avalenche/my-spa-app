import { useState } from "react";

export const useFethcCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCandidates = () => {
    setIsLoading(true);
    fetch("http://localhost:4000/candidates")
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
