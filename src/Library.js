import React, { useState } from 'react';
import Category from './Category';
import TableOfContents from './TableOfContents';
import Search from './Search';
import { libraryData } from './libraryData';
import './Library.css';

const Library = () => {
  const [filteredData, setFilteredData] = useState(libraryData);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    if (!lowerCaseQuery) {
      setFilteredData(libraryData);
      return;
    }

    const search = (data) => {
      return data.reduce((acc, item) => {
        if (item.name.toLowerCase().includes(lowerCaseQuery)) {
          acc.push(item);
        } else if (item.articles) {
          const matchingArticles = item.articles.filter(article =>
            article.title.toLowerCase().includes(lowerCaseQuery) ||
            article.content.toLowerCase().includes(lowerCaseQuery)
          );
          if (matchingArticles.length > 0) {
            acc.push({ ...item, articles: matchingArticles });
          }
        } else if (item.subcategories) {
          const matchingSubcategories = search(item.subcategories);
          if (matchingSubcategories.length > 0) {
            acc.push({ ...item, subcategories: matchingSubcategories });
          }
        }
        return acc;
      }, []);
    };

    setFilteredData(search(libraryData));
  };

  const flattenArticles = (data) => {
    let articles = [];
    data.forEach(item => {
      if (item.articles) {
        articles = articles.concat(item.articles);
      }
      if (item.subcategories) {
        articles = articles.concat(flattenArticles(item.subcategories));
      }
    });
    return articles;
  };
  
  const articles = flattenArticles(filteredData);

  return (
    <div className="library">
      <h1>Reference Library</h1>
      <p>Welcome to the brewery reference library. Here you can find articles and information on various brewing topics.</p>
      <Search onSearch={handleSearch} />
      <TableOfContents items={filteredData} />
      {filteredData.map(category => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Library;
