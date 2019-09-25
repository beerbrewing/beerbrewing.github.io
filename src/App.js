import React, { Component } from 'react';
import logo from './logo.svg';
import PyrmontBrewery_Kegerator from './PyrmontBrewery_Kegerator.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    let classLink = 'App-link';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            The Pyrmont (Secret Squirrel) Brewery has been churning out the good stuff since 2007 here in the city of Sydney, Australia
            <br/>
            <br/>
            We brew exclusively for local businesses to keep the cost of distribution minimal and stay well within our supply capacity
            <br/>
            <br/>
            Being a huge fan of open source and creative commons, the head brewer is sharing a small selection of our beers:
          </p>
          <ul>
            <li><a href={"Beer Arrogant Bastard.xml"} target={"_blank"} className={classLink}>Beer Arrogant Bastard.xml</a> - American Strong Ale</li>
            <li><a href={"Beer Brexit.bsmx"} target={"_blank"} className={classLink}>Beer Brexit.bsmx</a> - British Bitter</li>
            <li><a href={"Beer Demo Gremlins.bsmx"} target={"_blank"} className={classLink}>Beer Demo Gremlins.bsmx</a> - Australian Pale Ale</li>
            <li><a href={"Beer Kaibrau Kolsch.bsmx"} target={"_blank"} className={classLink}>Beer Kaibrau Kolsch.bsmx</a> - German Kölsch</li>
            <li><a href={"Beer Oompa Loomper.bsmx"} target={"_blank"} className={classLink}>Beer Oompa Loomper.bsmx</a> - Chocolate Porter</li>
            <li><a href={"Beer Rudolf Red.bsmx"} target={"_blank"} className={classLink}>Beer Rudolf Red.bsmx</a> - Red Ale</li>
            <li><a href={"Beer Seong Cerveza.bsmx"} target={"_blank"} className={classLink}>Beer Seong Cerveza.bsmx</a> - Cerveza</li>
            <li><a href={"Beer Suz Saison.bsmx"} target={"_blank"} className={classLink}>Beer Suz Saison.bsmx</a> - French Saison</li>
          </ul>
          <p>
            In Pyrmont needing some local brews? <a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"} className={classLink}>
              kegs@pyrmontbrewery.com</a>
          </p>
          <img src={PyrmontBrewery_Kegerator} width="50%"></img>

          <p>
            Good on yer for following us here:<br/><a href={"https://twitter.com/pyrmontbrewery"} target={"_blank"} className={classLink}>
            Twitter</a><br/><a href={"https://facebook.com/pyrmontbrewery"} target={"_blank"} className={classLink}>
            Facebook</a><br/><a href={"https://www.instagram.com/pyrmontbrewery"} target={"_blank"} className={classLink}>
            Instagram</a>
          </p>

        </header>
      </div>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default App;


