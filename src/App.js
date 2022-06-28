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
          <p className={sensible}>
            <h1>"Media Brewer"</h1>
            At this time of lockdown due to COVID-19 - and beer brewing demand is down generally<br/><br/>
            My main profession is actually software engineering - I'm more than happy to help out on small projects as a temporary solution. <br/>
            Maybe I'll write about your technology, help you bring up proof-of-concept, or work on small code projects (I have experience in most programming languages and will just adapt to your style)<br/>
            Other side projects I've been working on recently is peer-to-peer media sharing, e.g. over Protocol Labs IPFS<br/>
            And streaming weddings (in NSW only 5 persons are currenlty allowed to attend a wedding ceremony), we're attempting to virtually inject the congregation!<br/>
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
            My <a href={"resume.html"} target={"_blank"} className={classLink3}>resume is here</a> and also <a href={"kjsl_resume_2020.pdf"} target={"_blank"} className={classLink3}>PDF</a> - <a href={"kjsl_resume_2020.docx"} target={"_blank"} className={classLink3}>Word</a>
            <br/>
            <br/>

            <a href={"/about"} className={classLink3}>
              Some example blogs/slides and examples, click here<br/>
            </a>
            Please stay safe,<br/>
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
            <div className="ButtonYes" id="yes18" onClick={handleOldEnough}>Strewth, yeah I'm bloody old</div>
            <br/>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            &copy; 2007 Pyrmont Brewery
            <br/>
              <br/>
            <div className="ButtonKev" id="afterKev" onClick={handleAfterKev}>COVID-19 update - looking for 'Media Brewer'?</div>
            </a>
          </p>
          <br/>
          <br/>
        </header>
        :
        <header className="App-header">
          <p>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            <div className="Info">
              <div className="BeerSnap" style={{backgroundImage: `url(${SlidesCover})`}}><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
              &nbsp;
              <div className="BeerDesc">&gt; Nestled amongst Pyrmont's sandstone hides a secret brewery!<br/><br/>Brewing ales similar to those that came from the original 1880 Pyrmont Brewery.<div className="speccy_flash_black">Read all out it here</div></div>
            </div>
            </a>
          </p>

          <div className="StringSpin">
            <div className="LeftStringSpin">
              All grain beers brewed in Pyrmont
            </div>
          </div>
          <div>
            <br/>
          </div>
          Core range
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelHalfWayHouseChocolateStout})`}}><a
              href={"mailto:kegs_halfway@pyrmontbrewery.com?subject=Beer: Half Way House&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Half Way House<br/>Chocolate Stout<br/>4.5%<br/></a></div>
            <div className="BeerDesc">&gt; Half Way House Chocolate Stout<br/>4.5% IBU 29 EBC 68<br/><br/>Half Way House was the sandstone quarry and later a pub on Miller Street where the
              brewery is today. The pub didn't survive the Glebe Island bridge to Anzac bridge upgrade.<br/><br/>This
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
            <div className="BeerDesc">&gt; Whinging Pom Real Ale<br/>4.4% IBU 30 EBC 27<br/><br/>British Bitter for all you expats of which there are many in Pyrmont! <br/><br/>A
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
            <div className="BeerDesc">&gt; Maybanke Dark Mild<br/>3.4% IBU 20 EBC 35<br/><br/>Maybanke Anderson set up and operated the first kindergarten school here in
              Australia. An amazing achievement! <br/><br/>This is an English Midlands dark mild (mid-strength) similar
              to Banks' Dark Mild<br/><br/></div>
          </div>
          Seasonals
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelGoldsbroughNEPIA})`}}><a
                href={"mailto:kegs_whingingpom@pyrmontbrewery.com?subject=Beer: Whinging Pom Bitter&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
                target={"_blank"}
                className={beerLink}>Program:<br/>Goldsbrough<br/>Hazy New England IIPA<br/>7.3%<br/><br/></a></div>
            <div className="BeerDesc">&gt; Goldsbrough Hazy New England IIPA<br/>7.3% IBU 13 EBC 12<br/><br/>Goldsborough Mort was the large wool stores in Pyrmont. This fruity Double IPA Hazy inspired by Mountain Culture "Dolly"
              <br/><br/>Fruity notes, lots of fresh dry hopping in this one<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelCaneiteBourbonImperial})`}}><a
              href={"mailto:kegs_caneite@pyrmontbrewery.com?subject=Beer: Caneite Imperial&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Caneite<br/>Bourbon<br/>Barrel<br/>Imperial<br/>10.5%<br/><br/></a></div>
            <div className="BeerDesc">&gt; Caneite Bourbon Barrel Imperial<br/>10.5% IBU 50 EBC 73<br/><br/>Caneite was CSR Pyrmont's solution as to what to do with the sugar cane husks/bagasse, mix it in these giant balls and squash it into building materials<br/><br/>This is a sweet Marris Otter based Imperial stout which is conditioned with Bourbon oak barrel
              <br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelArrogantHarrisStrongAle})`}}><a
              href={"mailto:kegs_arrogant@pyrmontbrewery.com?subject=Beer: Arrogant Harris Strong Ale&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Arrogant Harris<br/>Strong Ale<br/>7.0%<br/><br/></a></div>
            <div className="BeerDesc">&gt; Arrogant Harris Strong Ale<br/>7.0% IBU 75 EBC 37<br/><br/>John Harris was surgeon to the New South Wales Corps, owned most of Ultimo and
              lived in Pyrmont. He didn't always get on with everyone and was court marshalled (twice)<br/><br/>This
              beer is inspired by the famously yummy brews 'you probably really won't like and are not worthy of' from San Diego,
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
            <div className="BeerDesc">&gt; Quarry Quaffer Aussie Lager<br/>4.9% IBU 20 EBC 10<br/><br/>"Like a wave of Angels crashing over me tongue!" [Dave 'Sensational'
              Robbo]<br/><br/>Very much like VB/Carlton it's sweet and bitter at the same time, Pride of Ringwood hops
              all the way, full strength lager beer<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          Quarry range
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelParadiseFrenchSaison})`}}><a
              href={"mailto:kegs_paradise@pyrmontbrewery.com?subject=Beer: Paradise Saison&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Paradise<br/>Saison<br/>6.8%<br/><br/><br/></a></div>
            <div className="BeerDesc">&gt; Paradise Saison<br/>6.8% IBU 26 EBC 9<br/><br/>This quarry face is nearest the brewery, so named being the easiest
              sandstone to extract and work with, Sydney GPO building, Central, Art Gallery, RPA, Town Hall and many
              others all came from Paradise. <br/><br/>Gently hopped with Centennial and Nelson Sauvignon<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelPurgatoryPaleAle})`}}><a
              href={"mailto:kegs_purgatory@pyrmontbrewery.com?subject=Beer: Purgatory Pale Ale&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
              target={"_blank"}
              className={beerLink}>Program:<br/>Purgatory<br/>Pale Ale<br/>4.9%<br/><br/><br/></a></div>
            <div className="BeerDesc">&gt; Purgatory Pale<br/>4.9% IBU 40 EBC 12<br/><br/>This quarry round by the Glebe Island bridge. <br/><br/>This beer is
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
            <div className="BeerDesc">&gt; Hell Hole Helles<br/>4.7% IBC 35 EBC 7<br/><br/>This quarry where the Sydney Fish Markets stands today, it used to
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
            <div className="BeerDesc">&gt; Wokos's Cloudy Apple Cider<br/>5.1%<br/><br/>James 'Woko' Watkinson was well known for teaching swimming and water polo in
              Pyrmont<br/><br/>This is an unfiltered apple cider made with English apples (concentrate) - it's slightly sweet to medium
              but with a dry finish<br/><br/></div>
          </div>
          <div>
            <br/>
          </div>
          Low alcohol
          <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
            <div className="BeerSnap" style={{backgroundImage: `url(${LabelHalfWayHouseZeroAlc})`}}><a
                href={"mailto:kegs_halfway@pyrmontbrewery.com?subject=Beer: Half Way House ZERO&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
                target={"_blank"}
                className={beerLink}>Program:<br/>Half Way House ZERO<br/>Chocolate Stout<br/>&lt;0.5% IBU 29 EBC 68<br/></a></div>
            <div className="BeerDesc">&gt; Half Way House ZERO Alcohol Stout &lt;0.5%<br/><br/>Half Way House de-alcoholized through long pasteurisation at 80C and re-carbonated - most of the character of the original Half Way Stout is still in there<br/><br/></div>
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
            <a href={"beercoin.html"} target={"_blank"} className={classLink2}>
              &gt; Beercoin!<br/><br/>Pyrmont Brewery has its own cryptocurrency "Beercoin" to track via blockchain inventory, recipe manifest -> fermenter vessel -> brite tank -> keg -> to venue (learn more!)
            </a>
            <br/>
          </p>
          <p>
            <a href={"metaverse.html"} target={"_blank"} className={classLink2}>
              &gt; Metaverse VR/AR brewery!<br/><br/>Pyrmont Brewery is also heading to the metaverse! Worlds first VR brewery in WebXR where you can select ingredients and have real beer brewed and sent to you! Brew your own virtually pay with Beercoin save and sell your recipe for others as a NFT (learn more!)
            </a>
            <br/>
          </p>
          <p>
            <a href={"raspberrypi.html"} target={"_blank"} className={classLink2}>
              &gt; Raspberry Pi @ Pyrmont Brewery<br/><br/>
              We use various Raspberry Pi's to help brew and monitor our beers at the Pyrmont Brewery (learn more!)
            </a>
            <br/>
          </p>
          <p>
            <a href={"nftrecipies.html"} target={"_blank"} className={classLink2}>
              &gt; NFT Recipies!<br/><br/>Pyrmont Brewery is selling NFTs (Ethereum network) of seasonal beer recipies if you want to buy them
            </a>
            <br/>
          </p>
          <p>
            &gt;Open Source<br/><br/>
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
      </BrowserRouter>
  }
}

