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
import { RiAccountPinBoxLine } from "react-icons/ri";
import { MdAccessTimeFilled } from "react-icons/md";
import axios from "axios";
import config from "../../config";
import { SortTypeContext } from "../../hooks/posts/SortTypeContext";

const Sidebar = () => {
  const [selectedLabel, setSelecetedLabel] = useState("recent");
  const { sortType, setSortType } = useContext(SortTypeContext);
  const { setPosts } = useContext(PostsContext);
  const username = localStorage.getItem("username");
  const url = `${config.apiGateway.URL}posts`;

  const fetchData = async (sortVal) => {
    const params = {
      page: 1,
      lastItem: "",
      secondaryIndex: sortVal,
    };
    try {
      const res = await axios.post(url, params);
      const items = res.data.Items;
      console.log(res);
      if (res.data.LastEvaluatedKey) {
        console.log(1);
        setSortType({
          type: sortVal,
          page: 1,
          lastItem: res.data.LastEvaluatedKey,
          lastPage: false,
          loading: false,
        });
      } else {
        console.log(2);
        setSortType({
          type: sortVal,
          page: 1,
          lastItem: "",
          lastPage: true,
          loading: false,
        });
      }
      console.log(sortType);
      setPosts([...items]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (sorttype, label) => {
    console.log(sorttype);
    console.log(sortType);
    setSelecetedLabel(label);
    if (sorttype !== sortType.type) {
      fetchData(sorttype);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleClick = (label) => {
    setSelecetedLabel(label);
  };

  return (
    <div className="sidebar-container">
      <nav>
        <ul className="sidebar-main">
          <li className="sidebar-header">
            <span className="label-icon">
              <RiAccountPinBoxLine size={30} />
            </span>
            <span className="label-text">
              {(username && username) || "Username"}
            </span>
          </li>

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

          <li
            className="sidebar-labels"
            onClick={() => handleClick("bookmark")}
          >
            <span className="label-icon">
              {selectedLabel === "bookmark" ? (
                <BsFillBookmarkFill size={30} />
              ) : (
                <BsBookmark size={30} />
              )}
            </span>
            <span className="label-text">Bookmarks</span>
          </li>
          <li className="sidebar-labels" onClick={() => handleClick("history")}>
            <span className="label-icon">
              {selectedLabel === "history" ? (
                <AiFillEye size={30} />
              ) : (
                <AiOutlineEye size={30} />
              )}
            </span>
            <span className="label-text">Reading history</span>
          </li>
          <li className="sidebar-labels">
            <span className="label-icon">
              <BsToggles size={30} />
            </span>
            <span className="label-text">Toggle theme</span>
          </li>
        </ul>
      </nav>
      <div className="empty-space"></div>
      <nav className="bottom-nav">
        <ul>
          <li onClick={() => handleClick("settings")}>
            <img src={logo192} width={45} alt="" />
            <span>Settings</span>{" "}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
