import React from "react";
import CreatePost from "../../components/post/CreatePost";
import PostGrid from "../../components/post/PostGrid";
export default function Landing() {
  return (
    <div style={{ paddingTop: "100px" }}>
      {/* <CreatePost /> */}
      <PostGrid />
    </div>
  );
}
