import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = ({ path }) => {
  if (!path || path.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
        <li className="breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to="/library" itemProp="item" aria-label="Go to Library">
            <span itemProp="name">Library</span>
          </Link>
          <span className="breadcrumb-separator" aria-hidden="true">/</span>
          <meta itemProp="position" content="1" />
        </li>
        {path.map((item, index) => {
          // Get the name or title to use for search and display
          const itemText = item.name || item.title;

          return (
            <li
              key={item.id}
              className="breadcrumb-item"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index < path.length - 1 ? (
                <>
                  <Link
                    // Link to search results instead of direct article ID
                    to={`/library?search=${encodeURIComponent(itemText)}`}
                    itemProp="item"
                    aria-label={`Search for ${itemText}`}
                  >
                    <span itemProp="name">{itemText}</span>
                  </Link>
                  <span className="breadcrumb-separator" aria-hidden="true">/</span>
                  <meta itemProp="position" content={`${index + 2}`} />
                </>
              ) : (
                <>
                  <span className="breadcrumb-current" itemProp="name" aria-current="page">{itemText}</span>
                  <meta itemProp="position" content={`${index + 2}`} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
