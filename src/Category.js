import React from 'react';
import Article from './Article';

const Category = ({ category }) => {
  return (
    <div className="category" id={category.id}>
      <h2>{category.name}</h2>
      {category.articles && category.articles.map(article => (
        <Article key={article.id} article={article} />
      ))}
      {category.subcategories && category.subcategories.map(subCategory => (
        <Category key={subCategory.id} category={subCategory} />
      ))}
    </div>
  );
};

export default Category;
