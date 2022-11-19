import { useEffect } from "react";
import { Card } from "../../utils";
import axios from "axios";
const PostGrid = () => {
  useEffect(() => {
    axios
      .get("https://rz2sslew69.execute-api.us-east-1.amazonaws.com/dev/posts")
      .then((res) => {
        console.log(res);
      });
  }, []);

  return <div>postgrid</div>;
};

export default PostGrid;
