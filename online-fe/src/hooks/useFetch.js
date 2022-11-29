import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../config";

function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [list, setList] = useState([]);
  const [lastItem, setLastItem] = useState("");
  const url = `${config.apiGateway.URL}posts`;

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page,
        lastItem,
      };
      if (lastPage) return;
      try {
        const res = await axios.post(url, params);
        console.log(res);
        const items = res.data.Items;

        if (res.data.LastEvaluatedKey) {
          setLastItem(res.data.LastEvaluatedKey.id);
          setList((prevState) => [...prevState, ...items]);
        } else {
          setList((prevState) => [...prevState, ...items]);
          setLastPage(true);
        }
        console.log(lastItem);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  return {
    list,
    loading,
    lastPage,
  };
}

export default useFetch;
