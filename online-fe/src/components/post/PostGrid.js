import { useEffect, useState, useContext } from "react";
import { Card } from "../../utils";
import { PostsContext } from "../../hooks/posts/PostsContext";
import useFetch from "../../hooks/posts/useFetch";
import "./postGrid.css";

const PostGrid = () => {
  const [page, setPage] = useState(1);
  const { loading, error, list, lastPage } = useFetch(page);
  const { posts } = useContext(PostsContext);
  const [backToTop, setBackToTop] = useState(false);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      if (lastPage) return;

      setPage((prevPage) => prevPage + 1);
    }
  };
  const scrollToTop = () => {
    setBackToTop(false);
    setPage(1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [list, page]);

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
