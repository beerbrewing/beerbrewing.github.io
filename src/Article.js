import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

// Track the most recently viewed article ID at the module level
let lastViewedArticleId = null;

const Article = ({ article }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const articleRef = useRef(null);
  const scrollEventApplied = useRef(false);

  useEffect(() => {
    if (article) {
      // Update the path
      const path = findPathToArticle(libraryData, article.id);
      setBreadcrumbPath(path);

      // Set this article as the last viewed
      lastViewedArticleId = article.id;

      // Mark this article as active
      setIsActive(true);

      // Update all other articles to ensure proper z-ordering
      const allArticleElements = document.querySelectorAll('.article');
      allArticleElements.forEach(el => {
        if (el.id === article.id) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });

      // Handle scroll behavior to prevent jumping back to hash
      if (!scrollEventApplied.current && articleRef.current) {
        // Allow initial scroll to article position
        setTimeout(() => {
          // Add event to capture scroll and prevent unwanted jumping
          window.addEventListener('scroll', handleScroll, { passive: true });
          scrollEventApplied.current = true;
        }, 100);
      }
    }

    return () => {
      // Clean up scroll handler when component unmounts
      window.removeEventListener('scroll', handleScroll);
      scrollEventApplied.current = false;
    };
  }, [article]);

  // Prevent scroll jumping when user manually scrolls
  const handleScroll = () => {
    if (window.location.hash) {
      const currentScroll = window.pageYOffset;
      // After a small delay, if user has scrolled away from the hash target,
      // remove the hash to prevent jumping back
      setTimeout(() => {
        if (Math.abs(window.pageYOffset - currentScroll) > 5) {
          // User has scrolled - remove hash to prevent jumping back
          navigate(window.location.pathname, { replace: true });
        }
      }, 100);
    }
  };

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
    <article
      ref={articleRef}
      id={article.id}
      className={`article ${isActive ? 'active' : ''}`}
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
};

export default Article;
