export {}
/*import { useState } from "react";
import { message } from "antd";

import moment from 'moment';

import { TCandidate } from 'types/types';
import { link } from '../const';


export const useChangeCandidate = (id: number) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const onChangeCandidate = (value: Omit<TCandidate, "addDate">) => {
    console.log("onChange: ", value);
    const dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
    const newValue = {
      ...value,
      addDate: dateNow,
    };
    setIsLoading(true);
    fetch(link + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValue),
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Candidate data is upload");
      })
      .catch((error) => {
        message.error("Candidate data is not upload");
        console.log("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    onChangeCandidate,
    isLoading,
  };
};
*/