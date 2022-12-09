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

import {
  getAccessToken,
  getRefreshToken,
  getIdToken,
} from "../service/AuthService";
import axios from "axios";
export default function Routing() {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState({
    type: "uploadDateLSI",
    page: 1,
    lastItem: "",
    lastpage: false,
  });

  useEffect(() => {
    const verifyUser = async () => {
      const token = getAccessToken();
      const getrefreshtoken = getRefreshToken();
      console.log(getrefreshtoken);
      if (
        token === "undefined" ||
        token === undefined ||
        token === null ||
        !token
      ) {
        return;
      }

      const requestBody = {
        refreshToken: getRefreshToken(),
        accessToken: getAccessToken(),
        idtoken: getIdToken(),
        email: localStorage.getItem("username"),
      };
      // axios
      //   .post(
      //     "https://rz2sslew69.execute-api.us-east-1.amazonaws.com/dev/user/verify",
      //     requestBody,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${getAccessToken()}`,
      //         Accept: "application/json",
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     const { AccessToken, IdToken, ExpiresIn } = res.data.accessToken;
      //     localStorage.setItem("accessToken", AccessToken);
      //     localStorage.setItem("IdToken", IdToken);
      //     localStorage.setItem("ExpiresIn", ExpiresIn);
      //     console.log(res);
      //   });
      console.log(getAccessToken())
      axios
        .get(
          "https://rz2sslew69.execute-api.us-east-1.amazonaws.com/dev/profile1",
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => console.log(res))
        .catch(err=>console.log(err))
    };
    verifyUser();
  }, []);

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
