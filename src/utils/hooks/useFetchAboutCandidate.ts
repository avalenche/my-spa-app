export {}
/*import { useEffect, useState } from 'react';

import { link } from 'utils/const';

export const useFetchAboutCandidate = (currentId: number) => {
  const [candidate, setInfoAboutCandidate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(link + currentId)
      .then(response => response.json())
      .then(body => setInfoAboutCandidate(body))
      .finally(() => setIsLoading(false))
  }, [currentId])

  return {
    isLoading,
    candidate,
  }

};
*/