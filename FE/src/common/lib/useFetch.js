// 활용 코드 출처: https://github.com/velopert/learning-react

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { search } from "@/actions/searchAction";

const useFetch = (api, method, params) => {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  const {
    searchReducer: { isSearched },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSearched === false) return;

    setLoading(true);
    axios({ method: method, url: api, params: params })
      .then((response) => {
        setResolved(response.data);
        setLoading(false);
        dispatch(search(false));
      })
      .catch((e) => console.error(e));
  }, [api, isSearched]);

  return [loading, resolved, error];
};

export default useFetch;
