import React, { Component } from 'react';
import logo from './logo.svg';
import PyrmontBrewery_Kegerator from './PyrmontBrewery_Kegerator.png';
import CheersThen from './cheers.png';
import Wheelie from './wheelie.png';
import Loading from './pyrmontbwy.gif';
import Buildings from './pyrmont_sandstone_buildings.jpeg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import desktopImage from './pyrmontbwy.gif';
import quarryImage from './beer.png';
import BuyThisBeer from './buy_beer.png';

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
    let beerLink = 'Beer-link';
    let beerLinkYour = 'YourBeer-link';
    let cheers = 'Cheers';
    let buybeer = 'BuyThisBeer';
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

    return <div className="App" style={{  backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'repeat', backgroundImage: `url(${desktopImage})`, backgroundColour: `#ff0000`}}>
       {mightBeUnder18 ? confirmedAge ?

         <header className="App-header">
           <p>
             Sorry, but it's mega important that you are 18 or over for us to discuss the supply of alcohol with you under the
             liquor and gaming rules here in New South Wales, Australia (and most parts of our planet)<br/><br/>
             Please though, do come back when you are 18 we are ready to help you!<br/>
             (remember, drinking alcohol is neither big or clever)
             <br/>
             <br/>
             R Tape loading error, 0:1
           </p>
           <a href={"https://tinyurl.com/s63efe6"}><img src={logo} className="App-logo" alt=""/></a>
           <br/>
           <br/>
           <br/>
         </header>
      :
          <header className="App-header">
            <p>
              Before we go on, we need you to confirm you are 18 years or older<br/><br/>
              Were you born on or before <div className="speccy_flash_black">{today.toString().substring(0, 15)}?</div><br/>
              <div className="ButtonNo" id="no" onClick={handleTooYoung}>Erm yeah, but no</div>
              <br/>
              <div className="ButtonYes" id="yes18" onClick={handleOldEnough}>Strewth, I'm bloody old</div>
              <br/>
              &copy; 2007 Pyrmont Brewery
            </p>
              <br/>
            <br/>
            <br/>
          </header>
        :
          <header className="App-header">
            <p>
              Nestled amongst the Pyrmont yellowstone sandstone hides a secret brewery!<br/><a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink}>More About Us</a>
            </p>
            <div className="StringSpin">
            <div className="LeftStringSpin">
            All grain beers brewed in Pyrmont</div>
            </div>
            <br/>


            <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_halfway@pyrmontbrewery.com?subject=Beer: Half Way House&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                 className={beerLink}>Program:<br/>Half Way House<br/>Chocolate Stout<br/>4.5%<br/></a></div><div className="BeerDesc">Half Way House was the sandstone quarry and later a pub on Miller Street where the brewery is today. The pub didn't survive the Glebe Island bridge to Anzac bridge upgrade. <br/><br/>This beer is an English style double chocolate stout (and yes contains real Lindt couverture!)<br/><br/></div></div>
            <br/>
               <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com?subject=Beer: Whinging Pom Bitter&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                 className={beerLink}>Program:<br/>Whinging Pom<br/>Real Ale<br/>4.4%<br/></a></div><div className="BeerDesc">British Bitter for my fellow expats of which there are many in Pyrmont! <br/><br/>A classic UK Maris Otter based Real Ale, with UK Fuggles and East Kent Goldings. Our English styles are lower in carbonation and if you want, can be gravity served straight from the keg without refrigeration<br/><br/></div></div>
            <br/>
               <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_maybanke@pyrmontbrewery.com?subject=Beer: Maybanke Dark Mild&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                 className={beerLink}>Program:<br/>Maybanke<br/>Dark Mild<br/>3.4%<br/></a></div><div className="BeerDesc">Maybanke Anderson set up and operated the first kindergarten school here in Australia. An amazing achievement! <br/><br/>This is an English Midlands dark mild (mid-strength) similar to Banks' Dark Mild<br/><br/></div></div>
            <br/>
               <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_arrogant@pyrmontbrewery.com?subject=Beer: Arrogan Harris Strong Ale&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                 className={beerLink}>Program:<br/>Arrogant Harris<br/>Strong Ale<br/>7.0%<br/></a></div><div className="BeerDesc">John Harris was surgeon to the New South Wales Corps, owned most of Ultimo and lived in Pyrmont. He didn't always get on with everyone and was court marshalled (twice)<br/><br/>This beer is inspired by the famously yummy brews 'you probably won't like' from San Diego, California<br/><br/></div></div>
            <br/>
               <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_quaffer@pyrmontbrewery.com?subject=Beer: Quarry Quaffer Aussie Lager&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                 className={beerLink}>Program:<br/>Quarry Quaffer<br/>Aussie Lager<br/>4.9%<br/></a></div><div className="BeerDesc">"Like a wave of Angels crashing over me tongue!" [Dave 'Sensational' Robbo]<br/><br/>Very much like VB/Carlton it's sweet and bitter at the same time, Pride of Ringwood hops all the way, full strength lager beer<br/><br/></div></div>
            <br/>
               <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_paradise@pyrmontbrewery.com?subject=Beer: Paradise Saison&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                 className={beerLink}>Program:<br/>Paradise<br/>Saison<br/>6.8%<br/></a></div><div className="BeerDesc">Paradise yellowblock quarry is nearest the brewery, so named being the easiest sandstone to extract and work with, Sydney GPO building, Central, Art Gallery, RPA, Town Hall and many others (see below) all came from Paradise. <br/><br/>Stronger in alcohol but easy drinking traditional farmhouse style Saison, gently hopped with Centennial and Nelson Sauvignon<br/><br/></div></div>
            <br/>
               <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_purgatory@pyrmontbrewery.com?subject=Beer: Purgatory Pale Ale&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                 className={beerLink}>Program:<br/>Purgatory<br/>Pale Ale<br/>4.9%<br/></a></div><div className="BeerDesc">Purgatory was the quarry round by the Glebe Island bridge. <br/><br/>This beer is similar to some Western Australian style 2-row pale ale with plenty of Challenger hops<br/><br/></div></div>
            <br/>
               <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_hellhole@pyrmontbrewery.com?subject=Beer: Hell Hole Helles&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                 className={beerLink}>Program:<br/>Hell Hole<br/>Helles<br/>4.7%<br/></a></div><div className="BeerDesc">Hell Hole was the quarry where the Sydney Fish Markets stands today, it used to flood a lot making it not much fun to deal with. <br/><br/>German Dortmunder style pilsner lager with Tassie Enigma hops<br/><br/></div></div>
            <br/>
               <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_cider@pyrmontbrewery.com?subject=Beer: Wokos Cloudy Apple Cider&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"} target={"_blank"}
                                                                                                                               className={beerLink}>Program:<br/>Woko's<br/>Cloudy Cider<br/>5.1%<br/></a></div><div className="BeerDesc">James 'Woko' Watkinson was well known for teaching swimming and water polo in Pyrmont<br/><br/>This is a beautiful unfiltered apple cider made with English apples - it's slightly sweet but with a dry finish<br/><br/></div></div>

              <br/>
            <p>
                Our story:<br/><br/>The Pyrmont Brewery has been churning out the good stuff here in the city of Sydney, Australia since 2007. We're not today in a position to sell you beer, but if you live or work in Pyrmont you are quite likely to bump in to it at various local meet-ups<br />We'll let you know when that changes here and on social media<br/>
                <img src={PyrmontBrewery_Kegerator} width="70%" style={{opacity: 0.9, display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
                <br/>
              </p>
            <br/><p>Read about the history of brewing in and around Pyrmont <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink}>click/tap here</a></p>
            <br/>
          <p>

                Being a massive fan of open source and creative commons, our head brewer<br/>
              is sharing a small selection of test beers for you to have a go at home:
            <br/><br/>
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
              and good on yerse for following us @pyrmontbrewery...<br/>
              <br/>
              <a href={"https://twitter.com/pyrmontbrewery"} target={"_blank"} className={classLink}>
              Twitter</a><br/>
              <br/>
              <a href={"https://facebook.com/secretsquirrelbrew"} target={"_blank"}  className={classLink}>
              Facebook</a><br/>
              <br/>
              <a href={"https://www.instagram.com/pyrmontbrewery"} target={"_blank"} className={classLink}>
              Instagram</a>
              <br/><br/>
            </p>

            <img src={CheersThen} alt="" className={cheers}/>

            <br/>
            <p>
              pyrmontbrewery.com.au<br/>
              ABN: 47824483808<br/>
              Tel: 9692 0016
              <br/><br/>
            &copy; 2007 Pyrmont Brewery
            <br/><br/>
            0 OK, 100:1
            <br/>
            </p>
            <br/>
            <br/>
            <img src={logo} className="App-logo" alt="" width={"200px"} height={"100px"}/>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
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
