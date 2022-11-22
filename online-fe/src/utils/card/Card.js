export const Card = ({ items }) => {
  const posts = items.map((post) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const date = new Date(parseInt(post.uploadDate)).toLocaleDateString(
      "en-US",
      options
    );

    return (
      <div
        onClick={() => window.open(post.url)}
        key={post.id}
        style={styles.cardContainer}
      >
        <img src={post.image} alt={post.image} width={350} height={250} />

        <div style={styles.detailsContainer}>
          <span style={styles.title}>{post.title}</span>
          <span>{date}</span>
        </div>
      </div>
    );
  });

  return posts;
};

const styles = {
  cardContainer: {
    width: 350,
    height: 350,
    border: "1px solid rgba(215, 215, 215, 0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    boxShadow: "5px 5px 15px 5px #000000",
    flexWrap: "wrap",
    margin: "40px",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "23px",
    textDecoration: "none",
  },
  date: {
    fontSize: "13px",
    fontStyle: "italic",
    opacity: "0.7",
  },
};

export default Card;
