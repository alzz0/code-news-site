import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignInAndUp from "../pages/signInAndUp";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { PostsContext } from "../hooks/posts/PostsContext";
import { SortTypeContext } from "../hooks/posts/SortTypeContext";
import PostGrid from "../components/post/PostGrid";
import SavedPosts from "../components/savedposts/SavedPosts";
import Settings from "../components/settings/Settings";
import Profile from "../components/profile/Profile";
import authRefreshToken from "../service/authRefreshToken";

export default function Routing() {
  const [posts, setPosts] = useState([]);
  const initialThemeState = localStorage.getItem("IdToken")
    ? localStorage.getItem("theme")
    : "dark";
  const [theme, setTheme] = useState(initialThemeState);

  const [sortType, setSortType] = useState({
    type: "uploadDateLSI",
    page: 1,
    lastItem: "",
    lastpage: false,
  });

  if (theme === "dark" && localStorage.getItem("IdToken")) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  useEffect(() => {
    const verifyUser = async () => {
      authRefreshToken(
        "https://rz2sslew69.execute-api.us-east-1.amazonaws.com/dev/private"
      );
    };
    verifyUser();
  }, []);

  const themeMode = () => {
    setTheme(localStorage.getItem("theme"));
  };

  return (
    <SortTypeContext.Provider value={{ sortType, setSortType }}>
      <PostsContext.Provider value={{ posts, setPosts }}>
        <div className="app App" data-theme={theme}>
          <Router>
            <Navbar theme={theme} />
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
              <Route
                exact
                path="/profile"
                element={<Profile themeMode={themeMode} />}
              />
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
