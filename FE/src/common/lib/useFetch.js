// 활용 코드 출처: https://github.com/velopert/learning-react

import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (api) => {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(api)
      .then((response) => {
        setResolved(response.data);
        setLoading(false);
      })
      .catch((e) => setError(e));
  }, [api]);

  return [loading, resolved, error];
};

export default useFetch;
