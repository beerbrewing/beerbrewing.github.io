import React from 'react';

const TableOfContents = ({ articles }) => {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <a href={`#${article.id}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
