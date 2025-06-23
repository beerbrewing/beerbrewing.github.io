import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { libraryData } from './libraryData';
import './LibrarySearch.css';

const flattenArticles = (data, parentPath = '') => {
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
      articles = articles.concat(flattenArticles(item.subcategories, subPath));
    }
  });
  return articles;
};

// Simple fuzzy search function
const fuzzySearch = (text, searchTerm) => {
  if (!searchTerm) return true;

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
};

// Calculate similarity score for better ranking
const calculateSimilarity = (text, searchTerm) => {
  if (!searchTerm) return 0;

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
};

const LibrarySearch = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [touchHoldTimer, setTouchHoldTimer] = useState(null);
  const [subcategoryPosition, setSubcategoryPosition] = useState({});
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const allArticles = flattenArticles(libraryData);

  const filteredArticles = allArticles.filter(article => {
    const titleMatch = fuzzySearch(article.title, query);
    const contentMatch = fuzzySearch(article.content, query);
    const categoryMatch = fuzzySearch(article.categoryPath, query);

    return titleMatch || contentMatch || categoryMatch;
  }).map(article => {
    const titleScore = calculateSimilarity(article.title, query);
    const contentScore = calculateSimilarity(article.content, query);
    const categoryScore = calculateSimilarity(article.categoryPath, query);

    return {
      ...article,
      searchScore: Math.max(titleScore, contentScore, categoryScore)
    };
  }).sort((a, b) => {
    // Sort by search score (highest first), then alphabetically
    if (b.searchScore !== a.searchScore) {
      return b.searchScore - a.searchScore;
    }
    return a.title.localeCompare(b.title);
  });

  const calculateSubcategoryPosition = (categoryElement, categoryId) => {
    if (!categoryElement) return {};

    const rect = categoryElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const dropdownContainer = document.querySelector('.search-dropdown-container');
    const containerRect = dropdownContainer ? dropdownContainer.getBoundingClientRect() : null;

    // Default position - partially visible to allow parent category access
    let position = {
      left: '60%', // Only cover 60% from the left, leave 40% of the category visible
      top: '0',
      maxHeight: '100%',
      maxWidth: '500px',
      minWidth: '350px',
      width: '80%', // Only use 80% of the available width
      opacity: '0.98', // Slight transparency
      background: 'rgba(255, 255, 255, 0.95)' // Semi-transparent background
    };

    // Check if there's enough space to the right
    const spaceToRight = windowWidth - rect.right;
    const spaceToLeft = rect.left;
    const spaceBelow = windowHeight - rect.top;
    const spaceAbove = rect.top;

    // If not enough space to the right, position to the left but still keep parent partially visible
    if (spaceToRight < 400) {
      position.left = 'auto';
      position.right = '60%'; // Cover 60% from the right, leave 40% visible on left
    }

    // Adjust height based on available vertical space
    if (spaceBelow < 400) {
      position.top = 'auto';
      position.bottom = '0';
      position.maxHeight = `${Math.min(spaceAbove, 600)}px`;
    } else {
      position.maxHeight = `${Math.min(spaceBelow, 600)}px`;
    }

    // Adjust width based on available horizontal space
    if (spaceToRight < 400 && spaceToLeft < 400) {
      position.maxWidth = `${Math.min(spaceToRight, spaceToLeft) - 20}px`;
      position.minWidth = '250px';
    }

    // Ensure the subcategory panel doesn't go outside the viewport
    if (containerRect) {
      const containerRight = containerRect.right;
      const containerLeft = containerRect.left;

      // If subcategory would extend beyond right edge of viewport
      if (rect.right + 400 > windowWidth) {
        position.left = 'auto';
        position.right = '60%'; // Still ensure parent visibility
        position.maxWidth = `${Math.min(spaceToLeft - 20, 500)}px`;
      }

      // If subcategory would extend beyond left edge of viewport
      if (rect.left - 400 < 0) {
        position.left = '60%'; // Still ensure parent visibility
        position.right = 'auto';
        position.maxWidth = `${Math.min(spaceToRight - 20, 500)}px`;
      }
    }

    return position;
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
    setHighlighted(-1);
    setExpandedCategory(null);
  };

  // Add this helper function to check if there are any search results
  const hasSearchResults = query.trim() !== '' && filteredArticles.length > 0;

  const handleSelect = (articleId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Close all dropdown menus first
    setQuery('');
    setShowDropdown(false);
    setExpandedCategory(null);

    // Navigate to the article with a slight delay to ensure UI state is updated
    setTimeout(() => {
      navigate(`/library#${articleId}`);
    }, 50);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      setExpandedCategory(null);
    }, 200);
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

  const handleCategoryHover = (categoryId, categoryElement) => {
    setExpandedCategory(categoryId);
    if (categoryElement) {
      const position = calculateSubcategoryPosition(categoryElement, categoryId);
      setSubcategoryPosition(prev => ({ ...prev, [categoryId]: position }));
    }
  };

  const handleCategoryLeave = () => {
    setExpandedCategory(null);
  };

  const handleCategoryTouchStart = (categoryId, categoryElement, e) => {
    e.stopPropagation();

    // Start touch hold timer
    const timer = setTimeout(() => {
      setExpandedCategory(categoryId);
      if (categoryElement) {
        const position = calculateSubcategoryPosition(categoryElement, categoryId);
        setSubcategoryPosition(prev => ({ ...prev, [categoryId]: position }));
      }
    }, 500); // 500ms hold time

    setTouchHoldTimer(timer);
  };

  const handleCategoryTouchEnd = (e) => {
    e.stopPropagation();

    // Clear the touch hold timer
    if (touchHoldTimer) {
      clearTimeout(touchHoldTimer);
      setTouchHoldTimer(null);
    }
  };

  const handleCategoryTouchMove = (e) => {
    // Clear timer if user moves finger
    if (touchHoldTimer) {
      clearTimeout(touchHoldTimer);
      setTouchHoldTimer(null);
    }
  };

  const handleCategoryClick = (categoryId, categoryElement) => {
    const newExpanded = expandedCategory === categoryId ? null : categoryId;
    setExpandedCategory(newExpanded);
    if (newExpanded && categoryElement) {
      const position = calculateSubcategoryPosition(categoryElement, categoryId);
      setSubcategoryPosition(prev => ({ ...prev, [categoryId]: position }));
    }
  };

  const handleArticleTouch = (articleId, e) => {
    e.preventDefault();  // Prevent default behavior
    e.stopPropagation(); // Stop event from bubbling up

    // Use a small timeout to ensure event propagation is fully stopped
    setTimeout(() => {
      handleSelect(articleId);
    }, 10);
  };

  const handleArticleClick = (articleId, e) => {
    e.preventDefault();  // Prevent default behavior
    e.stopPropagation(); // Stop event from bubbling up

    // Use a small timeout to ensure event propagation is fully stopped
    setTimeout(() => {
      handleSelect(articleId);
    }, 10);
  };

  // Recalculate positions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (expandedCategory) {
        const categoryElement = document.querySelector(`[data-category-id="${expandedCategory}"]`);
        if (categoryElement) {
          const position = calculateSubcategoryPosition(categoryElement, expandedCategory);
          setSubcategoryPosition(prev => ({ ...prev, [expandedCategory]: position }));
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [expandedCategory]);

  const renderCategoryDropdown = () => {
    // If we have a query and matching articles, show the search results
    if (query.trim() !== '') {
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
                  handleSelect(article.id);
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
    }

    // Otherwise, show the category grid with improved accessibility
    return (
      <div className="category-grid" role="menu" aria-label="Article categories">
        {libraryData.map((category, index) => (
          <div
            key={category.id}
            data-category-id={category.id}
            className={`category-item ${expandedCategory === category.id ? 'expanded' : ''}`}
            onMouseEnter={(e) => handleCategoryHover(category.id, e.currentTarget)}
            onMouseLeave={handleCategoryLeave}
            onClick={(e) => handleCategoryClick(category.id, e.currentTarget)}
            onTouchStart={(e) => handleCategoryTouchStart(category.id, e.currentTarget, e)}
            onTouchEnd={handleCategoryTouchEnd}
            onTouchMove={handleCategoryTouchMove}
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={expandedCategory === category.id}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCategoryClick(category.id, e.currentTarget);
              }
            }}
          >
            <div className="category-header">
              <h3>{category.name}</h3>
              <span className="article-count" aria-label={`${category.articles ? category.articles.length : 
                category.subcategories ? 
                  category.subcategories.reduce((total, sub) => total + (sub.articles ? sub.articles.length : 0), 0) : 0} articles in this category`}>
                {category.articles ? category.articles.length :
                 category.subcategories ?
                   category.subcategories.reduce((total, sub) => total + (sub.articles ? sub.articles.length : 0), 0) : 0} articles
              </span>
            </div>

            {expandedCategory === category.id && (
              <div
                className="subcategory-panel"
                style={subcategoryPosition[category.id] || {}}
                role="region"
                aria-label={`${category.name} subcategories and articles`}
              >
                {category.articles && (
                  <div className="articles-list" role="list" aria-label={`Articles in ${category.name}`}>
                    {category.articles.map(article => (
                      <div
                        key={article.id}
                        className="article-item"
                        onClick={(e) => handleArticleClick(article.id, e)}
                        onTouchStart={(e) => handleArticleTouch(article.id, e)}
                        role="listitem"
                        tabIndex="0"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleArticleClick(article.id, e);
                          }
                        }}
                        aria-label={article.title}
                      >
                        {article.title}
                      </div>
                    ))}
                  </div>
                )}

                {category.subcategories && (
                  <div className="subcategories-list">
                    {category.subcategories.map(subcategory => (
                      <div key={subcategory.id} className="subcategory-group" role="group" aria-label={subcategory.name}>
                        <div className="subcategory-header" role="heading" aria-level="4">{subcategory.name}</div>
                        <div className="subcategory-articles" role="list">
                          {subcategory.articles && subcategory.articles.map(article => (
                            <div
                              key={article.id}
                              className="article-item"
                              onClick={(e) => handleArticleClick(article.id, e)}
                              onTouchStart={(e) => handleArticleTouch(article.id, e)}
                              role="listitem"
                              tabIndex="0"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleArticleClick(article.id, e);
                                }
                              }}
                              aria-label={article.title}
                            >
                              {article.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
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
          onKeyDown={handleKeyDown}
          placeholder="Pyrmont Brewery Library"
          className="combo-input"
          aria-expanded={showDropdown}
          aria-owns="search-results-list"
          aria-autocomplete="list"
          aria-activedescendant={highlighted >= 0 ? `search-result-${highlighted}` : undefined}
        />
      </div>
      {showDropdown && (
        <div className="search-dropdown-container" aria-live="polite">
          {renderCategoryDropdown()}
        </div>
      )}
    </div>
  );
};

export default LibrarySearch;
