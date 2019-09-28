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
            The Pyrmont (Secret Squirrel) Brewery has been churning out the good stuff here in the city of Sydney, Australia since 2007
            <br/>
            <br/>
            We brew exclusively for local businesses to keep the cost of distribution minimal and stay well within our supply capacity
            <br/>
            <br/>
            Small selection of our Pyrmont heritage brews:<br/><br/>
            Whinging Pom - British British - rich Maris Otter based Real Ale, with UK hops 4%<br/>
            Hellhole Helle - German dortmunder style Pilsner <br/>
            Paradise Saison - Easy drinking French style Saison<br/>
            Purgatory Pale Ale - Australian Westcoast style 2 row pale ale<br/>
            Quarry Quaffer - Australian sessionable lager<br/>
            <br/>
            In Pyrmont needing some local brews? <a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"} className={classLink}>
            kegs@pyrmontbrewery.com</a><br/>
            Can supply 20L/50L DIN kegs (A-type coupler) or 19L Cornelius with ball lock
            <a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"}><img src={PyrmontBrewery_Kegerator} width="80%"></img></a>
            <br/>
            Being a huge fan of open source and creative commons, the head brewer is sharing a small selection of our beers for you to have a go:
          </p>
          <p>
            <a href={"Beer Arrogant Bastard.xml"} target={"_blank"} className={classLink}>Arrogant Bastard.xml</a> - American Strong Ale<br/>
            <a href={"Beer Brexit.bsmx"} target={"_blank"} className={classLink}>Brexit.bsmx</a> - British Bitter<br/>
            <a href={"Beer Demo Gremlins.bsmx"} target={"_blank"} className={classLink}>Demo Gremlins.bsmx</a> - Australian Pale Ale<br/>
            <a href={"Beer Kaibrau Kolsch.bsmx"} target={"_blank"} className={classLink}>Kaibrau Kolsch.bsmx</a> - German Kölsch<br/>
            <a href={"Beer Oompa Loomper.bsmx"} target={"_blank"} className={classLink}>Oompa Loomper.bsmx</a> - Chocolate Porter<br/>
            <a href={"Beer Rudolf Red.bsmx"} target={"_blank"} className={classLink}>Rudolf Red.bsmx</a> - Red Ale<br/>
            <a href={"Beer Seong Cerveza.bsmx"} target={"_blank"} className={classLink}>Seong Cerveza.bsmx</a> - Cerveza<br/>
            <a href={"Beer Suz Saison.bsmx"} target={"_blank"} className={classLink}>Suz Saison.bsmx</a> - French Saison<br/>
          </p>
          <p>
            and good on yers for following us...<br/><a href={"https://twitter.com/pyrmontbrewery"} target={"_blank"} className={classLink}>
            Twitter</a><br/><a href={"https://facebook.com/secretsquirrelbrew"} target={"_blank"} className={classLink}>
            Facebook</a><br/><a href={"https://www.instagram.com/secretsquirrelbrew"} target={"_blank"} className={classLink}>
            Instagram</a>
          </p>

          <p>Cheers!</p>
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


