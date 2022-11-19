import React from "react";
import CreatePost from "../../components/post/CreatePost";
import PostGrid from "../../components/post/PostGrid";
export default function Landing() {
  return (
    <div>
      <CreatePost />
      <h1>Landing page</h1>
      <PostGrid />
    </div>
  );
}
