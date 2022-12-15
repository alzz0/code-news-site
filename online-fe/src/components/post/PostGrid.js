import { useEffect, useState, useContext } from "react";
import { Card } from "../../utils";
import { PostsContext } from "../../hooks/posts/PostsContext";
import { SortTypeContext } from "../../hooks/posts/SortTypeContext";
import useFetch from "../../hooks/posts/useFetch";
import "./postGrid.css";
import CreatePost from "../post/CreatePost";

const PostGrid = () => {
  const { sortType, setSortType } = useContext(SortTypeContext);
  const { page, lastPage, lastItem } = sortType;

  const { error, list } = useFetch(page);
  const { posts } = useContext(PostsContext);

  const [backToTop, setBackToTop] = useState(false);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (lastPage && !lastItem) return;

      setSortType((prevState) => ({
        type: sortType.type,
        page: prevState.page + 1,
        lastItem: prevState.lastItem,
        lastPage: prevState.lastPage,
        loading: prevState.loading,
      }));
    }
  };
  const scrollToTop = () => {
    setBackToTop(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
  });

  return (
    <>
      {/* <CreatePost /> */}
      <main style={styles.mainContainer}>
        <main style={styles.gridContainer}>
          <Card items={posts} />
          {posts.length === 0 && (
            <img
              alt="spinner"
              id="loader-spinner"
              src={process.env.PUBLIC_URL + "/images/loadingSpinner.png"}
            />
          )}
          <div
            onClick={scrollToTop}
            className={`${backToTop ? "scroll-up-btn" : "removeBtn"} `}
          >
            Back to Top
          </div>
        </main>
      </main>
      {sortType.loading && posts.length > 0 && (
        <img
          alt="spinner"
          id="loader-posts"
          src={process.env.PUBLIC_URL + "/images/loadingSpinner.png"}
        />
      )}
    </>
  );
};

export default PostGrid;
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "250px",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    width: "250px",
    left: 0,
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "2500px",
    margin: "0 auto",
  },
};
