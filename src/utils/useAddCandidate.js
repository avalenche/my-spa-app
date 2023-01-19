import { useState } from "react";
import { message } from "antd";

export const useAddCandidate = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);

  const onAddCandidate = (value) => {
    setIsLoading(true);
    fetch("http://localhost:4000/candidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Candidate data is upload");
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        message.error("Candidate data is not upload");
        console.error("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };
  return {
    onAddCandidate,
    isLoading,
  };
};
