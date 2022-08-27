import React, {Component} from 'react';
import logo from './logo.svg';
import PyrmontBrewery_Kegerator from './PyrmontBrewery_Kegerator.png';
import CheersThen from './cheers.png';
import PyrmontBrewery_WheelieBin from './wheelie.png';
import Loading from './pyrmontbwy.gif';
import Buildings from './pyrmont_sandstone_buildings.jpeg';
import './App.css';
import Time from './Time';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import desktopImage from './pyrmontbwy.gif';
import quarryImage from './beer.png';
import BuyThisBeer from './buy_beer.png';
import SlidesCover from './slides_cover.png';
import LabelHalfWayHouseChocolateStout from './label_half_way_house_chocolate_stout.png';
import LabelHalfWayHouseZeroAlc from './label_half_way_house_zero_alcohol.png';
import LabelArrogantHarrisStrongAle from './label_arrogant_harris_strong_ale.png';
import LabelMaybankeDarkMild from './label_maybanke_dark_mild.png';
import LabelCaneiteBourbonImperial from './label_caneite_imperial.png';
import LabelWhingingPomBestBitter from './label_whinging_pom_best_bitter.png';
import LabelWokosCloudyCider from './label_wokos_cloudy_cider.png';
import LabelPurgatoryPaleAle from './label_purgatory_pale_ale.png';
import LabelParadiseFrenchSaison from './label_paradise_french_saison.png';
import LabelQuarryQuafferAussieLager from './label_quarry_quaffer_aussie_lager.png';
import LabelHellHoleHelles from './label_hell_hole_helles.png';
import LabelGoldsbroughNEPIA from './label_goldsbrough_neipa.png';
import LabelGeneric from './label_generic.png';

