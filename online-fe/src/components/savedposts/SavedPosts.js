import { useState } from "react";
import PostGrid from "../post/PostGrid";
import "./savedPosts.css";
const SavedPosts = () => {
  const [saved, setSaved] = useState(false);
  console.log(saved);
  return (
    <div className="savedContainer">
      <div className="savedHeader">
        <h1 className="savedTitle">Saved</h1>
      </div>
      {saved ? (
        <PostGrid />
      ) : (
        <div className="savedBody">
          <h4>
            Nothing to see here yet. Checkout the news feed and Click the saved
            icon on the content you like
          </h4>
        </div>
      )}
    </div>
  );
};

export default SavedPosts;
