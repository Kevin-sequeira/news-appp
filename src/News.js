export default function News(props) {
  return (
    <div className="news">
      <div className="news-img">
        {props.article.urlToImage !== null ? (
          <img src={props.article.urlToImage} alt="images of news"></img>
        ) : (
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
            alt="images of news"
          ></img>
        )}
      </div>
      <h2>{props.article.title}</h2>
      <p>
        {props.article.description?.substring(0, 100).concat("...")}
        <a href={props.article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </p>
      <div className="source">
        <p className="author">{props.article.author}</p>
        <p>{props.article.source.name}</p>
      </div>
    </div>
  );
}
