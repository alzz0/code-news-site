import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignInAndUp from "../pages/signInAndUp";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { PostsContext } from "../hooks/posts/PostsContext";
import { SortTypeContext } from "../hooks/posts/SortTypeContext";
import PostGrid from "../components/post/PostGrid";
import SavedPosts from "../components/savedposts/SavedPosts";
import Settings from "../components/settings/Settings";

export default function Routing() {
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
        <div>
          <Router>
            <Navbar />
            <main style={styles.mainContainer}>
              <aside style={styles.sidebar}>
                <Sidebar />
              </aside>
            </main>
            <Routes>
              <Route exact path="/" element={<PostGrid />} />
              <Route exact path="/saved" element={<SavedPosts />} />
              <Route exact path="/settings" element={<Settings />} />
              <Route exact path="/signin" element={<SignInAndUp />} />
            </Routes>
          </Router>
        </div>
      </PostsContext.Provider>
    </SortTypeContext.Provider>
  );
}

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "250px",
    paddingTop: "100px",
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
