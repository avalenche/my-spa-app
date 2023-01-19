import { useState } from "react";
import { message } from "antd";

export const useDeleteCandidate = (onSucces) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteCandidate = (elId) => {
    setIsLoading(true);
    fetch(`http://localhost:4000/candidates/${elId}`, {
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
