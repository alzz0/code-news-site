import "./card.css";
import { formatDate } from "../../helpers/formatDate";
export const Card = ({ items }) => {
  const posts = items.map((post) => {
    const date = formatDate(parseInt(post.uploadDate));

    return (
      <div
        onClick={() => window.open(post.url)}
        key={post.id}
        className="cardContainer"
      >
        <div style={styles.detailsContainer}>
          <span style={styles.title}>
            {post.title.length > 50
              ? `${post.title.slice(0, 50)} ... `
              : post.title}
          </span>
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
    fontSize: "23px",
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
