import React, { Component } from 'react';
import logo from './logo.svg';
import PyrmontBrewery_Kegerator from './PyrmontBrewery_Kegerator.png';
import CheersThen from './cheers.png';
import Wheelie from './wheelie.png';
import Buildings from './pyrmont_sandstone_buildings.jpeg';
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
    let beerLink = 'Beer-link';
    let beerLinkYour = 'YourBeer-link';
    let cheers = 'Cheers';
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
           <img src={logo} className="App-logo" alt=""/>
           <p>
             Sorry, but it's mega important that you are 18 or over for us to discuss the supply of alcohol with you under the
             liquor and gaming rules here in New South Wales, Australia (and most parts of our planet)<br/><br/>
             Please though, do come back when you are 18 we are ready to help you!<br/>
             (remember, drinking alcohol is neither big or clever)
           </p>
         </header>
      :
          <header className="App-header">
            <img src={logo} className="App-logo" alt="" width={"200px"} height={"100px"}/>
            <p>
              Before we go on, we need you to confirm you are 18 years or older<br/><br/>
              Were you born on or before <b>{today.toString().substring(0, 16)}</b>?
            </p>
            <div className="ButtonNo" id="no" onClick={handleTooYoung}>Erm yeah, but no</div>
            <br/>
            <div className="ButtonYes" id="yes18" onClick={handleOldEnough}>Strewth, I'm bloody old</div>
              <br/>
              pyrmontbrewery.com.au<br/>
              ABN: 47824483808
          </header>
        :
          <header className="App-header">
            <p>
              Nestled amongst the <a href={"https://pyrmonthistory.net.au/industry/quarries"} target={"_blank"}
                             className={classLink}>Pyrmont yellowstone sandstone</a> hides a secret brewery!<br/>It’s been churning out the good stuff here in the city of Sydney, Australia since 2007
              <br/>
              Are you in Pyrmont? Want some local brews? <a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"}
                                                      className={classLink}>
              kegs@pyrmontbrewery.com</a><br/>
              <br/>
            </p>
              Some of our classic beers to choose from:<br/><br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_halfway@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Half Way House</b><br/><i>Chocolate Stout</i><br/>4.5%</a></div><div className="BeerDesc">Half Way House was the sandstone quarry and later a pub on Miller Street where the brewery is today. The pub didn't survive the Glebe Island bridge to Anzac bridge upgrade. <br/><br/>This beer is an English style double chocolate stout (and yes contains real Lindt couverture!)<br/><br/></div></div>
            <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_whingingpom@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Whinging Pom</b><br/><i>Real Ale</i><br/>4.4%</a></div><div className="BeerDesc">British Bitter for my fellow expats of which there are many in Pyrmont! <br/><br/>A classic UK Maris Otter based Real Ale, with UK Fuggles and East Kent Goldings. Our English styles are lower in carbonation and if you want, can be gravity served straight from the keg without refrigeration<br/><br/></div></div>
            <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_maybanke@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Maybanke</b><br/><i>Dark Mild</i><br/>3.8%</a></div><div className="BeerDesc">Maybanke Anderson set up and operated the first kindergarten school here in Australia. An amazing achievement! <br/><br/>This is an English Midlands dark mild similar to Banks'<br/><br/></div></div>
            <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_arrogant@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Arrogant Harris</b><br/><i>Strong Ale</i><br/>7%</a></div><div className="BeerDesc">John Harris was surgeon to the New South Wales Corps, owned most of Ultimo and lived in Pyrmont. He didn't always get on with everyone and was court marshalled (twice)<br/><br/>This beer is inspired by the famously yummy brews 'you probably won't like' from San Diego, California<br/><br/></div></div>
            <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_quaffer@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Quarry Quaffer</b><br/><i>Aussie Lager</i><br/>4.9%</a></div><div className="BeerDesc">"Like a wave of Angels crashing over me tongue!" [Dave 'Sensational' Robbo]<br/><br/>Very much like VB/Carlton it's sweet and bitter at the same time, Pride of Ringwood hops all the way, full strength lager beer<br/><br/></div></div>
            <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_cider@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Woko's</b><br/><i>Cloudy Cider</i><br/>5.1%</a></div><div className="BeerDesc">James 'Woko' Watkinson was well known for teaching swimming and water polo in Pyrmont<br/><br/>This is a beautiful unfiltered apple cider made with English apples - it's slightly sweet but with a dry finish<br/><br/></div></div>
            <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_paradise@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Paradise</b><br/><i>Saison</i><br/>6.8%</a></div><div className="BeerDesc">Paradise yellowblock quarry is nearest the brewery, so named being the easiest sandstone to extract and work with, Sydney GPO building, Central, Art Gallery, RPA, Town Hall and many others (see below) all came from Paradise. <br/><br/>Stronger in alcohol but easy drinking traditional farmhouse style Saison, gently hopped with Centennial and Nelson Sauvignon<br/><br/></div></div>
            <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_purgatory@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Purgatory</b><br/><i>Pale Ale</i><br/>4.9%</a></div><div className="BeerDesc">Purgatory was the quarry round by the Glebe Island bridge. <br/><br/>This beer is similar to some Western Australian style 2-row pale ale with plenty of Challenger hops<br/><br/></div></div>
              <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_hellhole@pyrmontbrewery.com"} target={"_blank"}
                                                                 className={beerLink}><b>Hell Hole</b><br/><i>Helles</i><br/>4.7%</a></div><div className="BeerDesc">Hell Hole was the quarry where the Sydney Fish Markets stands today, it used to flood a lot making it not much fun to deal with. <br/><br/>German Dortmunder style pilsner lager with Tassie Enigma hops<br/><br/></div></div>
              <br/>
              <div className="Beer"><div className="BeerSnap"><a href={"mailto:kegs_mybrew@pyrmontbrewery.com"} target={"_blank"}
                    className={beerLinkYour}>Your Own<br/>Brew!</a></div><div className="YourBeerDesc">Want something unique? If you can describe it, know a good example, maybe even have a recipe we'll have a go on the brewery Grainfather at recreating your brew with your name! (min 19L or 60 cans)<br/><br/></div></div>
              <p>
              Can deliver within Pyrmont area only, chilled<br/><a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"}
                             className={classLink}>50L DIN keg</a> (A-type coupler)<br/>
                <a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"}
                   className={classLink}>20L tall keg</a> (A-type coupler)<br/>
                <a href={"mailto:corny_kegs@pyrmontbrewery.com"} target={"_blank"}
                   className={classLink}>19L Cornelius keg</a> (ball lock) for your Kegerator<br/>
                <a href={"mailto:cans@pyrmontbrewery.com"} target={"_blank"}
                   className={classLink}>Recyclable Cans 330ml</a> (12 min)<br/>
              <a href={"mailto:kegs@pyrmontbrewery.com"} target={"_blank"}><img src={PyrmontBrewery_Kegerator} width="70%" style={{opacity: 0.9}}></img></a>
              <br/>
                Borrow a <a href={"mailto:wheelie@pyrmontbrewery.com"} target={"_blank"}
                    className={classLink}>mobile kegerator wheelie bin</a><br/>
                (you'll need ice)<br/>
                <img src={Wheelie} alt="" width="50%" style={{opacity: 0.9}}/>

                <br/>

              </p>
                <br/>
                <img src={Buildings} alt="" className={cheers}/>
                (buidlings from Pyrmont sandstone)
                <a href={"https://pyrmonthistory.net.au/"} target={"_blank"} className={classLink}>pyrmonthistory.net.au</a>
            <br/>
          <p>

                Being a massive fan of open source and creative commons, our head brewer<br/>
              is sharing a small selection of test beers for you to have a go at home:
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

            <p>Cheers mate!</p>
            <img src={CheersThen} alt="" className={cheers}/>

            <p>
              We brew beer exclusively for local businesses to keep the cost of distribution minimal and stay well
              within our supply capacity <br/>(i.e. easily swing by with a keg and bring it back)<br/>
              Beer usually takes a few weeks to ferment and condition so sometimes a little heads up is necessary<br/>
            </p>
            <p>
                We encourage <a href={"kevs_rsa.png"} target={"_blank"} className={classLink}>responsible</a> consumption of our brews, take care of yourselves<br/>
            </p>
            <br/>
            pyrmontbrewery.com.au<br/>
              ABN: 47824483808
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
