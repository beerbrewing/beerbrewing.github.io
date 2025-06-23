import React, { useState, useEffect, useCallback } from 'react';
import Category from './Category';
import TableOfContents from './TableOfContents';
import Article from './Article';
import Search from './Search';
import { libraryData } from './libraryData';
import { useLocation, useNavigate } from 'react-router-dom';
import './Library.css';

const Library = () => {
  const [filteredData, setFilteredData] = useState(libraryData);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Memoized search function to prevent unnecessary re-creations
  const handleSearch = useCallback((query) => {
    const lowerCaseQuery = query.toLowerCase();
    setSearchQuery(query);

    if (!lowerCaseQuery) {
      setFilteredData(libraryData);
      return;
    }

    const search = (data) => {
      return data.reduce((acc, item) => {
        if (item.name?.toLowerCase().includes(lowerCaseQuery)) {
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
  }, []);

  // Helper function to find an article by its ID
  const findArticleById = useCallback((data, articleId) => {
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
  }, []);

  // Handle URL changes (hash and search params)
  useEffect(() => {
    // Check for hash changes (article selection)
    const hash = location.hash.substring(1);
    if (hash) {
      const article = findArticleById(libraryData, hash);
      setSelectedArticle(article || null);
    } else {
      setSelectedArticle(null);
    }

    // Check for search params
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
      handleSearch(searchFromUrl);
    } else if (!hash) {
      // Reset to default state when no hash or search
      setFilteredData(libraryData);
      setSearchQuery('');
    }
  }, [location, findArticleById, handleSearch]);

  const flattenArticles = useCallback((data) => {
    let articles = [];
    data.forEach(item => {
      if (item.articles) {
        articles = [...articles, ...item.articles];
      }
      if (item.subcategories) {
        articles = [...articles, ...flattenArticles(item.subcategories)];
      }
    });
    return articles;
  }, []);

  const articles = flattenArticles(filteredData);

  // If an article is selected, render just that article
  if (selectedArticle) {
    return (
      <div className="library single-article-view">
        <Article
          article={selectedArticle}
          onClose={() => navigate('/library')}
        />
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
