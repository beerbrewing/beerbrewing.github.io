import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Time from './Time';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA4 from 'react-ga4';
import Beer from "./Beer";
import BeerMats from "./BeerMats";
import Library from './Library';
import LibrarySearch from './LibrarySearch';

// Initialize Google Analytics 4
ReactGA4.initialize('G-0BEBKXKRP3');

const App = () => {
  const [isOldEnough, setIsOldEnough] = useState(false);
  const [confirmedAge, setConfirmedAge] = useState(false);
  const [afterKev, setAfterKev] = useState(false);

  const handleTooYoung = (e) => {
    e.preventDefault();
    setIsOldEnough(false);
    setConfirmedAge(true);
  };

  const handleOldEnough = (e) => {
    e.preventDefault();
    setIsOldEnough(true);
    setConfirmedAge(true);
  };

  const handleAfterKev = (e) => {
    e.preventDefault();
    setIsOldEnough(true);
    setConfirmedAge(true);
    setAfterKev(true);
  };

  const today = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
  const mightBeUnder18 = !isOldEnough;

  return (
    <BrowserRouter basename="/build">
      <Routes>
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/time" element={<Time />} />
        <Route path="/streams" element={() => { window.location.href = "streams.html"; return null; }} />
        <Route path="/library" element={<Library />} />
        <Route path="/" element={
          <div className="App">
            {afterKev ? (
              <header className="App-header-notspeccy">
                <LibrarySearch />
                <h1>Commercial Brewery Automation</h1>
              </header>
            ) : mightBeUnder18 ? (
              confirmedAge ? (
                <header className="App-header">
                  <LibrarySearch />
                  <p>Sorry, you must be 18 or older.</p>
                </header>
              ) : (
                <header className="App-header">
                  <LibrarySearch />
                  <p>Confirm your age.</p>
                </header>
              )
            ) : null}
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
