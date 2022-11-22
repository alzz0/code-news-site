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
        setAllPosts(res.data.Items);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={styles.gridContainer}>
      <Card items={allPosts} />
    </div>
  );
};
const styles = {
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    maxWidth: "3000px",
    margin: "0 auto",
  },
};
export default PostGrid;
