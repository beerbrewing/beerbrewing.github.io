import React, { useState, useEffect } from 'react';
import Category from './Category';
import TableOfContents from './TableOfContents';
import Article from './Article';
import Search from './Search';
import { libraryData } from './libraryData';
import { useLocation } from 'react-router-dom';
import './Library.css';

const Library = () => {
  const [filteredData, setFilteredData] = useState(libraryData);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Force a full page refresh when location changes
  const lastLocationRef = React.useRef(location);
  useEffect(() => {
    // Check if this is a genuine location change (not just the initial render)
    if (lastLocationRef.current !== location && document.location.href) {
      // Refresh the page
      window.location.reload();
    }
    // Update the last location ref
    lastLocationRef.current = location;
  }, [location]);

  // Handle all location changes including path, search params and hash
  useEffect(() => {
    // Reset everything when navigating to base library path with no hash or search
    if (location.pathname === '/library' && !location.hash && !location.search) {
      setFilteredData(libraryData);
      setSelectedArticle(null);
      setVisibleArticles([]);
      setSearchQuery('');
      return;
    }

    // Get search query from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const searchFromUrl = queryParams.get('search');

    if (searchFromUrl) {
      // Update search query state
      setSearchQuery(searchFromUrl);
      // Perform search
      handleSearch(searchFromUrl);
    } else if (!location.hash) {
      // If no search and no hash, reset to default view
      setFilteredData(libraryData);
      setSearchQuery('');
    }
  }, [location]); // Re-run when any part of location changes

  // Check for article ID in URL hash
  useEffect(() => {
    const checkForSelectedArticle = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const article = findArticleById(libraryData, hash);
        if (article) {
          setSelectedArticle(article);
          // Close all other articles and only show the selected one
          setVisibleArticles([article.id]);
        } else {
          setSelectedArticle(null);
        }
      } else {
        setSelectedArticle(null);
        setVisibleArticles([]); // Close all articles when no hash is present
      }
    };

    // Initial check
    checkForSelectedArticle();

    // Listen for hash changes
    window.addEventListener('hashchange', checkForSelectedArticle);

    return () => {
      window.removeEventListener('hashchange', checkForSelectedArticle);
    };
  }, []);

  // Helper function to find an article by its ID
  const findArticleById = (data, articleId) => {
    for (const category of data) {
      // Check direct articles in the category
      if (category.articles) {
        const foundArticle = category.articles.find(article => article.id === articleId);
        if (foundArticle) return foundArticle;
      }

      // Check in subcategories
      if (category.subcategories) {
        const foundInSub = findArticleById(category.subcategories, articleId);
        if (foundInSub) return foundInSub;
      }
    }
    return null;
  };

  // Handle closing an article
  const handleCloseArticle = (articleId) => {
    setVisibleArticles(prevArticles => prevArticles.filter(id => id !== articleId));
    setSelectedArticle(null);
    // Remove the hash from the URL
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    if (!lowerCaseQuery) {
      setFilteredData(libraryData);
      return;
    }

    const search = (data) => {
      return data.reduce((acc, item) => {
        if (item.name.toLowerCase().includes(lowerCaseQuery)) {
          acc.push(item);
        } else if (item.articles) {
          const matchingArticles = item.articles.filter(article =>
            article.title.toLowerCase().includes(lowerCaseQuery) ||
            article.content.toLowerCase().includes(lowerCaseQuery)
          );
          if (matchingArticles.length > 0) {
            acc.push({ ...item, articles: matchingArticles });
          }
        } else if (item.subcategories) {
          const matchingSubcategories = search(item.subcategories);
          if (matchingSubcategories.length > 0) {
            acc.push({ ...item, subcategories: matchingSubcategories });
          }
        }
        return acc;
      }, []);
    };

    setFilteredData(search(libraryData));
  };

  const flattenArticles = (data) => {
    let articles = [];
    data.forEach(item => {
      if (item.articles) {
        articles = articles.concat(item.articles);
      }
      if (item.subcategories) {
        articles = articles.concat(flattenArticles(item.subcategories));
      }
    });
    return articles;
  };

  const articles = flattenArticles(filteredData);

  // If an article is selected, render just that article
  if (selectedArticle) {
    return (
      <div className="library single-article-view">
        <Article article={selectedArticle} onClose={handleCloseArticle} />
      </div>
    );
  }

  // Otherwise render the full library with table of contents
  return (
    <div className="library">
      <div className="library-header">
        <h2>Pyrmont Brewery Library</h2>
        <div className="library-search">
          <Search onSearch={handleSearch} initialQuery={searchQuery} />
        </div>
      </div>

      <div className="library-container">
        <div className="library-sidebar">
          <TableOfContents data={filteredData} />
        </div>

        <div className="library-content">
          {articles.length > 0 ? (
            <div className="library-categories">
              {filteredData.map(category => (
                <Category
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">No articles match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
