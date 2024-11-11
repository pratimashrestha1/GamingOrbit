// src/Components/News/News.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import './News.css';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // API call to fetch the latest news
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=your_actual_api_key');
        
        // Log the full response to see if it contains the articles
        console.log('News API Response:', response);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
        className="search-bar"
      />

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
  );
}

export default News;
