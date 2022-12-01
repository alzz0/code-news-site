import React, { useState } from "react";
import { PostsContext } from "../../hooks/posts/PostsContext";
import DashBoardLayout from "../../components/dashboard";
export default function Landing() {
  return (
    <div style={{ paddingTop: "100px" }}>
      <DashBoardLayout />
    </div>
  );
}
