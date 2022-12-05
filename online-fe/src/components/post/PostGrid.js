import { useEffect, useState, useContext } from "react";
import { Card } from "../../utils";
import { PostsContext } from "../../hooks/posts/PostsContext";
import { SortTypeContext } from "../../hooks/posts/SortTypeContext";
import useFetch from "../../hooks/posts/useFetch";
import "./postGrid.css";

const PostGrid = () => {
  const { sortType, setSortType } = useContext(SortTypeContext);
  const { page, lastPage, lastItem } = sortType;

  const { loading, error, list } = useFetch(page);
  const { posts } = useContext(PostsContext);
  console.log(sortType);

  const [backToTop, setBackToTop] = useState(false);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log(sortType);
      console.log(lastPage);
      console.log(lastItem);
      if (lastPage && !lastItem) return;
      //!lastItem

      setSortType((prevState) => ({
        type: prevState.type,
        page: prevState.page + 1,
        lastItem: lastItem,
        lastPage: prevState.lastPage,
        loading: false,
      }));
    }
  };
  const scrollToTop = () => {
    // issue is
    setBackToTop(false);
    console.log(sortType);
    setSortType((prevState) => ({
      type: prevState.type,
      page: 1,
      lastItem: prevState.lastItem,
      lastPage: prevState.lastPage,
      loading: false,
    }));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log(sortType);
  };

  const showBackUpBtn = () => {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop > 800) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", showBackUpBtn);
    return () => window.removeEventListener("scroll", showBackUpBtn);
  }, []);

  useEffect(() => {
    console.log(page);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <>
      <Card items={posts || "loading"} />

      <div
        onClick={scrollToTop}
        className={`${backToTop ? "scroll-up-btn" : "removeBtn"} `}
      >
        Back to Top
      </div>
    </>
  );
};

export default PostGrid;
