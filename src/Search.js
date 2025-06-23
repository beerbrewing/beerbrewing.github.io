import React, { useEffect } from 'react';
import './Search.css';

const Search = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = React.useState(initialQuery);

  // Update the query state when initialQuery prop changes
  useEffect(() => {
    setQuery(initialQuery);

    // If there's an initial query, trigger the search automatically
    if (initialQuery) {
      onSearch(initialQuery);
    }
  }, [initialQuery, onSearch]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Optional: Auto-search as you type
    onSearch(newQuery);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  // Handle Enter key press for search
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for articles..."
        className="search-input"
        aria-label="Search for articles"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default Search;
