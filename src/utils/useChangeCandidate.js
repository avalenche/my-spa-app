import { message } from "antd";
import { useState } from "react";

const moment = require("moment");

export const useChangeCandidate = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:4000/candidates/";

  const onChangeCandidate = (value) => {
    const dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
    const newValue = {
      ...value,
      addDate: dateNow,
    };
    setIsLoading(true);
    fetch(url + id, {
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
