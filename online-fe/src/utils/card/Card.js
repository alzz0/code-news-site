import "./card.css";
import { formatDate } from "../../helpers/formatDate";
import { BsBookmark } from "react-icons/bs";
import authRefreshToken from "../../service/authRefreshToken";
export const Card = ({ items }) => {
  const posts = items.map((post) => {
    const date = formatDate(parseInt(post.uploadDate));

    const handleSave = (e) => {
      console.log("Save this post:", post);
      e.stopPropagation();
      authRefreshToken(
        "https://rz2sslew69.execute-api.us-east-1.amazonaws.com/dev/post/save"
      );
    };
    const handleClick = () => {
      console.log(post);
      window.open(post.url);
    };
    return (
      <div onClick={handleClick} key={post.id} className="cardContainer">
        <div style={styles.detailsContainer}>
          <span style={styles.title}>
            {post.title.length > 80
              ? `${post.title.slice(0, 80)} ... `
              : post.title}
          </span>
        </div>
        <div className="card-banner" onClick={handleSave}>
          <BsBookmark size={25} />
        </div>
        <div style={styles.imageContainer}>
          <div style={styles.readTime}>
            {" "}
            {date} - {post.readTime} min read
          </div>
          <img
            src={post.image}
            style={styles.image}
            alt={post.image}
            width={300}
            height={200}
          />
        </div>
      </div>
    );
  });

  return posts;
};

const styles = {
  cardContainer: {
    width: 300,
    height: 350,
    border: "1px solid rgba(215, 215, 215, 0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    boxShadow: "5px 5px 15px 5px #000000",
    flexWrap: "wrap",
    margin: "20px",
    borderRadius: "5px",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  title: {
    fontSize: "20px",
    textDecoration: "none",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  date: {
    fontSize: "13px",
    fontStyle: "italic",
    opacity: "0.7",
  },
  readTime: {
    fontSize: "13.5px",
    marginLeft: "10px",
    marginBottom: "10px",
  },
};

export default Card;
