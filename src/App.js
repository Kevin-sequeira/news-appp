import { useEffect, useState } from "react";
import "./App.css";
import News from "./News";

function App() {
  let [articles, setArticles] = useState([]);
  let [category, setCategory] = useState("india");
  let [date, setDate] = useState();
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null); // Add error state

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    setError(null); // Reset error state
    fetch(
      `https://newsapi.org/v2/everything?q=${category}&from=${date}&apiKey=adbcb311e7cc4a89b4da363065b5aa64`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch news articles');
        }
        return response.json();
      })
      .then((news) => {
        console.log(news.articles);
        setArticles(news.articles);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setError(error); // Set error state
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after fetching data
      });
  }, [category, date]);

  return (
    <div className="App">
      <header className="header">
        <h1>Parso Tak</h1>

        <div className="inputFields">
          <input
            className="datePicker"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Search News"
            onChange={(event) => {
              if (event.target.value !== "") {
                setCategory(event.target.value);
              } else {
                setCategory("india");
              }
            }}
          ></input>
        </div>
      </header>

      <section className="news-articles">
        {loading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <h3>Error: {error.message}</h3>
        ) : articles.length !== 0 ? (
          articles.map((article, index) => {
            return <News article={article} key={index} />;
          })
        ) : (
          <h3>No News Found</h3>
        )}
      </section>
    </div>
  );
}

export default App;

