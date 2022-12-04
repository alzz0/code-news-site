import PostGrid from "../post/PostGrid";
import Sidebar from "../sidebar";
import CreatePost from "../../components/post/CreatePost";
import Search from "../../components/search/Search";
import "./dashboardSearch.css";
import { PostsContext } from "../../hooks/posts/PostsContext";
import { SortTypeContext } from "../../hooks/posts/SortTypeContext";
import { useState } from "react";

const DashBoardLayout = () => {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState({
    type: "uploadDateLSI",
    page: 1,
    lastItem: "",
    lastpage: false,
  });
  return (
    <SortTypeContext.Provider value={{ sortType, setSortType }}>
      <PostsContext.Provider value={{ posts, setPosts }}>
        <>
          <nav className="dashboard-search">
            <Search />
          </nav>
          <main style={styles.mainContainer}>
            <aside style={styles.sidebar}>
              <Sidebar />
            </aside>
            <main style={styles.gridContainer}>
              <CreatePost />
              <PostGrid />
            </main>
          </main>
        </>
      </PostsContext.Provider>
    </SortTypeContext.Provider>
  );
};
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

export default DashBoardLayout;
