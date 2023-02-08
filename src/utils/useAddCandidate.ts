import { useState } from "react";
import { message } from "antd";

import moment from "moment";
import { TCandidate } from 'types/types';

export const useAddCandidate = (onSuccess: Function) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const url = "http://localhost:4000/candidates/";

  const onAddCandidate = (value: Omit<TCandidate, "addDate">) => {
    const dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
    const newValue: TCandidate = {
      ...value,
      addDate: dateNow,
    };
    setIsLoading(true);
    
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValue),
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
