import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { allArticles, categories } from './libraryData';
import './LibrarySearch.css';

const LibrarySearch = () => {
  const [query, setQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery) {
      const filtered = allArticles.filter(article =>
        article.title.toLowerCase().includes(newQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(newQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(allArticles);
    }
  };

  return (
    <div className="library-search">
      <h3>Search the Brewery Library</h3>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search articles..."
      />
      <select>
        {categories.map(category => (
          <optgroup label={category.name} key={category.name}>
            {filteredArticles
              .filter(article => category.articles.find(ca => ca.id === article.id))
              .map(article => (
                <option key={article.id} value={article.id}>
                  <Link to={`/library#${article.id}`}>{article.title}</Link>
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default LibrarySearch;

