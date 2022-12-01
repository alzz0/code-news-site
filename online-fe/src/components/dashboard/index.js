import PostGrid from "../post/PostGrid";
import Sidebar from "../sidebar";
import CreatePost from "../../components/post/CreatePost";
import Search from "../../components/search/Search";
import "./dashboardSearch.css";
import { PostsContext } from "../../hooks/posts/PostsContext";
import { AuthContext } from "../../hooks/AuthContext";
import { useState } from "react";
const DashBoardLayout = () => {
  const [posts, setPosts] = useState([]);
  return (
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
            {/* <CreatePost /> */}
            <PostGrid />
          </main>
        </main>
      </>
    </PostsContext.Provider>
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
