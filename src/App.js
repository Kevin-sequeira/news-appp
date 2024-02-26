import { useEffect, useState } from "react";
import "./App.css";
import News from "./News";

function App() {
  let [articles, setArticles] = useState([]);
  let [category, setCategory] = useState("india");
  let [date, setDate] = useState();

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=${category}&from=${date}&apiKey=adbcb311e7cc4a89b4da363065b5aa64`
    )
      .then((response) => response.json())
      .then((news) => {
        console.log(news.articles);
        setArticles(news.articles);
      })
      .catch((err) => {
        console.log(err);
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
        {articles.length !== 0 ? (
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
