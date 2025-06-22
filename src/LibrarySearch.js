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
    
    // Default position (to the right)
    let position = {
      left: '100%',
      top: '0',
      maxHeight: '100%',
      maxWidth: '500px',
      minWidth: '350px'
    };
    
    // Check if there's enough space to the right
    const spaceToRight = windowWidth - rect.right;
    const spaceToLeft = rect.left;
    const spaceBelow = windowHeight - rect.top;
    const spaceAbove = rect.top;
    
    // If not enough space to the right, position to the left
    if (spaceToRight < 400) {
      position.left = 'auto';
      position.right = '100%';
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
        position.right = '100%';
        position.maxWidth = `${Math.min(spaceToLeft - 20, 500)}px`;
      }
      
      // If subcategory would extend beyond left edge of viewport
      if (rect.left - 400 < 0) {
        position.left = '100%';
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

  const handleSelect = (articleId) => {
    setQuery('');
    setShowDropdown(false);
    setExpandedCategory(null);
    navigate(`/library#${articleId}`);
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
    e.stopPropagation();
    handleSelect(articleId);
  };

  const handleArticleClick = (articleId, e) => {
    e.stopPropagation();
    handleSelect(articleId);
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
    if (query.trim() === '') {
      return (
        <div className="category-grid">
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
            >
              <div className="category-header">
                <h3>{category.name}</h3>
                <span className="article-count">
                  {category.articles ? category.articles.length : 
                   category.subcategories ? 
                     category.subcategories.reduce((total, sub) => total + (sub.articles ? sub.articles.length : 0), 0) : 0} articles
                </span>
              </div>
              
              {expandedCategory === category.id && (
                <div 
                  className="subcategory-panel"
                  style={subcategoryPosition[category.id] || {}}
                >
                  {category.articles && (
                    <div className="articles-list">
                      {category.articles.map(article => (
                        <div 
                          key={article.id}
                          className="article-item"
                          onClick={(e) => handleArticleClick(article.id, e)}
                          onTouchStart={(e) => handleArticleTouch(article.id, e)}
                        >
                          {article.title}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {category.subcategories && (
                    <div className="subcategories-list">
                      {category.subcategories.map(subcategory => (
                        <div key={subcategory.id} className="subcategory-group">
                          <h4>{subcategory.name}</h4>
                          <div className="subcategory-articles">
                            {subcategory.articles.map(article => (
                              <div 
                                key={article.id}
                                className="article-item"
                                onClick={(e) => handleArticleClick(article.id, e)}
                                onTouchStart={(e) => handleArticleTouch(article.id, e)}
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
    }

    return (
      <ul className="combo-dropdown">
        {filteredArticles.map((article, idx) => (
          <li
            key={article.id}
            className={highlighted === idx ? 'highlighted' : ''}
            onMouseDown={() => handleSelect(article.id)}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleSelect(article.id);
            }}
          >
            <span className="article-title">{article.title}</span>
            <span className="article-category">{article.categoryPath}</span>
          </li>
        ))}
      </ul>
    );
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
      {showDropdown && (
        <div className="search-dropdown-container">
          {renderCategoryDropdown()}
        </div>
      )}
    </div>
  );
};

export default LibrarySearch;

