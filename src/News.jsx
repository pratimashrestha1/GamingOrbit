// import React from 'react'
// import Modal from './Components/Modal'
// import Theme from './Components/Intro_theme'
// import styled from 'styled-components'

// function News() {
//   return (
//     <Div>
//       <Modal />
//       <Theme title="News"
//         image='./images/news.png'
//         width='300px'
//         description=' Stay up-to-date with the latest gaming industry news, including updates on game releases, patches, esports events, and community-driven content.'
//       />
      
//     </Div >
//   )
// }

// export default News

// const Div = styled.div`
// .check{
//   background: green;
//   color: red;
//   height: 400px;
//   width: 100vw;
// }
// `



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from './Components/Modal';
import Theme from './Components/Intro_theme';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(""); // State for search query

  // Fetch news articles on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;  // Access API key from environment variables
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        console.log('API Response:', response.data);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news articles');
        setLoading(false);
      }
    };
    

    fetchNews();
  }, []);

  // Filter articles based on the search query
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>; // Consider a spinner here
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Div>
      {/* Modal and Theme Section */}
      <Modal />
      <Theme
        title="News"
        image='./images/news.png'
        width='300px'
        description='Stay up-to-date with the latest gaming industry news, including updates on game releases, patches, esports events, and community-driven content.'
      />
      
      {/* News List Section */}
      <div className="news-container">
        <h1>Latest News</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state
          className="search-bar"
          aria-label="Search News"
        />

        {/* Display filtered articles */}
        <div className="news-list">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </Div>
  );
}

export default News;

// NewsCard Component
const NewsCard = ({ article }) => (
  <CardWrapper>
    <h2>{article.title}</h2>
    <p>{article.description}</p>
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      Read more
    </a>
  </CardWrapper>
);

// Styled-components for NewsCard
const CardWrapper = styled.div`
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 1em;
    color: #555;
    margin-bottom: 10px;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Div = styled.div`
  .news-container {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .news-container h1 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
    font-family: 'Ubuntu', sans-serif;
    color: #333;
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
    border-color: #1092EA;
  }

  .news-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
    min-width: 300px;
  }

  @media (max-width: 768px) {
    .news-list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 480px) {
    .news-list {
      grid-template-columns: 1fr;
    }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 1.2em;
  margin-top: 20px;
  font-weight: bold;
`;


