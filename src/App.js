import React, {Component} from 'react';
import logo from './logo.svg';
import PyrmontBrewery_Kegerator from './PyrmontBrewery_Kegerator.png';
import CheersThen from './cheers.png';
import PyrmontBrewery_WheelieBin from './wheelie.png';
import Loading from './pyrmontbwy.gif';
import Buildings from './pyrmont_sandstone_buildings.jpeg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import desktopImage from './pyrmontbwy.gif';
import quarryImage from './beer.png';
import BuyThisBeer from './buy_beer.png';
import LabelHalfWayHouseChocolateStout from './label_half_way_house_chocolate_stout.png';
import LabelArrogantHarrisStrongAle from './label_arrogant_harris_strong_ale.png';
import LabelMaybankeDarkMild from './label_maybanke_dark_mild.png';
import LabelWhingingPomBestBitter from './label_whinging_pom_best_bitter.png';
import LabelWokosCloudyCider from './label_wokos_cloudy_cider.png';
import LabelPurgatoryPaleAle from './label_purgatory_pale_ale.png';
import LabelParadiseFrenchSaison from './label_paradise_french_saison.png';
import LabelQuarryQuafferAussieLager from './label_quarry_quaffer_aussie_lager.png';
import LabelHellHoleHelles from './label_hell_hole_helles.png';
import LabelGeneric from './label_generic.png';

import ReactPixel from 'react-facebook-pixel';
import ReactGA from 'react-ga';

const advancedMatching = { em: 'kev@pyrmontbrewery.com.au' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
};
ReactPixel.init('701956460214044', advancedMatching, options);
ReactPixel.pageView(); // For tracking page view

