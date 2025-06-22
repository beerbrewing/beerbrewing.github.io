import React from 'react';

const Article = ({ article }) => {
  return (
    <div id={article.id} className="article">
      <h3>{article.title}</h3>
      <p>{article.content}</p>
    </div>
  );
};

export default Article;
