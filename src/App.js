import React, { Component } from 'react';
import logo from './logo.svg';
import PyrmontBrewery_Kegerator from './PyrmontBrewery_Kegerator.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import desktopImage from './pyrmont_quarry.jpg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOldEnough: false,
      confirmedAge: false
    };
  }


  render() {
    let classLink = 'App-link';
    let today = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    let mightBeUnder18 = !this.state.isOldEnough;
    let confirmedAge = this.state.confirmedAge;
    let self = this;

    function handleTooYoung(e) {
      e.preventDefault();
      self.setState({isOldEnough: false, confirmedAge: true} );
    }

    function handleOldEnough(e) {
      e.preventDefault();
      self.setState({isOldEnough: true, confirmedAge: true} );
    }

    return <div className="App" style={{backgroundImage: `url(${desktopImage})`, backgroundColour: `#ff0000`}}>
       {mightBeUnder18 ? confirmedAge ?

         <header className="App-header">
           <img src={logo} className="App-logo" alt="logo"/>
           <p>
             Sorry, it's really important that you are 18 or over to discuss the supply of alcohol with you under the
             rules in New South Wales, Australia (and hey, most other places!)<br/><br/>
             Please though, do come back when you are 18 we are ready for you!<br/>
             (remember, drinking alcohol is neither big or clever)
           </p>
         </header>
      :
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Before we go on - we need to check you are 18 years or older...<br/><br/>
              Were you born on or before <b>{today.toString().substring(0, 16)}</b>?
            </p>
            <div className="Button" onClick={handleTooYoung}>Yeah, but no</div>
            <br/>
            <div className="Button" onClick={handleOldEnough}>Strewth, yes ok I'm bloody old</div>
          </header>
        :
          <header className="App-header">
            <p>
              The <b>Pyrmont Brewery</b> has been churning out the good stuff here in the city of Sydney, Australia
              since 2007
              <br/>
              Want some local brew? <a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"}
                                                      className={classLink}>
              kegs@pyrmontbrewery.com</a><br/>
              <br/>
              Some of our Pyrmont heritage brews to choose from:<br/><br/>
              <b><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                 className={classLink}>Whinging Pom</a></b> - British Bitter - classic Maris Otter based Real Ale, with Fuggles and East Kent
              Goldings (can be served via beer gun without refrigeration)<br/><br/>
              <b><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                    className={classLink}>Hellhole Helle</a></b> - German dortmunder style (Tasmania) Pilsner and Enignma hops)<br/><br/>
              <b><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                    className={classLink}>Paradise Saison</a></b> - Easy drinking French style Saison, lightly Centennial hopped<br/><br/>
              <b><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                    className={classLink}>Purgatory Pale Ale</a></b> - Australian Westcoast style 2 row pale ale with Challenger<br/><br/>
              <b><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                    className={classLink}>Halfway House Stout</a></b> - fresh stout (best served 3:1 nitro:co2)<br/><br/>
              <b><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                    className={classLink}>Quarry Quaffer</a></b> - Australian sessionable Pride of Ringwood lager<br/><br/>
              <b><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                    className={classLink}>Surgeon Harris</a></b> - San Diego strong ale, its a little arrogant<br/><br/>
              <b><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                    className={classLink}>Union Square IIPA</a></b> - Feisty Adelaide style strong hopped double IPA<br/><br/>
              <br/>
              Can supply 50L DIN kegs (A-type coupler), or<br/>
              19L Cornelius (ball lock) for your kegerator, or<br/>
              long neck (75cl) bottles for smaller batches<br/>
              <a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"}><img src={PyrmontBrewery_Kegerator}
                                                                                width="50%"
                                                                                style={{opacity: 0.7}}></img></a>
              <br/>
              <br/>
              Being a huge fan of open source and creative commons, the head brewer is sharing a small selection of our
              beers for you to have a go:
            </p>
            <p>
              <a href={"Beer Arrogant Bastard.xml"} target={"_blank"} className={classLink}>Arrogant Bastard.xml</a> -
              American Strong Ale<br/>
              <a href={"Beer Brexit.bsmx"} target={"_blank"} className={classLink}>Brexit.bsmx</a> - British Bitter<br/>
              <a href={"Beer Demo Gremlins.bsmx"} target={"_blank"} className={classLink}>Demo Gremlins.bsmx</a> -
              Australian Pale Ale<br/>
              <a href={"Beer Kaibrau Kolsch.bsmx"} target={"_blank"} className={classLink}>Kaibrau Kolsch.bsmx</a> -
              German Kölsch<br/>
              <a href={"Beer Oompa Loomper.bsmx"} target={"_blank"} className={classLink}>Oompa Loomper.bsmx</a> -
              Chocolate Porter<br/>
              <a href={"Beer Rudolf Red.bsmx"} target={"_blank"} className={classLink}>Rudolf Red.bsmx</a> - Red
              Ale<br/>
              <a href={"Beer Seong Cerveza.bsmx"} target={"_blank"} className={classLink}>Seong Cerveza.bsmx</a> -
              Cerveza<br/>
              <a href={"Beer Suz Saison.bsmx"} target={"_blank"} className={classLink}>Suz Saison.bsmx</a> - French
              Saison<br/>
            </p>
            <p>
              and good on yers for following us @pyrmontbrewery...<br/>
              <a href={"https://twitter.com/pyrmontbrewery"} target={"_blank"} className={classLink}>
              Twitter</a><br/>
              <a href={"https://facebook.com/secretsquirrelbrew"} target={"_blank"}  className={classLink}>
              Facebook</a><br/>
              <a href={"https://www.instagram.com/pyrmontbrewery"} target={"_blank"} className={classLink}>
              Instagram</a>
            </p>

            <p>
              We brew beer exclusively for local businesses to keep the cost of distribution minimal and stay well
              within our supply capacity<br/>
              We encourage responsible consumption of our brews<br/>
            </p>

            <p>Cheers!</p>
            <img src={logo} className="App-logo" alt="logo"/>

          </header>
      } </div>
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


