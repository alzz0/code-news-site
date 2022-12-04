import { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { SortTypeContext } from "./SortTypeContext";
import { PostsContext } from "./PostsContext";

function useFetch(page) {
  const [loading, setLoading] = useState(true);

  const { sortType, setSortType } = useContext(SortTypeContext);
  const { lastPage, lastItem, type } = sortType;
  const url = `${config.apiGateway.URL}posts`;
  const { setPosts } = useContext(PostsContext);

  useEffect(() => {
    if (sortType.loading) return;
    const fetchData = async () => {
      const params = {
        page,
        lastItem: lastItem,
        secondaryIndex: type,
      };
      if (lastPage) return;
      try {
        const res = await axios.post(url, params);
        console.log(res);
        const items = res.data.Items;

        if (res.data.LastEvaluatedKey) {
          setSortType((prevState) => ({
            type: prevState.type,
            page: prevState.page,
            lastItem: res.data.LastEvaluatedKey,
            lastPage: false,
            loading: false,
          }));
          setPosts((prevState) => [...prevState, ...items]);
        } else {
          setPosts((prevState) => [...prevState, ...items]);
          setSortType((prevState) => ({
            type: prevState.type,
            page: prevState.page,
            lastItem: res.data.LastEvaluatedKey,
            lastPage: true,
            loading: false,
          }));
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  return {
    loading,
    lastPage,
  };
}

export default useFetch;
