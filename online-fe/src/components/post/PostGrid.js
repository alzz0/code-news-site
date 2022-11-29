import { useEffect, useState } from "react";
import { Card } from "../../utils";

import useFetch from "../../hooks/useFetch";

const PostGrid = () => {
  const [page, setPage] = useState(1);
  const { loading, error, list, lastPage } = useFetch(page);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      if (lastPage) return;
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    console.log(list);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [list]);

  if (loading) {
    return "loading";
  } else {
    return <Card items={list} />;
  }
};

export default PostGrid;
