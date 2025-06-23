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
        {path.map((item, index) => (
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
                  to={`/library#${item.id}`}
                  itemProp="item"
                  aria-label={`Go to ${item.name || item.title}`}
                >
                  <span itemProp="name">{item.name || item.title}</span>
                </Link>
                <span className="breadcrumb-separator" aria-hidden="true">/</span>
                <meta itemProp="position" content={`${index + 2}`} />
              </>
            ) : (
              <>
                <span className="breadcrumb-current" itemProp="name" aria-current="page">{item.name || item.title}</span>
                <meta itemProp="position" content={`${index + 2}`} />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
