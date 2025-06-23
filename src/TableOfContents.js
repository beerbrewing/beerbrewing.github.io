import React from 'react';

const renderItems = (items) => {
  // Add a safety check to prevent mapping over undefined
  if (!items || !Array.isArray(items)) {
    return null;
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.articles || item.subcategories ? (
            <a href={`#${item.id}`}>{item.name}</a>
          ) : (
            <a href={`#${item.id}`}>{item.title}</a>
          )}
          {item.articles && renderItems(item.articles)}
          {item.subcategories && renderItems(item.subcategories)}
        </li>
      ))}
    </ul>
  );
};

// Update the component to accept either 'items' or 'data' prop
const TableOfContents = ({ items, data }) => {
  // Use whichever prop is provided (items or data)
  const contentItems = items || data;

  return (
    <div>
      <h2>Table of Contents</h2>
      {renderItems(contentItems)}
    </div>
  );
};

export default TableOfContents;
