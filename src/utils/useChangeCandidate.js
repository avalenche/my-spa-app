import { message } from "antd";
import { useState } from "react";

export const useChangeCandidate = (id) => {
  const [isLoading, setIsLoading] = useState(false);

  const onChangeCandidate = (value) => {
    setIsLoading(true);
    fetch(`http://localhost:4000/candidates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Candidate data is upload");
      })
      .catch((error) => {
        message.error("Candidate data is upload");
        console.log("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    onChangeCandidate,
    isLoading,
  };
};
