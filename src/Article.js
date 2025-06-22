import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LibrarySearch from './LibrarySearch';
import './Article.css';

const Article = ({ article }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackNavigation = () => {
    // If there's a previous page in history, go back
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Otherwise, navigate to the library page
      navigate('/library');
    }
  };

  return (
    <div id={article.id} className="article">
      <div className="article-back-button-container">
        <button
          onClick={handleBackNavigation}
          className="article-back-button"
          aria-label="Go back to previous page"
        >
          ←
        </button>
      </div>
      <div className="article-header">
        <div className="article-search-container">
          <LibrarySearch />
        </div>
      </div>
      <h3 className="article-title">{article.title}</h3>
      <div className="article-content">{article.content}</div>
    </div>
  );
};

export default Article;
