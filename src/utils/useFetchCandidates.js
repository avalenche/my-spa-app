import { useState } from "react";

export const useFethcCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCandidate, setTotalCandidate] = useState();

  const url = "http://localhost:4000/candidates/";

  const fetchCandidates = (queryString) => {
    
    const queryUrl = queryString ? `${url}?${queryString}` : url;
    //   const queryUrl = `${url}${queryString || ""}`;
    setIsLoading(true);
    fetch(queryUrl)
      .then((response) => {
        setTotalCandidate(response.headers.get("X-Total-Count"));
        return response.json();
      })
      .then((body) => setCandidates(body))
      .finally(() => setIsLoading(false));
  };
  return {
    totalCandidate,
    candidates,
    isLoading,
    fetchCandidates,
  };
};
