import { useState } from "react";
import "./sidebar.css";
import { PostsContext } from "../../hooks/posts/PostsContext";
import { AuthContext } from "../../hooks/AuthContext";
import { useContext } from "react";
import logo192 from "../../logo.svg";
import { AiOutlineArrowUp, AiOutlineEye } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { GiDiscussion } from "react-icons/gi";
import { BsFillBookmarkFill, BsToggles } from "react-icons/bs";
import { RiAccountPinBoxLine } from "react-icons/ri";

const Sidebar = () => {
  const [highlighted, setHighlighted] = useState("");
  const [toggleBack, setToggleBack] = useState(false);
  const [previousState, setPreviousState] = useState([]);
  const { posts, setPosts } = useContext(PostsContext);
  const { auth } = useContext(AuthContext);
  console.log(auth);

  const handleSort = (sortType) => {
    setHighlighted(sortType);
    if (toggleBack) {
      setPosts(previousState);
    } else {
      setPreviousState(posts);
      setPosts((prevState) => {
        let sortedPosts = [...prevState];
        let state = sortedPosts.sort((a, b) => b[sortType] - a[sortType]);
        return state;
      });
    }
    setToggleBack(!toggleBack);
  };

  return (
    <div className="sidebar-container">
      <nav>
        <ul className="sidebar-main">
          <li className="sidebar-header">
            <RiAccountPinBoxLine size={30} />
            <span style={{ maxWidth: "180px" }}>
              {auth?.Username.slice(0, auth.Username.indexOf("@")).slice(
                0,
                19
              ) || "Username"}
            </span>
          </li>

          <li
            onClick={() => handleSort("uploadDate")}
            className="sidebar-labels"
          >
            <BiTimeFive
              size={30}
              style={{
                color:
                  highlighted === "uploadDate" && toggleBack
                    ? "rgb(104, 132, 148)"
                    : "#fff",
              }}
            />
            <span>Most Recent</span>
          </li>
          <li className={"sidebar-labels"} onClick={() => handleSort("upVote")}>
            <AiOutlineArrowUp
              size={30}
              style={{
                color: highlighted === "upVote" ? "rgb(104, 132, 148)" : "#fff",
              }}
            />
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
