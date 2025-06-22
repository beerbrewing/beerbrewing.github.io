import React from 'react';
import Article from './Article';

const Category = ({ category }) => {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      {category.articles.map(article => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default Category;
