import { useState } from "react";
import { message } from "antd";
import { link } from '../const';

export const useDeleteCandidate = (onSucces: ()=> void) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const onDeleteCandidate = (elId: number) => {
    setIsLoading(true);
    fetch(link + elId, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Candidate is deleted");
        if (onSucces) onSucces();
      })
      .catch((error) => {
        message.error("Candidate data is not deleted");
        console.log("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };
  return {
    onDeleteCandidate,
    isLoading,
  };
};