function Home() {
  return "";
}

function About() {
  return <h3>About</h3>
    // <header className="App-header">
    //   <p className={sensible}>
    //     Some example blogs/slides and examples...<br/>
    //     <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQ195P_Pi9yvdBtV_PkECqyT6-WRqu7PtfmPjZzXKHy7hYJPV6P5VQFrWqhdtnohslk4T0OZ7LO0S7r/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
    //       Pyrmont Brewery and brewing beer in and around Sydney in colonial times up until today, click here<br/>
    //     </a>
    //     <iframe
    //         src="https://docs.google.com/presentation/d/e/2PACX-1vQ195P_Pi9yvdBtV_PkECqyT6-WRqu7PtfmPjZzXKHy7hYJPV6P5VQFrWqhdtnohslk4T0OZ7LO0S7r/embed?start=false&loop=false&delayms=3000"
    //         frameBorder="0" width="960" height="569" allowFullScreen="true" mozallowfullscreen="true"
    //         webkitallowfullscreen="true"></iframe>
    //     <br/>
    //     <a href={"https://docs.google.com/presentation/d/e/2PACX-1vSy9Q-L7epQagpJuqpImXzekAqMfpbJT6pMjYFsHoUaGrxTIY2-9n2_bxhe0QU-5Qi4bMr2dYQLyfab/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
    //       Raspberry Pi's - including AstroPi and possibly the Australian Space Agency involvement - click here to learn more about them
    //     </a>
    //     <iframe
    //         src="https://docs.google.com/presentation/d/e/2PACX-1vSy9Q-L7epQagpJuqpImXzekAqMfpbJT6pMjYFsHoUaGrxTIY2-9n2_bxhe0QU-5Qi4bMr2dYQLyfab/embed?start=false&loop=false&delayms=3000"
    //         frameBorder="0" width="960" height="569" allowFullScreen="true" mozallowfullscreen="true"
    //         webkitallowfullscreen="true"></iframe>
    //     <br/>
    //     <a href={"https://docs.google.com/presentation/d/e/2PACX-1vR5eczB2evEqYFL0vQ4dazuWmx9mbzJDyHFIs8pIGgKYD9c9yeLycpHcprUuXQTBp6DkzdGBSlnuawI/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
    //       Wild Fire! - click here to for ideas around how video engineers can also help save lives
    //     </a>
    //     <iframe
    //         src="https://docs.google.com/presentation/d/e/2PACX-1vR5eczB2evEqYFL0vQ4dazuWmx9mbzJDyHFIs8pIGgKYD9c9yeLycpHcprUuXQTBp6DkzdGBSlnuawI/embed?start=false&loop=false&delayms=3000"
    //         frameBorder="0" width="960" height="569" allowFullScreen="true" mozallowfullscreen="true"
    //         webkitallowfullscreen="true"></iframe>
    //     <br/>
    //     <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQZJ5mgP2jY2tc2PEdFS8Ci1qiy7Zl4YlypWHoR8JVCUr6LpsHdbi290PM16If1JMYZbG8b7WbanQog/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
    //       XDebug - click here for info on debuggina dn profiling with XDebug
    //     </a>
    //     <iframe
    //         src="https://docs.google.com/presentation/d/e/2PACX-1vQZJ5mgP2jY2tc2PEdFS8Ci1qiy7Zl4YlypWHoR8JVCUr6LpsHdbi290PM16If1JMYZbG8b7WbanQog/embed?start=false&loop=false&delayms=3000"
    //         frameBorder="0" width="960" height="569" allowFullScreen="true" mozallowfullscreen="true"
    //         webkitallowfullscreen="true"></iframe>
    //     <br/>
    //     <a href={"https://docs.google.com/presentation/d/e/2PACX-1vRX58ErIM9fg8cUOGolq-LnvcLd1IhR9XanRiUEaRf9nbVWdFsnQgLU1dcSRxm43m0HPg7OQjizjlJ9/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
    //       WebAssembly - click here to learn for a quick intro about what it is
    //     </a>
    //     <iframe
    //         src="https://docs.google.com/presentation/d/e/2PACX-1vRX58ErIM9fg8cUOGolq-LnvcLd1IhR9XanRiUEaRf9nbVWdFsnQgLU1dcSRxm43m0HPg7OQjizjlJ9/embed?start=false&loop=false&delayms=3000"
    //         frameBorder="0" width="960" height="569" allowFullScreen="true" mozallowfullscreen="true"
    //         webkitallowfullscreen="true"></iframe>
    //     <br/>
    //     <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQa7fH73RpJGE6bT4lqrn1il8slRPJIn_AXB_HGT-Q0IydWNJMvv7UA-WJHhOGQm6rEcsPIG7_XBHmm/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
    //       AV1 Video codec - click here to learn what its about and how to get going with it
    //     </a>
    //     <iframe
    //         src="https://docs.google.com/presentation/d/e/2PACX-1vQa7fH73RpJGE6bT4lqrn1il8slRPJIn_AXB_HGT-Q0IydWNJMvv7UA-WJHhOGQm6rEcsPIG7_XBHmm/embed?start=false&loop=false&delayms=3000"
    //         frameBorder="0" width="960" height="569" allowFullScreen="true" mozallowfullscreen="true"
    //         webkitallowfullscreen="true"></iframe>
    //     <br/>
    //     <a href={"https://docs.google.com/presentation/d/e/2PACX-1vRn6zabikGWZOyXG5924sb9BoK1E35wtNjQZ68mr8NwGDID1dzuZYuPYfKXDttIkMNQ4qLgxC84IC_I/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
    //       Low Latency media streaming - click here to learn how it all works
    //     </a>
    //     <iframe
    //         src="https://docs.google.com/presentation/d/e/2PACX-1vRn6zabikGWZOyXG5924sb9BoK1E35wtNjQZ68mr8NwGDID1dzuZYuPYfKXDttIkMNQ4qLgxC84IC_I/embed?start=false&loop=false&delayms=3000"
    //         frameBorder="0" width="960" height="569" allowFullScreen="true" mozallowfullscreen="true"
    //         webkitallowfullscreen="true"></iframe>
    //     <br/>
    //     <br/>
    //     <br/>
    //     Thanks for stopping by!<br/>As for this 80's 8-bit ZX Spectrum inspired website? <br/>This was just an afternoon hack with React! It's not something I claim I do at all well and yes it's organic marketing for my beers!<br/>
    //     <br/>
    //   </p>
    //   <a href={"https://tinyurl.com/t2by8hz"}><img src={logo} className="App-logo" alt=""/></a>
    //   <br/>
    //   <br/>
    //   <br/>
    // </header>;
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
