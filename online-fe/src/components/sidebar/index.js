import { useState } from "react";
import "./sidebar.css";
import { PostsContext } from "../../hooks/posts/PostsContext";
import { useContext } from "react";
import logo192 from "../../logo.svg";
import {
  AiOutlineFire,
  AiOutlineEye,
  AiFillFire,
  AiFillEye,
} from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill, BsToggles } from "react-icons/bs";
import { RiAccountPinBoxLine, RiAccountPinBoxFill } from "react-icons/ri";
import { MdAccessTimeFilled } from "react-icons/md";
import axios from "axios";
import config from "../../config";
import { SortTypeContext } from "../../hooks/posts/SortTypeContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../service/AuthService";
import authRefreshToken from "../../service/authRefreshToken";
import savedPost from "./savedPosts";
const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedLabel, setSelecetedLabel] = useState("recent");
  const { sortType, setSortType } = useContext(SortTypeContext);
  const { setPosts } = useContext(PostsContext);
  const username = localStorage.getItem("username");
  const url = `${config.apiGateway.URL}posts`;

  const fetchData = async (sorttype) => {
    console.log(selectedLabel);
    if (selectedLabel) {
      setPosts([]);
    }
    const params = {
      page: 1,
      lastItem: "",
      secondaryIndex: sorttype,
    };

    setSortType({
      type: sorttype,
      page: 1,
      lastItem: "",
      lastPage: false,
      loading: true,
    });

    try {
      const res = await axios.post(url, params);
      console.log(res);
      const items = res.data.Items;

      if (res.data.LastEvaluatedKey) {
        setSortType({
          type: sorttype,
          page: 1,
          lastItem: res.data.LastEvaluatedKey,
          lastPage: false,
          loading: false,
        });
      } else {
        setSortType({
          type: sorttype,
          page: 1,
          lastItem: "",
          lastPage: true,
          loading: false,
        });
      }

      setPosts([...items]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (sorttype, label) => {
    setSelecetedLabel(label);
    if (sorttype !== sortType.type) {
      fetchData(sorttype);
      window.scrollTo({
        top: 0,
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    navigate("/");
  };

  const handleSave = async () => {
    const payload = { user: getUser() };
    const data = await savedPost(
      "https://rz2sslew69.execute-api.us-east-1.amazonaws.com/dev/post/getsaved",
      payload
    );
    const items = data.data;
    setPosts([...items]);

    console.log(data);
    setSortType({
      type: "",
      page: 1,
      lastItem: "",
      lastPage: false,
      loading: true,
    });
    // fetchData(sorttype);
    window.scrollTo({
      top: 0,
    });
  };

  const handleClick = (label) => {
    navigate(`/${label}`);
    console.log(label);
    setSelecetedLabel(label);
    if (label === "saved") {
      handleSave();
    }
  };

  return (
    <div className="sidebar-container">
      <nav>
        <ul className="sidebar-main">
          {getUser() && (
            <li
              className="sidebar-header"
              onClick={() => handleClick("profile")}
            >
              <span className="label-icon">
                {selectedLabel === "profile" ? (
                  <RiAccountPinBoxFill size={30} />
                ) : (
                  <RiAccountPinBoxLine size={30} />
                )}
              </span>
              <span className="label-text">
                {(username && username.split("@")[0]) || "Username"}
              </span>
            </li>
          )}

          <li
            onClick={() => handleSort("uploadDateLSI", "recent")}
            className="sidebar-labels"
          >
            <span className="label-icon">
              {selectedLabel === "recent" ? (
                <MdAccessTimeFilled size={30} />
              ) : (
                <BiTimeFive size={30} style={{}} />
              )}
            </span>

            <span className="label-text">Most Recent</span>
          </li>
          {/* <li
            className={"sidebar-labels"}
            onClick={() => handleSort("upVoteLSI")}
          >
            <AiOutlineArrowUp size={30} style={{}} />
            <span className="label-text">Most Upvoted</span>
          </li> */}
          <li
            className="sidebar-labels"
            onClick={() => handleSort("recommendedLSI", "recommended")}
          >
            <span className="label-icon">
              {selectedLabel === "recommended" ? (
                <AiFillFire size={30} />
              ) : (
                <AiOutlineFire size={30} />
              )}
            </span>
            <span className="label-text">Recommended</span>
          </li>

          <li className="sidebar-labels" onClick={() => handleClick("saved")}>
            <span className="label-icon">
              {selectedLabel === "saved" ? (
                <BsFillBookmarkFill size={30} />
              ) : (
                <BsBookmark size={30} />
              )}
            </span>
            {/* <NavLink to="/saved"> */}
            <span className="label-text">Saved</span>
            {/* </NavLink> */}
          </li>
          {/* <li className="sidebar-labels" onClick={() => handleClick("history")}>
            <span className="label-icon">
              {selectedLabel === "history" ? (
                <AiFillEye size={30} />
              ) : (
                <AiOutlineEye size={30} />
              )}
            </span>
 <span className="label-text">Reading history</span>
          </li> */}
          {/*
          <li className="sidebar-labels">
            <span className="label-icon">
              <BsToggles size={30} />
            </span>
            <span className="label-text">Toggle theme</span>
          </li> */}
        </ul>
      </nav>
      <div className="empty-space"></div>
      {getUser() && (
        <nav className="bottom-nav">
          <ul>
            <li onClick={() => handleClick("settings")}>
              <img src={logo192} width={45} alt="" />
              <span>Settings</span>{" "}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
