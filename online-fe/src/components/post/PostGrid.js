import { useEffect, useState } from "react";
import { Card } from "../../utils";
import axios from "axios";
import config from "../../config";
const PostGrid = () => {
  const [allPosts, setAllPosts] = useState([]);
  const urlApi = `${config.apiGateway.URL}posts`;
  useEffect(() => {
    axios
      .get(urlApi)
      .then((res) => {
        console.log(res);
        setAllPosts(res.data.Items);
      })
      .catch((error) => console.log(error));
  }, []);

  return <Card items={allPosts} />;
};

export default PostGrid;
