export const Card = ({ items }) => {
  const posts = items.map((post) => {
    const date = new Date(parseInt(post.uploadDate)).toLocaleString();
    console.log(date);
    return (
      <div key={post.id}>
        <p>
          <a href={post.url} target="_blank" rel="noreferrer">
            <p>{post.title}</p>
            <img src={post.image} alt={post.image} width={300} />
          </a>
          <p>{date}</p>
        </p>
      </div>
    );
  });

  return posts;
};

export default Card;
