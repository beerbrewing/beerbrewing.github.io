import React from 'react';

const renderItems = (items) => {
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

const TableOfContents = ({ items }) => {
  return (
    <div>
      <h2>Table of Contents</h2>
      {renderItems(items)}
    </div>
  );
};

export default TableOfContents;
