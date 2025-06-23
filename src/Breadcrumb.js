import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = ({ path }) => {
  if (!path || path.length === 0) return null;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/library">Library</Link>
          <span className="breadcrumb-separator">/</span>
        </li>
        {path.map((item, index) => (
          <li
            key={item.id}
            className="breadcrumb-item"
          >
            {index < path.length - 1 ? (
              <>
                <Link to={`/library#${item.id}`}>{item.name || item.title}</Link>
                <span className="breadcrumb-separator">/</span>
              </>
            ) : (
              <span className="breadcrumb-current">{item.name || item.title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
