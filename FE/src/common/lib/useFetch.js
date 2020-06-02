// 활용 코드 출처: https://github.com/velopert/learning-react

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useFetch = (api, method, params) => {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  const testData = useSelector((state) => state);

  useEffect(() => {
    setLoading(true);
    axios({ method: method, url: api, params: params })
      .then((response) => {
        setResolved(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((e) => setError(e));
  }, [api]);

  return [loading, resolved, error];
};

export default useFetch;
