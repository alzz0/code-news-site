import "./sidebar.css";
import { PostsContext } from "../../hooks/posts/PostsContext";
import { useContext } from "react";
import logo192 from "../../logo.svg";
const Sidebar = () => {
  const { setPosts } = useContext(PostsContext);

  const handleSort = (sortType) => {
    setPosts((prevState) => {
      let sortedPosts = [...prevState];
      let state = sortedPosts.sort((a, b) => b[sortType] - a[sortType]);
      return state;
    });
  };

  return (
    <div className="sidebar-container">
      <nav>
        {/* <li>
          <button onClick={handleSort('uploadDate')}>sort</button>
        </li> */}
        {/* <span>
          <li>My feed</li>
        </span> */}
        <ul className="sidebar-main">
          <li className="sidebar-header">
            <img src={logo192} width={45} alt="" />
            <span>Username</span>
          </li>

          <li
            onClick={() => handleSort("uploadDate")}
            className="sidebar-labels"
          >
            <img src={logo192} width={45} alt="" />
            Most Recent
          </li>
          <li className="sidebar-labels" onClick={() => handleSort("upVote")}>
            <img src={logo192} width={45} alt="" />
            Most Upvoted
          </li>
          <li className="sidebar-labels">
            <img src={logo192} width={45} alt="" />
            Best discussions
          </li>
          <li className="sidebar-labels">
            <img src={logo192} width={45} alt="" />
            Search
          </li>
          <li className="sidebar-labels">
            <img src={logo192} width={45} alt="" />
            Bookmarks
          </li>
          <li className="sidebar-labels">
            <img src={logo192} width={45} alt="" />
            Reading history
          </li>
          <li className="sidebar-labels">
            <img src={logo192} width={45} alt="" />
            Toggle theme
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