ReactGA.initialize('UA-155182441-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOldEnough: false,
      confirmedAge: false,
      afterKev: false
    };
  }


  render() {
    let classLink = 'App-link';
    let classLink2 = 'App-link2';
    let classLink3 = 'App-link3';
    let beerLink = 'Beer-link';
    let sensible = 'Sensisble';
    let beerLinkYour = 'YourBeer-link';
    let cheers = 'Cheers';
    let buybeer = 'BuyThisBeer';
    let today = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    let mightBeUnder18 = !this.state.isOldEnough;
    let confirmedAge = this.state.confirmedAge;
    let afterKev = this.state.afterKev;
    let self = this;

    function handleTooYoung(e) {
      e.preventDefault();
      self.setState({isOldEnough: false, confirmedAge: true});
    }

    function handleOldEnough(e) {
      e.preventDefault();
      self.setState({isOldEnough: true, confirmedAge: true});
    }

    function handleAfterKev(e) {
      e.preventDefault();
      self.setState({isOldEnough: true, confirmedAge: true, afterKev: true});
    }

    return <div className="App" style={{
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundRepeat: 'repeat',
      backgroundImage: `url(${desktopImage})`,
      backgroundColour: `#ff0000`
    }}>
      {afterKev ?
        <header className="App-header">
          <p className={sensible}>
            <h1>"Media Brewer"</h1>
            At this time of COVID-19 I find myself currently between jobs working from home - and beer brewing demand is down<br/>My main profession is actually software engineering - I'm more than happy to help out on small projects. Maybe write about your technology, help you bring up proof-of-concept, or work on small code projects (I have experience in most programming languages and will just adapt to your style)<br/>
            <br/>
            You can contact me about freelancing or full-time paid work in the following ways...
            <br/>
            <br/>
            Head to LinkedIn <a href={"https://www.linkedin.com/in/kevleyski/"} target={"_blank"} className={classLink3}>@kevleyski</a>
            <br/>
            <br/>
            Or email <a href={"mailto:kev@pyrmontbrewery.com.au"} target={"_blank"} className={classLink3}>kev@pyrmontbrewery.com.au</a>
            <br/>
            <br/>
            My resume <a href={"kjsl_resume_2020.pdf"} target={"_blank"} className={classLink3}>PDF</a> - <a href={"kjsl_resume_2020.docx"} target={"_blank"} className={classLink3}>Word</a>
            <br/>
            <br/>

            Some example blogs/slides...<br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQ195P_Pi9yvdBtV_PkECqyT6-WRqu7PtfmPjZzXKHy7hYJPV6P5VQFrWqhdtnohslk4T0OZ7LO0S7r/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
              Pyrmont Brewery and brewing beer in and around Sydney in colonial tie up until today, click here<br/>
            </a>
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vSy9Q-L7epQagpJuqpImXzekAqMfpbJT6pMjYFsHoUaGrxTIY2-9n2_bxhe0QU-5Qi4bMr2dYQLyfab/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
              Raspberry Pi's - including AstroPi and possibly the Australian Space Agency involvement - click here to learn more about them
            </a>
            <br/>
            <br/>
            Thanks for stopping by!<br/>As for the 8-bit ZX Spectrum inspired website? This was just an afternoon hack with React! It's not something I claim I do at all well! ;-)<br/>
            Kev
            <br/>
          </p>
          <a href={"https://tinyurl.com/t2by8hz"}><img src={logo} className="App-logo" alt=""/></a>
          <br/>
          <br/>
          <br/>
        </header>
        :

      mightBeUnder18 ? confirmedAge ?

        <header className="App-header">
          <p>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            Sorry, but it's mega important that you are 18 or over for us to discuss the supply of alcohol with you
            under the
            liquor and gaming rules here in New South Wales, Australia (and most parts of our planet)<br/><br/>
            Please though, do come back when you are 18 we are ready to help you!<br/>
            (remember, drinking alcohol is neither big or clever)
            <br/>
            <br/>
            R Tape loading error, 0:1
            </a>
          </p>
          <a href={"https://tinyurl.com/t2by8hz"}><img src={logo} className="App-logo" alt=""/></a>
          <br/>
          <br/>
          <br/>
        </header>
        :
        <header className="App-header">
          <p>
            Before we go on, we need you to confirm you are 18 years or older<br/><br/>
            Were you born on or before <div className="speccy_flash_black">{today.toString().substring(0, 15)}?</div>
            <br/>
            <div className="ButtonNo" id="no" onClick={handleTooYoung}>No, I'm too young</div>
            <br/>
            <div className="ButtonYes" id="yes18" onClick={handleOldEnough}>Strewth, I'm bloody old</div>
            <br/>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            &copy; 2007 Pyrmont Brewery
            <br/>
              <br/>
            <div className="ButtonKev" id="afterKev" onClick={handleAfterKev}>COVID-19 update - looking for the 'Media Brewer'? head here</div>
            </a>
          </p>
          <br/>
          <br/>
          <br/>
        </header>
        :
        <header className="App-header">
          <p>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQ195P_Pi9yvdBtV_PkECqyT6-WRqu7PtfmPjZzXKHy7hYJPV6P5VQFrWqhdtnohslk4T0OZ7LO0S7r/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink2}>
              Nestled amongst the Pyrmont yellowblock sandstone hides a secret brewery! (about us)
            </a>
          </p>
          <p>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vSy9Q-L7epQagpJuqpImXzekAqMfpbJT6pMjYFsHoUaGrxTIY2-9n2_bxhe0QU-5Qi4bMr2dYQLyfab/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink2}>
              We use Raspberry Pi's (learn more!)
            </a>
            <br/>
          </p>

          <div className="StringSpin">
            <div className="LeftStringSpin">
              All grain beers brewed in Pyrmont
            </div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelHalfWayHouseChocolateStout})`}}><a
              href={"mailto:kegs_halfway@pyrmontbrewery.com?subject=Beer: Half Way House&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Half Way House<br/>Chocolate Stout<br/>4.5%<br/></a></div>
            <div className="BeerDesc">Half Way House was the sandstone quarry and later a pub on Miller Street where the
              brewery is today. The pub didn't survive the Glebe Island bridge to Anzac bridge upgrade. <br/><br/>This
              beer is an English style double chocolate stout (and yes contains real Lindt couverture!)<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelWhingingPomBestBitter})`}}><a
              href={"mailto:kegs_whingingpom@pyrmontbrewery.com?subject=Beer: Whinging Pom Bitter&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Whinging Pom<br/>Real Ale<br/>4.4%<br/><br/></a></div>
            <div className="BeerDesc">British Bitter for all you expats of which there are many in Pyrmont! <br/><br/>A
              classic UK Maris Otter based Real Ale, with UK Fuggles and East Kent Goldings. Our English styles are
              lower in carbonation and if you want, can be gravity served straight from the keg without
              refrigeration<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelMaybankeDarkMild})`}}><a
              href={"mailto:kegs_maybanke@pyrmontbrewery.com?subject=Beer: Maybanke Dark Mild&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Maybanke<br/>Dark Mild<br/>3.4%<br/><br/><br/></a></div>
            <div className="BeerDesc">Maybanke Anderson set up and operated the first kindergarten school here in
              Australia. An amazing achievement! <br/><br/>This is an English Midlands dark mild (mid-strength) similar
              to Banks' Dark Mild<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelArrogantHarrisStrongAle})`}}><a
              href={"mailto:kegs_arrogant@pyrmontbrewery.com?subject=Beer: Arrogan Harris Strong Ale&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Arrogant Harris<br/>Strong Ale<br/>7.0%<br/><br/></a></div>
            <div className="BeerDesc">John Harris was surgeon to the New South Wales Corps, owned most of Ultimo and
              lived in Pyrmont. He didn't always get on with everyone and was court marshalled (twice)<br/><br/>This
              beer is inspired by the famously yummy brews 'you probably won't like' from San Diego,
              California<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelQuarryQuafferAussieLager})`}}><a
              href={"mailto:kegs_quaffer@pyrmontbrewery.com?subject=Beer: Quarry Quaffer Aussie Lager&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Quarry Quaffer<br/>Aussie Lager<br/>4.9%<br/></a></div>
            <div className="BeerDesc">"Like a wave of Angels crashing over me tongue!" [Dave 'Sensational'
              Robbo]<br/><br/>Very much like VB/Carlton it's sweet and bitter at the same time, Pride of Ringwood hops
              all the way, full strength lager beer<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelParadiseFrenchSaison})`}}><a
              href={"mailto:kegs_paradise@pyrmontbrewery.com?subject=Beer: Paradise Saison&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Paradise<br/>Saison<br/>6.8%<br/><br/><br/></a></div>
            <div className="BeerDesc">Paradise quarry is nearest the brewery, so named being the easiest
              sandstone to extract and work with, Sydney GPO building, Central, Art Gallery, RPA, Town Hall and many
              others all came from Paradise. <br/><br/>Traditional farmhouse style Saison, gently hopped with Centennial and Nelson Sauvignon<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelPurgatoryPaleAle})`}}><a
              href={"mailto:kegs_purgatory@pyrmontbrewery.com?subject=Beer: Purgatory Pale Ale&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Purgatory<br/>Pale Ale<br/>4.9%<br/><br/><br/></a></div>
            <div className="BeerDesc">Purgatory was the quarry round by the Glebe Island bridge. <br/><br/>This beer is
              similar to some Western Australian style 2-row pale ale with plenty of Challenger hops<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelHellHoleHelles})`}}><a
              href={"mailto:kegs_hellhole@pyrmontbrewery.com?subject=Beer: Hell Hole Helles&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Hell Hole<br/>Helles<br/>4.7%<br/><br/><br/></a></div>
            <div className="BeerDesc">Hell Hole was the quarry where the Sydney Fish Markets stands today, it used to
              flood a lot making it not much fun to deal with. <br/><br/>German Dortmunder style pilsner lager with
              Tassie Enigma hops<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelWokosCloudyCider})`}}><a
              href={"mailto:kegs_cider@pyrmontbrewery.com?subject=Beer: Wokos Cloudy Apple Cider&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Woko's<br/>Cloudy Cider<br/>5.1%<br/><br/></a></div>
            <div className="BeerDesc">James 'Woko' Watkinson was well known for teaching swimming and water polo in
              Pyrmont<br/><br/>This is a beautiful unfiltered apple cider made with English apples - it's slightly sweet
              but with a dry finish<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <br/>
          <p>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            Read about the history of brewing in and around Pyrmont here
            </a>
          </p>
          <p>
            Being a massive fan of open source and creative commons, our head brewer
            is sharing a small selection of pilot batch recipes for you to have a go at home:<br/>
            <a href={"Beer Arrogant Bastard.xml"} target={"_blank"} className={classLink}>Arrogant Bastard.xml</a> -
            American Strong Ale<br/>
            <a href={"Beer Brexit.bsmx"} target={"_blank"} className={classLink}>Brexit.bsmx</a> - British Bitter<br/>
            <a href={"Beer Demo Gremlins.bsmx"} target={"_blank"} className={classLink}>Demo Gremlins.bsmx</a> -
            Australian Pale Ale<br/>
            <a href={"Beer Kaibrau Kolsch.bsmx"} target={"_blank"} className={classLink}>Kaibrau Kolsch.bsmx</a> -
            German Kolsch<br/>
            <a href={"Beer Oompa Loomper.bsmx"} target={"_blank"} className={classLink}>Oompa Loomper.bsmx</a> -
            Chocolate Porter<br/>
            <a href={"Beer Rudolf Red.bsmx"} target={"_blank"} className={classLink}>Rudolf Red.bsmx</a> - Red
            Ale<br/>
            <a href={"Beer Seong Cerveza.bsmx"} target={"_blank"} className={classLink}>Seong Cerveza.bsmx</a> -
            Cerveza<br/>
            <a href={"Beer Suz Saison.bsmx"} target={"_blank"} className={classLink}>Suz Saison.bsmx</a> - French
            Saison
            </p>
          <br/>
          <p>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
              The Pyrmont Brewery has been churning out the good stuff here in the city of Sydney,
              Australia since 2007. We're not quite in a position today to sell you beer, but if you live or work in Pyrmont you
              are likely to bump in to it at various local meet-ups<br/>We'll let you know when the liquor producers license
              comes through, both here and on social media<br/>
              <img src={PyrmontBrewery_Kegerator} width="70%"
                   style={{opacity: 0.9, display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
            </a>
            <br/>
          </p>

          <p>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            pyrmontbrewery.com.au<br/>
            ABN: 47 824 483 808<br/>
            Tel: 9692 0016
            <br/><br/>
            &copy; 2007 Pyrmont Brewery
            <br/><br/>
            0 OK, 100:1
            <br/>
            </a>
          </p>

          <br/>
          <br/>
          <a href={"https://tinyurl.com/t2by8hz"}><img src={logo} className="App-logo" alt=""/></a>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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

function Topic({match}) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({match}) {
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

      <Route path={`${match.path}/:id`} component={Topic}/>
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