import ReactPixel from 'react-facebook-pixel';
import ReactGA from 'react-ga';
import Beer from "./Beer";

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

    return <BrowserRouter>
      <Routes>
      <Route path="/about">
      </Route>
      <Route path="/time" render={() => {window.location.href="time.html"}}></Route>
        <Route path="/streams" render={() => {window.location.href="streams.html"}}></Route>
      <Route path="/">
      </Route>
    </Routes><div className="App" style={{
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundRepeat: 'repeat',
      backgroundImage: `url(${desktopImage})`,
      backgroundColour: `#ff0000`
    }}>
      {afterKev ?
        <header className="App-header">
          <p><a href="back" className={classLink2}>&lt;-</a></p>
          <p className={sensible}>
            <h1>"Media Brewer"</h1>
            My main profession is actually software engineering - I'm more than happy to help out on small projects as a temporary solution. <br/>
            Maybe I'll write about your technology, help you bring up proof-of-concept, or work on small code projects (I have experience in most programming languages and will just adapt to your style)<br/>
            Other side projects I've been working on recently is peer-to-peer media sharing, e.g. over Protocol Labs IPFS<br/>
            <br/>
            You can contact me about casual freelancing in the following ways...
            <br/>
            <br/>
            Head to LinkedIn <a href={"https://www.linkedin.com/in/kevleyski/"} target={"_blank"} className={classLink3}>@kevleyski</a>
            <br/>
            <br/>
            Or email <a href={"mailto:kev@pyrmontbrewery.com.au"} target={"_blank"} className={classLink3}>kev@pyrmontbrewery.com.au</a>
            <br/>
            <br/>
            My <a href={"resume.html"} target={"_blank"} className={classLink3}>resume is here</a>
            <br/>
            <br/>
            I've also done a fair amount of public speaking
            <br/>
            Some of my public presentations topics (with links to descriptive version of the slide decks):
            <br/>
            <br/>
            <a href={"https://docs.google.com/presentation/d/164PPi6yb2yFfJNBAkduXvRIrUiPzpjjjJ8IWAsqlNK4/edit#slide=id.p"} target={"_blank"} className={classLink3}>Common Media Server Data</a> - presented in San Fransico on behalf of the CES CTA Wave
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vRn6zabikGWZOyXG5924sb9BoK1E35wtNjQZ68mr8NwGDID1dzuZYuPYfKXDttIkMNQ4qLgxC84IC_I/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>Low Latency media streaming</a> - presented at Sydney ICC - RTMP/RIST/SRT/WebRTC/LL-HLS/ULL-CMAF (150+ audience)
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQa7fH73RpJGE6bT4lqrn1il8slRPJIn_AXB_HGT-Q0IydWNJMvv7UA-WJHhOGQm6rEcsPIG7_XBHmm/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>AV1 Video Codec</a> - presented at Sydney Hilton hotel (100+ audience)
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vR5eczB2evEqYFL0vQ4dazuWmx9mbzJDyHFIs8pIGgKYD9c9yeLycpHcprUuXQTBp6DkzdGBSlnuawI/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>VOD2Live</a> - presented at Demuxed San Francisco (750+ audience)
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vRX58ErIM9fg8cUOGolq-LnvcLd1IhR9XanRiUEaRf9nbVWdFsnQgLU1dcSRxm43m0HPg7OQjizjlJ9/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>WebAssembly at the CDN Edge</a> - publicly presented at Sydney Video meet-up
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vSy9Q-L7epQagpJuqpImXzekAqMfpbJT6pMjYFsHoUaGrxTIY2-9n2_bxhe0QU-5Qi4bMr2dYQLyfab/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>Raspberry Pi</a> - presented at JayCar Electronics maker hub Central Park
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vTxzthkg5eJDQRtc7GswXj80eFrgBa9oza7O5NIhpOIoj5QbeYv_gNvHaZAAgb1VgDlQhwK40e29xPV/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>AI TensorFlow for ATR</a> - Google Sydney side presentation
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQZJ5mgP2jY2tc2PEdFS8Ci1qiy7Zl4YlypWHoR8JVCUr6LpsHdbi290PM16If1JMYZbG8b7WbanQog/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>XDebug Profiling</a> - publicly presented at Deputy Sydney
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQ195P_Pi9yvdBtV_PkECqyT6-WRqu7PtfmPjZzXKHy7hYJPV6P5VQFrWqhdtnohslk4T0OZ7LO0S7r/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>History of Brewing in Australia</a> - publicly presented before the Pyrmont History Group and also wework
            <br/>
            <br/>
            <br/>
            Also my <a href={"dissertation.html"} className={classLink3}>
            1997 university dissertation is here</a> and was a discussion on the state of the internet, world wide web and eCommerce at that time, you can still learn HTML and how CGI works from this today (2022) its not changed that much :-)<br/>
            <br/>
          </p>
          <a href={"https://tinyurl.com/t2by8hz"}><img src={logo} className="App-logo" alt="Pyrmont Brewery Logo which is a secret squirrel"/></a>
          <br/>
          <br/>
          <br/>
        </header>
        :

      mightBeUnder18 ? confirmedAge ?

        <header className="App-header">
          <p><a href="back" className={classLink2}>&lt;-</a></p>
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
          <a href={"https://tinyurl.com/t2by8hz"}><img src={logo} className="App-logo" alt="Pyrmont Brewery Logo which is a secret squirrel"/></a>
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
            <div className="ButtonYes" id="yes18" onClick={handleOldEnough}>Strewth, yeah I'm bloody old</div>
            <br/>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            &copy; 2007 Pyrmont Brewery
            <br/>
              <br/>
            <div className="ButtonKev" id="afterKev" onClick={handleAfterKev}>Looking for Kev 'Media Brewer'?</div>
            </a>
          </p>
          <br/>
          <br/>
        </header>
        :
        <header className="App-header">
          <p>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            <div className="speccy_flash_black">GOTO</div>&gt; Nestled amongst Pyrmont's sandstone hides a secret brewery!<br/><br/>Brewing ales similar to those that came from the original 1880 Pyrmont Brewery
            </a>
          </p>
          <p>
            <a href={"metaversebrewery.html"} target={"_blank"} className={classLink2}>
              <div className="speccy_flash_black">GOTO</div>&gt; Metaverse VR/AR brewery!<br/><br/>The world's first VR brewery! Meta Horizon World where you tailor real beer brewed in Pyrmont!
            </a>
            <br/>
          </p>
          <p>
            <a href={"aibeerlabels.html"} target={"_blank"} className={classLink2}>
              <div className="speccy_flash_black">GOTO</div>&gt; AI Beer Label/Beer mat coaster maker<br/><br/>Can't draw? Use your words instead! DALL.E-2 based text to image AI to generate a legal can wrappers and get them printed
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
          LOAD "CORE_RANGE" beers<br/><br/>
          <Beer name="Half Way House" abv="4.5" ibu="29" ebc="68"
                beerstyle="Chocolate Stout" label_url={`url(${LabelHalfWayHouseChocolateStout})`}>
            Half Way House was the sandstone quarry and later a pub on Miller Street where the
            brewery is today. The pub didn't survive the Glebe Island bridge to Anzac bridge upgrade.<br/><br/>
            English stout (and yes contains real Swiss Lindt couverture!)
          </Beer>
          <div><br/></div>
          <Beer name="Whinging Pom" abv="4.4" ibu="30" ebc="27"
                beerstyle="Real English Ale" label_url={`url(${LabelWhingingPomBestBitter})`}>
            British Bitter for all you expats of which there are many in Pyrmont! <br/><br/>
            A classic UK Maris Otter based Real Ale, with UK Fuggles and East Kent Goldings. Our English styles are
            lower in carbonation and if you want, can be gravity served straight from the keg without
            refrigeration
          </Beer>
          <div><br/></div>
          <Beer name="Maybanke" abv="3.4" ibu="20" ebc="35"
                beerstyle="Dark Mild" label_url={`url(${LabelMaybankeDarkMild})`}>
            Maybanke Anderson set up and operated the first kindergarten school here in
            Australia. An amazing achievement!<br/><br/>
            This is an English Midlands dark mild (mid-strength) similar
            to Banks' Dark Mild
          </Beer>
          <div><br/></div>
          LOAD "SEASONALS" beer<br/><br/>
          <Beer name="Goldsbrough" abv="7.3" ibu="13" ebc="12"
                beerstyle="Hazy NEIPA" label_url={`url(${LabelGoldsbroughNEPIA})`}>
            Goldsborough Mort was the large wool stores in Pyrmont. This fruity Double IPA Hazy inspired by Mountain Culture "Dolly"<br/><br/>
            Fruity notes, lots of fresh dry hopping in this one
          </Beer>
          <div><br/></div>
          <Beer name="Caneite" abv="10.5" ibu="50" ebc="73"
                beerstyle="Bourbon Imperial" label_url={`url(${LabelCaneiteBourbonImperial})`}>
            Caneite was CSR Pyrmont's solution as to what to do with the sugar cane husks/bagasse, mix it in these giant balls and squash it into building materials<br/><br/>
            This is a sweet Marris Otter based Imperial stout which is conditioned with Bourbon oak barrel
          </Beer>
          <div><br/></div>
          <Beer name="Arrogant Harris" abv="7.0" ibu="75" ebc="37"
                beerstyle="Strong Ale" label_url={`url(${LabelArrogantHarrisStrongAle})`}>
            John Harris was surgeon to the New South Wales Corps, owned most of Ultimo and
            lived in Pyrmont. He didn't always get on with everyone and was court marshalled (twice)<br/><br/>
            Inspired by the famously yummy brews 'you probably really won't like and are not worthy of' from San Diego,
            California
          </Beer>
          <div><br/></div>
          <Beer name="Quarry Quaffer" abv="4.9" ibu="25" ebc="6"
                beerstyle="Aussie Bitter Ale" label_url={`url(${LabelQuarryQuafferAussieLager})`}>
            Like a wave of Angels crashing over me tongue!" [Dave 'Sensational' Robbo]<br/><br/>
            Very much like VB/Carlton it's sweet and bitter at the same time, Pride of Ringwood hops
            all the way, full strength lager beer
          </Beer>
          <div><br/></div>
          LOAD "QUARRYS" beer range<br/><br/>
          <Beer name="Paradise" abv="6.8" ibu="26" ebc="9"
                beerstyle="French Saison" label_url={`url(${LabelParadiseFrenchSaison})`}>
            This quarry face is nearest the brewery, so named being the easiest
            sandstone to extract and work with, Sydney GPO building, Central, Art Gallery, RPA, Town Hall and many
            others all came from Paradise. <br/><br/>
            Gently hopped with Centennial and Nelson Sauvignon
          </Beer>
          <div><br/></div>
          <Beer name="Purgatory" abv="4.9" ibu="40" ebc="12"
                beerstyle="Pale Ale" label_url={`url(${LabelPurgatoryPaleAle})`}>
            This quarry was nearest to Glebe Island bridge/Jackson Landing. <br/><br/>
            Similar to some Western Australian style 2-row pale ale with plenty of Challenger hops
          </Beer>
          <div><br/></div>
          <Beer name="Hell Hole" abv="4.7" ibu="35" ebc="7"
                beerstyle="Helles" label_url={`url(${LabelHellHoleHelles})`}>
            This quarry where the Sydney Fish Markets stands today, it used to
            flood a lot making it not much fun to deal with.<br/><br/>
            German Dortmunder style pilsner lager but with Tassie Enigma hops
          </Beer>
          <div><br/></div>
          <Beer name="Wokos" abv="5.1" ibu="0" ebc="11"
                beerstyle="Cloudy Apple Cider" label_url={`url(${LabelWokosCloudyCider})`}>
            James 'Woko' Watkinson was well known for teaching swimming and water polo in Pyrmont<br/><br/>
            This is an unfiltered apple cider made with English apples (concentrate) - it's slightly sweet to medium
            but with a dry finish
          </Beer>
          <div><br/></div>
          LOAD "LOW_ALCOHOL"<br/><br/>
          <Beer name="Half Way House ZERO" abv="Less than 0.5" ibu="29" ebc="68"
                beerstyle="" label_url={`url(${LabelHalfWayHouseZeroAlc})`}>
            Half Way House de-alcoholized through long pasteurisation at 80C and re-carbonated - most of the character
            of the original Half Way Stout is still in here
          </Beer>
          <p>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
              <div className="speccy_flash_black">GOTO</div>&gt; History of brewing in Pyrmont<br/><br/>Read about the history of brewing in and around Pyrmont here
            </a>
          </p>
          <p>
            <a href={"beercoin.html"} target={"_blank"} className={classLink2}>
              <div className="speccy_flash_black">GOTO</div>&gt; Beercoin!<br/><br/>Pyrmont Brewery has its own cryptocurrency "Beercoin" to track via blockchain inventory, recipe manifest -> fermenter vessel -> brite tank -> keg -> to venue (learn more!)
            </a>
            <br/>
          </p>
          <p>
            <a href={"raspberrypi.html"} target={"_blank"} className={classLink2}>
              <div className="speccy_flash_black">GOTO</div>&gt; Raspberry Pi @ Pyrmont Brewery<br/><br/>
              We use various Raspberry Pi's to help brew and monitor our beers at the Pyrmont Brewery (learn more!)
            </a>
            <br/>
          </p>
          <p>
            <a href={"nftrecipies.html"} target={"_blank"} className={classLink2}>
              <div className="speccy_flash_black">GOTO</div>&gt; Own NFT Recipies!<br/><br/>Pyrmont Brewery is selling NFTs (Ethereum Mainnet) of some seasonal beer recipies if you want to buy them or brew them in the Metaverse brewery
            </a>
            <br/>
          </p>
          <p>
            &gt; Open Source Beer!<br/><br/>
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
          <br/>
          <p>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
              The Pyrmont Brewery has been churning out the good stuff here in the city of Sydney,
              Australia since 2007. We're not quite in a position today to sell you beer, but if you live or work in Pyrmont you
              are likely to bump in to it at various local meet-ups<br/>We'll let you know when the liquor producers license
              comes through, both here and on social media<br/>
              <img src={PyrmontBrewery_Kegerator} width="70%"
                   style={{opacity: 0.9, display: "block", marginLeft: "auto", marginRight: "auto"}}
              alt="A kegerator fridge with beer taps and fridegs with cans of Pyrmont beer surrounding it"></img>
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
          <a href={"https://tinyurl.com/t2by8hz"}><img src={logo} className="App-logo" alt="Pyrmont Brewery Logo which is a secret squirrel"/></a>
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
      </BrowserRouter>
  }
}

function Home() {
  return "";
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
