import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <nav>
        <li>My feed</li>
        <ul>
          <li>Popular</li>
          <li>Most upvoted</li>
          <li>Best discussions</li>
          <li>Search</li>
        </ul>
        <ul>
          <li>Bookmarks</li>
          <li>Reading history</li>
          <li>Toggle theme</li>
        </ul>
      </nav>
      <div className="empty-space"></div>
      <nav className="bottom-nav">
        <ul>
          <li>Popular</li>
          <li>Most upvoted</li>
          <li>Best discussions</li>
          <li>Search</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
