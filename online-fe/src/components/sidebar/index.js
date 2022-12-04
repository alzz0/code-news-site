import { useState } from "react";
import "./sidebar.css";
import { PostsContext } from "../../hooks/posts/PostsContext";
import { useContext } from "react";
import logo192 from "../../logo.svg";
import { AiOutlineArrowUp, AiOutlineEye } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { GiDiscussion } from "react-icons/gi";
import { BsFillBookmarkFill, BsToggles } from "react-icons/bs";
import { RiAccountPinBoxLine } from "react-icons/ri";
import axios from "axios";
import config from "../../config";
import { SortTypeContext } from "../../hooks/posts/SortTypeContext";

const Sidebar = () => {
  const { setSortType } = useContext(SortTypeContext);
  const { setPosts } = useContext(PostsContext);
  const username = localStorage.getItem("username");
  const url = `${config.apiGateway.URL}posts`;

  const fetchData = async (sortVal) => {
    setSortType({
      type: sortVal,
      page: 1,
      lastItem: "",
      lastPage: false,
      loading: true,
    });
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
          lastItem: res.data.LastEvaluatedKey,
          lastPage: true,
          loading: false,
        });
      }
      setPosts([...items]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (sortType) => {
    fetchData(sortType);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="sidebar-container">
      <nav>
        <ul className="sidebar-main">
          <li className="sidebar-header">
            <RiAccountPinBoxLine size={30} />
            <span style={{ maxWidth: "180px" }}>
              {(username && username) || "Username"}
            </span>
          </li>

          <li
            onClick={() => handleSort("uploadDateLSI")}
            className="sidebar-labels"
          >
            <BiTimeFive size={30} style={{}} />
            <span>Most Recent</span>
          </li>
          <li
            className={"sidebar-labels"}
            onClick={() => handleSort("upVoteLSI")}
          >
            <AiOutlineArrowUp size={30} style={{}} />
            <span>Most Upvoted</span>
          </li>
          <li className="sidebar-labels">
            <GiDiscussion size={30} />
            <span>Best discussions</span>
          </li>

          <li className="sidebar-labels">
            <BsFillBookmarkFill size={30} />
            <span>Bookmarks</span>
          </li>
          <li className="sidebar-labels">
            <AiOutlineEye size={30} />
            <span>Reading history</span>
          </li>
          <li className="sidebar-labels">
            <BsToggles size={30} />
            <span>Toggle theme</span>
          </li>
        </ul>
      </nav>
      <div className="empty-space"></div>
      <nav className="bottom-nav">
        <ul>
          <li>
            <img src={logo192} width={45} alt="" />
            <span>Settings</span>{" "}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
