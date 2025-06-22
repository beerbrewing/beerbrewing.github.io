import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { allArticles } from './libraryData';
import './LibrarySearch.css';

const LibrarySearch = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.content.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => a.title.localeCompare(b.title));

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
    setHighlighted(-1);
  };

  const handleSelect = (articleId) => {
    setQuery('');
    setShowDropdown(false);
    navigate(`/library#${articleId}`);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === 'ArrowDown') {
      setHighlighted(h => Math.min(h + 1, filteredArticles.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && highlighted >= 0) {
      handleSelect(filteredArticles[highlighted].id);
    }
  };

  return (
    <div className="library-search-combo" onBlur={handleBlur}>
      <div className="combo-row">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search Pyrmont Brewery Library"
          className="combo-input"
        />
      </div>
      {showDropdown && filteredArticles.length > 0 && (
        <ul className="combo-dropdown">
          {filteredArticles.map((article, idx) => (
            <li
              key={article.id}
              className={highlighted === idx ? 'highlighted' : ''}
              onMouseDown={() => handleSelect(article.id)}
            >
              {article.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibrarySearch;

