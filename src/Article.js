import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LibrarySearch from './LibrarySearch';
import Breadcrumb from './Breadcrumb';
import { libraryData } from './libraryData';
import './Article.css';

const Article = ({ article }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);

  useEffect(() => {
    if (article) {
      const path = findPathToArticle(libraryData, article.id);
      setBreadcrumbPath(path);
    }
  }, [article]);

  const findPathToArticle = (data, articleId, currentPath = []) => {
    for (const item of data) {
      // Check if the current item is the article
      if (item.id === articleId) {
        return [...currentPath, item];
      }

      // Check if article is in this category's articles
      if (item.articles) {
        const foundArticle = item.articles.find(a => a.id === articleId);
        if (foundArticle) {
          return [...currentPath, item, foundArticle];
        }
      }

      // Check in subcategories
      if (item.subcategories) {
        const newPath = [...currentPath, item];
        const foundInSubcategories = findPathInSubcategories(item.subcategories, articleId, newPath);
        if (foundInSubcategories) {
          return foundInSubcategories;
        }
      }
    }
    return null;
  };

  const findPathInSubcategories = (subcategories, articleId, currentPath) => {
    for (const subcat of subcategories) {
      // Check if article is in this subcategory's articles
      if (subcat.articles) {
        const foundArticle = subcat.articles.find(a => a.id === articleId);
        if (foundArticle) {
          return [...currentPath, subcat, foundArticle];
        }
      }

      // Check in next level of subcategories
      if (subcat.subcategories) {
        const newPath = [...currentPath, subcat];
        const foundInSubcategories = findPathInSubcategories(subcat.subcategories, articleId, newPath);
        if (foundInSubcategories) {
          return foundInSubcategories;
        }
      }
    }
    return null;
  };

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

      {breadcrumbPath.length > 0 && (
        <Breadcrumb path={breadcrumbPath} />
      )}

      <h3 className="article-title">{article.title}</h3>
      <div className="article-content">{article.content}</div>
    </div>
  );
};

export default Article;
