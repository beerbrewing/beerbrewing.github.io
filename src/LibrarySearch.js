import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { libraryData } from './libraryData';
import './LibrarySearch.css';

const LibrarySearch = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Memoized function to flatten articles - runs only when libraryData changes
  const flattenArticles = useCallback((data, parentPath = '') => {
    let articles = [];
    data.forEach(item => {
      if (item.articles) {
        item.articles.forEach(article => {
          articles.push({
            ...article,
            categoryPath: parentPath ? `${parentPath} > ${item.name}` : item.name
          });
        });
      }
      if (item.subcategories) {
        const subPath = parentPath ? `${parentPath} > ${item.name}` : item.name;
        articles = [...articles, ...flattenArticles(item.subcategories, subPath)];
      }
    });
    return articles;
  }, []);

  // Get all articles once - avoid recalculating on every render
  const allArticles = useMemo(() => flattenArticles(libraryData), [flattenArticles]);

  // Simple fuzzy search function - memoized to avoid recreation
  const fuzzySearch = useCallback((text, searchTerm) => {
    if (!searchTerm) return true;
    if (!text) return false;

    const normalizedText = text.toLowerCase();
    const normalizedSearch = searchTerm.toLowerCase();

    // Exact match
    if (normalizedText.includes(normalizedSearch)) return true;

    // Fuzzy match - check if characters appear in order
    let searchIndex = 0;
    for (let i = 0; i < normalizedText.length && searchIndex < normalizedSearch.length; i++) {
      if (normalizedText[i] === normalizedSearch[searchIndex]) {
        searchIndex++;
      }
    }

    return searchIndex === normalizedSearch.length;
  }, []);

  // Calculate similarity score - memoized
  const calculateSimilarity = useCallback((text, searchTerm) => {
    if (!searchTerm) return 0;
    if (!text) return 0;

    const normalizedText = text.toLowerCase();
    const normalizedSearch = searchTerm.toLowerCase();

    // Exact match gets highest score
    if (normalizedText.includes(normalizedSearch)) {
      return 100;
    }

    // Fuzzy match score
    let searchIndex = 0;
    let totalDistance = 0;
    let lastMatchIndex = -1;

    for (let i = 0; i < normalizedText.length && searchIndex < normalizedSearch.length; i++) {
      if (normalizedText[i] === normalizedSearch[searchIndex]) {
        if (lastMatchIndex !== -1) {
          totalDistance += i - lastMatchIndex - 1;
        }
        lastMatchIndex = i;
        searchIndex++;
      }
    }

    if (searchIndex === normalizedSearch.length) {
      // Return score based on how close the matches are
      return Math.max(50 - totalDistance, 10);
    }

    return 0;
  }, []);

  // Filter and sort articles based on query - recalculated only when query or search functions change
  const filteredArticles = useMemo(() => {
    if (!query.trim()) return [];

    return allArticles
      .filter(article => {
        const titleMatch = fuzzySearch(article.title, query);
        const contentMatch = fuzzySearch(article.content, query);
        const categoryMatch = fuzzySearch(article.categoryPath, query);
        return titleMatch || contentMatch || categoryMatch;
      })
      .map(article => {
        const titleScore = calculateSimilarity(article.title, query);
        const contentScore = calculateSimilarity(article.content, query);
        const categoryScore = calculateSimilarity(article.categoryPath, query);
        return {
          ...article,
          searchScore: Math.max(titleScore, contentScore, categoryScore)
        };
      })
      .sort((a, b) => {
        // Sort by search score (highest first), then alphabetically
        if (b.searchScore !== a.searchScore) {
          return b.searchScore - a.searchScore;
        }
        return a.title.localeCompare(b.title);
      });
  }, [query, allArticles, fuzzySearch, calculateSimilarity]);

  // Update query when initialQuery prop changes
  useEffect(() => {
    if (initialQuery !== undefined && initialQuery !== query) {
      setQuery(initialQuery);
      setShowDropdown(!!initialQuery);
    }
  }, [initialQuery]);

  // Handle input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowDropdown(true);
    setHighlighted(-1);
    setExpandedCategory(null);
  };

  // Navigation handler with improved error handling
  const handleSelect = useCallback((articleId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Reset UI state
    setQuery('');
    setShowDropdown(false);
    setExpandedCategory(null);

    // Navigate to article
    if (articleId) {
      navigate(`/library#${articleId}`);
    }
  }, [navigate]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlighted(h => Math.min(h + 1, filteredArticles.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlighted(h => Math.max(h - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlighted >= 0 && filteredArticles[highlighted]) {
          handleSelect(filteredArticles[highlighted].id);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  // Render search results dropdown
  const renderSearchResults = () => {
    if (!query.trim()) return null;

    return (
      <ul className="combo-dropdown" id="search-results-list" role="listbox" aria-label="Search results">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, idx) => (
            <li
              key={article.id}
              id={`search-result-${idx}`}
              className={highlighted === idx ? 'highlighted' : ''}
              onMouseDown={() => handleSelect(article.id)}
              onTouchStart={(e) => {
                e.stopPropagation();
                handleSelect(article.id, e);
              }}
              role="option"
              aria-selected={highlighted === idx}
              tabIndex={highlighted === idx ? 0 : -1}
            >
              <span className="article-title">{article.title}</span>
              <span className="article-category">{article.categoryPath}</span>
            </li>
          ))
        ) : (
          <li className="no-results" role="status">No matching articles found</li>
        )}
      </ul>
    );
  };

  return (
    <div className="library-search-combo" role="search">
      <div className="combo-row">
        <label htmlFor="library-search-input" className="sr-only">Search: </label>
        <input
          ref={inputRef}
          id="library-search-input"
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search brewery library..."
          className="combo-input"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls={showDropdown ? "search-results-list" : undefined}
          aria-activedescendant={highlighted >= 0 ? `search-result-${highlighted}` : undefined}
        />
      </div>
      {showDropdown && (
        <div className="search-dropdown-container" aria-live="polite">
          {renderSearchResults()}
        </div>
      )}
    </div>
  );
};

export default React.memo(LibrarySearch);
