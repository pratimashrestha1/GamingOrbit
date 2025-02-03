import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Components/Modal";
import Theme from "./Components/Intro_theme";
import Footer from "./Components/Footer";
import styled from "styled-components";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/postData/news`);

        // Filter and validate articles
        const validArticles = response.data.articles.filter(
          (article) =>
            article.title &&
            article.description &&
            !article.title.toLowerCase().includes("removed") &&
            !article.description.toLowerCase().includes("removed")
        );

        // Map valid articles to provide fallback for missing data
        const formattedArticles = validArticles.map((article) => ({
          title: article.title || "No title available",
          description: article.description || "No description available",
          url: article.url || null,
        }));

        setArticles(formattedArticles);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news articles");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <Div>
      <Modal />
      <Theme
        title="Esports News"
        image="./images/news.png"
        width="300px"
        description="Stay updated with the latest esports news, including Free Fire, PUBG, Clash of Clans, and other popular gaming events worldwide."
      />

      <div className="news-container">
        <h1>Latest News</h1>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
          aria-label="Search News"
        />

        <div className="news-list">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div className="news-card" key={index}>
                <h2>{article.title
                  .split(" ")
                  .slice(0, 6)
                  .join(" ")}</h2>
                <p>{
                  article.description
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")
                }</p>
                {article.url ? (
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                ) : (
                  <span>Link not available</span>
                )}
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>

      <Footer />
    </Div>
  );
}

export default News;

const Div = styled.div`
  .news-container {
    padding: 20px 10%;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    background: white;
    color: white;
    border-radius: 8px;
  }

  .news-container h1 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
    font-family: "Ubuntu", sans-serif;
    color: #4682b4;
  }

  .search-bar {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }

  .search-bar:focus {
    outline: none;
    border-color: #1092ea;
  }

  .news-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-top: 20px;
  }

  .news-list p {
    color: #000;
  }

  .news-list .news-card {
    background: #800000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;
    color: white;
  }

  .news-list .news-card:hover {
    transform: translateY(-5px);
  }

  .news-list .news-card h2 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: white;
  }

  .news-list .news-card p {
    font-size: 1em;
    color: #d3d3d3;
    margin-bottom: 10px;
  }

  .news-list .news-card a {
    color: #007bff;
    text-decoration: none;
  }

  .news-list .news-card a:hover {
    text-decoration: underline;
  }

  /* For medium screens */
  @media (max-width: 1024px) {
    .news-container {
      padding: 20px 5%;
    }

    .news-list {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* For small screens */
  @media (max-width: 768px) {
    .news-container h1 {
      font-size: 1.8em;
    }

    .news-list {
      grid-template-columns: 1fr;
    }

    .news-container {
      padding: 20px 15px;
    }
  }

  /* For extra small screens */
  @media (max-width: 480px) {
    .news-container h1 {
      font-size: 1.5em;
    }

    .news-list .news-card {
      padding: 10px;
    }

    .news-container {
      padding: 20px 10px;
    }
  }
`;
