import PostGrid from "../post/PostGrid";
import Sidebar from "../sidebar";
import CreatePost from "../../components/post/CreatePost";

const DashBoardLayout = () => {
  return (
    <main style={styles.mainContainer}>
      <aside style={styles.sidebar}>
        <Sidebar />
      </aside>
      <main style={styles.gridContainer}>
        {/* <CreatePost /> */}
        <PostGrid />
      </main>
    </main>
  );
};
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "250px",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    width: "250px",
    left: 0,
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "2500px",
    margin: "0 auto",
  },
};

export default DashBoardLayout;
