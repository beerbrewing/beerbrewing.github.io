import React, { useState } from 'react';
import Category from './Category';
import TableOfContents from './TableOfContents';
import Search from './Search';
import './Library.css';

const allArticles = [
  {
    id: 'brewing-basics',
    title: 'Brewing Basics',
    content: 'An introduction to the fundamental concepts of brewing beer.'
  },
  {
    id: 'yeast-management',
    title: 'Yeast Management',
    content: 'Everything you need to know about handling and maintaining healthy yeast.'
  }
];

const categories = [
  {
    name: 'Getting Started',
    articles: allArticles
  }
];

const Library = () => {
  const [articles, setArticles] = useState(allArticles);

  const handleSearch = (query) => {
    const filteredArticles = allArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  return (
    <div className="library">
      <h1>Reference Library</h1>
      <p>Welcome to the brewery reference library. Here you can find articles and information on various brewing topics.</p>
      <Search onSearch={handleSearch} />
      <TableOfContents articles={articles} />
      {categories.map(category => (
        <Category key={category.name} category={{...category, articles: articles.filter(a => category.articles.find(ca => ca.id === a.id))}} />
      ))}
    </div>
  );
};

export default Library;
