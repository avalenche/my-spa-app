import { useState} from "react";

import { link } from '../const';

export const useFethcCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCandidate, setTotalCandidate] = useState<number>();

  
  const fetchCandidates = (queryString: string) => {
    
    const queryUrl = queryString ? `${link}?${queryString}` : link;
    //   const queryUrl = `${url}${queryString || ""}`;
    setIsLoading(true);
    fetch(queryUrl)
      .then((response) => {
        const xTotalCount = response.headers.get("X-Total-Count");
        const total = xTotalCount ? Number(xTotalCount) : undefined;
        setTotalCandidate(total);
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
