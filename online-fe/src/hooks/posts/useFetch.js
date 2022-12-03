import { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { PostsContext } from "./PostsContext";

function useFetch(page, urlsuffix) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [list, setList] = useState([]);
  const [lastItem, setLastItem] = useState("");
  // const url = `${config.apiGateway.URL}${urlsuffix}`;
  // const url = `${config.apiGateway.URL}communityposts`;
  const url = `${config.apiGateway.URL}posts`;
  const { setPosts } = useContext(PostsContext);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page,
        lastItem,
      };
      if (lastPage) return;
      try {
        const res = await axios.post(url, params);

        const items = res.data.Items;

        if (res.data.LastEvaluatedKey) {
          setLastItem(res.data.LastEvaluatedKey);
          setPosts((prevState) => [...prevState, ...items]);
        } else {
          setPosts((prevState) => [...prevState, ...items]);
          setLastPage(true);
        }
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
