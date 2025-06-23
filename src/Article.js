import React, { useEffect, useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import LibrarySearch from './LibrarySearch';
import Breadcrumb from './Breadcrumb';
import { libraryData } from './libraryData';
import './Article.css';

// Custom Markdown renderer components for accessibility
const MarkdownRenderers = {
  // Make headings more accessible with proper IDs for navigation
  h1: ({node, ...props}) => <h1 id={`heading-${props.children.toString().toLowerCase().replace(/\s+/g, '-')}`} tabIndex="-1" {...props} />,
  h2: ({node, ...props}) => <h2 id={`heading-${props.children.toString().toLowerCase().replace(/\s+/g, '-')}`} tabIndex="-1" {...props} />,
  h3: ({node, ...props}) => <h3 id={`heading-${props.children.toString().toLowerCase().replace(/\s+/g, '-')}`} tabIndex="-1" {...props} />,
  // Make links more accessible
  a: ({node, ...props}) => <a {...props} aria-label={`Link to ${props.children}`} />,
  // Make images accessible with alt text
  img: ({node, src, alt, ...props}) => <img src={src} alt={alt || "Article image"} {...props} />
};

// Article component with React 18 optimizations
const Article = memo(({ article, onClose }) => {
  const navigate = useNavigate();
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);

  // Find path to article (memoized to prevent unnecessary recalculations)
  const findPathToArticle = useCallback((data, articleId, currentPath = []) => {
    for (const item of data) {
      // Check if current item is the article
      if (item.id === articleId) {
        return [...currentPath, item];
      }

      // Check articles in this category
      if (item.articles) {
        const foundArticle = item.articles.find(a => a.id === articleId);
        if (foundArticle) {
          return [...currentPath, item, foundArticle];
        }
      }

      // Check subcategories
      if (item.subcategories) {
        const newPath = [...currentPath, item];
        const result = findPathInSubcategories(item.subcategories, articleId, newPath);
        if (result) return result;
      }
    }
    return null;
  }, []);

  // Helper function for subcategory search
  const findPathInSubcategories = (subcategories, articleId, currentPath) => {
    for (const subcat of subcategories) {
      // Check subcategory articles
      if (subcat.articles) {
        const foundArticle = subcat.articles.find(a => a.id === articleId);
        if (foundArticle) {
          return [...currentPath, subcat, foundArticle];
        }
      }

      // Check nested subcategories
      if (subcat.subcategories) {
        const newPath = [...currentPath, subcat];
        const result = findPathInSubcategories(subcat.subcategories, articleId, newPath);
        if (result) return result;
      }
    }
    return null;
  };

  // Handle navigation back
  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/library');
    }
  };

  // Update breadcrumb path when article changes
  useEffect(() => {
    if (article) {
      const path = findPathToArticle(libraryData, article.id);
      setBreadcrumbPath(path || []);
    }
  }, [article, findPathToArticle]);

  // Exit early if no article is provided
  if (!article) {
    return null;
  }

  return (
    <article
      id={article.id}
      className="article active"
      aria-labelledby={`article-title-${article.id}`}
    >
      <div className="article-back-button-container">
        <button
          onClick={handleBackNavigation}
          className="article-back-button"
          aria-label="Go back to previous page"
        >
          <span aria-hidden="true">←</span>
          <span className="sr-only">Back</span>
        </button>
      </div>

      <div className="article-header">
        <div className="article-search-container">
          <LibrarySearch />
        </div>
      </div>

      {breadcrumbPath.length > 0 && (
        <nav aria-label="Breadcrumb navigation">
          <Breadcrumb path={breadcrumbPath} />
        </nav>
      )}

      <h3 id={`article-title-${article.id}`} className="article-title" tabIndex="-1">{article.title}</h3>
      <div className="article-content" role="region" aria-label={`Content of article: ${article.title}`}>
        <ReactMarkdown components={MarkdownRenderers}>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
});

// Add display name for better debugging
Article.displayName = 'Article';

export default Article;
