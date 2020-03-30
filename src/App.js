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
            Media Brewer - video media technologist Kev can be contacted these ways...
            <br/>
            <br/>
            Head to  <a href={"https://www.linkedin.com/in/kevleyski/"} target={"_blank"} className={classLink2}>LinkedIn @kevleyski</a>
            <br/>
            <br/>
            Or email <a href={"mailto:kev@pyrmontbrewery.com.au"} target={"_blank"} className={classLink2}>kev@pyrmontbrewery.com.au</a>
            <br/>
            <br/>
            Resume <a href={"kjsl_resume_2020.pdf"} target={"_blank"} className={classLink3}>PDF</a> - <a href={"kjsl_resume_2020.docx"} target={"_blank"} className={classLink3}>Word</a>
            <br/>
            <br/>

            Blogs/slides...<br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vQ195P_Pi9yvdBtV_PkECqyT6-WRqu7PtfmPjZzXKHy7hYJPV6P5VQFrWqhdtnohslk4T0OZ7LO0S7r/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
              Pyrmont Brewery and brewing beer in Sydney here<br/>
            </a>
            <br/>
            <a href={"https://docs.google.com/presentation/d/e/2PACX-1vSy9Q-L7epQagpJuqpImXzekAqMfpbJT6pMjYFsHoUaGrxTIY2-9n2_bxhe0QU-5Qi4bMr2dYQLyfab/pub?start=false&loop=false&delayms=3000"} target={"_blank"} className={classLink3}>
              Raspberry Pi's - click here to learn more about them
            </a>
            <br/>
            <br/>
            What we're good at the Pyrmont Brewery...<br/><br/>
            HLS (FPS), MPEG-DASH and DVB-DASH manipulation<br/><br/>
            Can and will pull TS and fMP4 files apart and put them back together, maybe somewhere else maybe with its from other files - who knows, anyhow if the codec supports splicing I’ll make it happen, and synch the audio too<br/><br/>
            libav (FFmpeg, gstreamer)<br/><br/>
            AVFoundation (AppleTV, iOS, macOS)<br/><br/>
            ExoPlayer (Android TV)<br/><br/>
            Chromecast<br/><br/>
            <br/>
            <br/>
            Thanks for stopping by!<br/>As for the 8-bit ZX Spectrum inpsired website? This was just an afternoon of fun with React! It's not something I claim I do at all well ;-)<br/>
            Kev
            <br/>

            <br/>
            KEVIN STAUNTON-LAMBERT BSCS<br/>
            93 Miller Street, Pyrmont, Sydney, Australia • +61 423 173 002<br/>
            kevleyski@gmail.com<br/>
            <br/>
            EMPLOYMENT and EDUCATION (summary)<br/>
            <br/>
            October 2016 - (present)<br/>
            Switch Media [Sydney, Australia]<br/>
            Solutions Architect - Research & Development<br/>
            Streaming video engineer, tackling tough problems around the distribution of high<br/>
            quality encrypted video bitstreams to any player device anywhere in the world.<br/>
            Foxtel and SBS OnDemand media stitching (SSAI embedding IAB VAST based ads)<br/>
            HbbTV/SmartTV video streaming for Freeview Australia and New Zealand<br/>
            <br/>
            March 2005 - October 2016<br/>
            Kudelski/Nagra Media/OpenTV [Sydney, Australia]<br/>
            Software Expert, innovations R&D group.<br/>
            Developer of embedded Linux middleware for Asia-Pacific, European and<br/>
            US domestic digital television markets.<br/>
            Foxtel (and Austar) set-top-box software engineer (all models over 12 year period)<br/>
            <br/>
            May 2001 - Aug 2004<br/>
            Cisco/Scientific Atlanta/PowerTV [Cupertino, California, USA]<br/>
            Architect and senior lead developer of proprietary set-top-box middleware<br/>
            technology for US domestic, European and Japanese digital television<br/>
            markets.<br/>
            <br/>
            June 1998 - May 2001<br/>
            Virgin Media/ntl: [Covent Garden London, UK]<br/>
            Senior developer of interactive television and broadband ISP services<br/>
            used by millions of UK subscribers across multiple platforms.<br/>
            <br/>
            Sep 1996 - June 1998<br/>
            Telecom Italia/TMI Telecom [City, London, UK]<br/>
            Developer of a large data collection/reporting software to assess<br/>
            utilization and costs of the company wide-area-network.<br/>
            <br/>
            Sep 1994 - June 1998<br/>
            Huddersfield University [Yorkshire, UK]<br/>
            Graduate B.Sc. Computer Science (Software Development)<br/>
            <br/>
            EXPERIENCE<br/>
            <br/>
            Development experience<br/>
            LLVM and GNU C/C++ cross compiler for embedded Linux (ARM, MIPS and x86)<br/>
            iOS, tvOS and macOS framework and applications (Obj-C and Swift)<br/>
            Android (TV and mobile) platforms AOSP and Java/Kotlin apps<br/>
            Python, PHP, golang, Node.js/JavaScript, Roku/BrightScript<br/>
            WindRiver vxWorks RTOS (MIPS32)<br/>
            Win32 API and Microsoft.NET and Xamarin/Unity3D (C/C++ and C#)<br/>
            <br/>
            Standards<br/>
            OTT streaming, Live and VOD HLS/FPS, DVB/MPEG-DASH, MSS, ULL-CMAF<br/>
            W3C HTML/XML/CSS (including WebKit deployments)<br/>
            DVB Broadcasting, HbbTV 2.0.2 and FreeTV Australia operation standards<br/>
            Codecs: AV1, H.264, H.265 (including 4K encoding experience), AAC, AC3/EC3<br/>
            TV based standards (DSM-CC / HDMI / HDCP / EDID)<br/>
            Microsoft PlayReady DRM<br/>
            Widevine DRM<br/>
            <br/>
            Test, debug and profiling tools<br/>
            GNU GDB/gconf/gprof including Linux kernel debug kdbg<br/>
            Trace32 MIPS debugger<br/>
            Coverity Prevent static analysis, ESLint<br/>
            Git, Perforce, Bamboo, Jenkins CI and Codecollaborator<br/>
            <br/>
            SWITCH MEDIA (Sydney, Australia)<br/>
            <br/>
            Solutions Architect for multiple media streaming services including:<br/>
            Foxtel Go - Android AOSP including Google play services integrated set-top-box. Personal efforts included getting Google certification of set-up wraith application, ExoPlayer debugging and assistance with porting (cross-platform) Xamarin based front end streaming application<br/>
            SBS OnDemand - embedded player with SSAI ad support for Chromecast, iPhone/iPad, AppleTV and Android tablet devices<br/>
            Freeview New Zealand HbbTV application (runs on every TV on every channel in NZ)<br/>
            Google Home integration<br/>
            <br/>
            OzTAM (Nielsen) lead SDK maintainer - includes tvOS, iOS, Roku (BrightScript), Android, C# and JavaScript variants - this code (which quietly feeds back audience ratings) is deployed in every streaming device in Australia today<br/>
            <br/>
            Research and production implementation of video and audio stream splitting, transport stream and fragmented MP4 manipulation (real-time live stitching) including low latency HLS TS + fMP4 and DASH fMP4/CMAF<br/>
            <br/>
            This includes manipulation of FPS encrypted streams (though parallel<br/>
            analysis of equivalent clear HLS stream in a secure location)<br/>
            Machine-based video quality assurance on 4K streams (C/C++ OpenCV + FFmpeg libav)<br/>
            Various ad triggering tech (SCTE) also ad replacement (removing existing broadcast ads and sticking in IAB VAST request based targeted ads)<br/>
            macOS based stream diagnostics app (AVPlayer error logger)<br/>
            Transport stream manipulation (e.g. rewriting timecode to playback without discontinuity)<br/>
            <br/>
            Have presented my research publicly to technical audiences at conferences and tech meet-ups<br/>
            <br/>
            <br/>
            <br/>
            NAGRA MEDIA/OPEN TV (Sydney, Australia)<br/>
            <br/>
            Owner/Lead engineer for XSI (NDS Extensible SI used by BSkyB/FOXTEL/Sky Italia) middleware component.<br/>
            <br/>
            Lead design and software implementation of embedded OpenTV middleware clients, controlling companion devices and Nagra broadcast solutions in Australia and the Asia-Pacific region.<br/>
            <br/>
            • Executive level presentations of OpenTV5 PVR embedded Linux middleware onto Broadcom 97425 demonstration CATV set-top-box. Implementation of 'XSI' (propriatory event information) SI adaptor to scan and show live television for NewsCorp customers (SkyUK, SkyNZ, SkyItalia and Foxtel)<br/>
            <br/>
            • WebKit integration to present HTML5/CSS3/JavaScript on Broadcom 97425, involving the integration of Qt4.8 and additional DirectFB integration and performance tuning (including OpenGL ES 2.0 GLES)<br/>
            <br/>
            • DSM-CC server and client side test integration.<br/>
            <br/>
            • SQLite events schedule search and filtering customer demonstrations.<br/>
            <br/>
            • Design and development to support catch up TV and search services by integrating OpenTV2 middleware metadata abstraction API with SQLite into existing deployed MIPS32 set-top boxes. (deployment pending)<br/>
            <br/>
            • Customer CEO presentations of HTTP with cross-origin support to existing OpenTV2 middleware to support HTML5 companion device remote controls for PVR boxes. Android/iOS controlling Foxtel set-top boxes tuning, playback and search services. (demoware)<br/>
            <br/>
            • Design and integration of PVR2 solution for Austar. (deployed)<br/>
            <br/>
            • Design and integration of Terrestrial television support for Austar. (deployed)<br/>
            <br/>
            • Design and integration of Notify OMM services for FOXTEL. (deployed)<br/>
            <br/>
            <br/>
            CISCO/SCIENTIFIC ATLANTA/POWER TV (Cupertino, California)<br/>
            <br/>
            Design and implementation of component-ware support to an existing<br/>
            XML/JavaScript based middleware solution. This work enabled rapid development of all styles of application via an independent<br/>
            modular approach within multiple teams, suppliers and target platform<br/>
            configurations.<br/>
            <br/>
            The role required continuous full UML lifecycle software design and<br/>
            provisioning with strict adherence to various leading industry<br/>
            standards from such groups as the W3C (XML/Scripting), MPEG (A/V and<br/>
            data standards), ATSC, DVB and ARIB/Japan Cable Labs.<br/>
            <br/>
            In equivalent .NET terms this 3-year effort was akin to implementing<br/>
            the IUnknown abstract base class, creating a named class registry,<br/>
            supporting referenced based dynamic loading/unloading of modules<br/>
            (DLL), as well as providing multi-threaded UI management to a given<br/>
            device context.<br/>
            <br/>
            Other supporting code that I built upon this support<br/>
            architecture included:<br/>
            <br/>
            • Shared object libraries. For example graphics libraries such as<br/>
            JPEG, GIF and PNG, thus saving the developer from the time and effort<br/>
            of incorporating their versions of these common libraries and also<br/>
            greatly reducing the overall application footprint in the process.<br/>
            <br/>
            • Multi-threaded animated sprite library providing the customer with the<br/>
            ability to create smooth interactive user interfaces as well as basic<br/>
            Macromedia Flash style games.<br/>
            <br/>
            • Unicode string pool to support user interfaces for characters in all<br/>
            languages. This class handled pre-allocated blocks of string memory<br/>
            which removes the possibility of physical memory fragmentation which<br/>
            are known performance drags..<br/>
            <br/>
            Contributions to the actual XML/JavaScript middleware platform code included:<br/>
            <br/>
            • XML processor look ahead heuristics. Such that the processor can<br/>
            second guess the remainder of a line and groups of similar lines of<br/>
            XML to enable significantly faster parsing and DOM object creation.<br/>
            <br/>
            • Swappable skin-based user interface wrappers. This allows the end-user to dynamically on the fly change the way the entire application<br/>
            appears to their liking. Similar to XP themes and Avalon use in<br/>
            Microsoft Longhorn platform.<br/>
            <br/>
            • Development of Japanese IME (Input Method Engine) which involved<br/>
            some understanding of Kana's and Kanji dictionaries. (the engine<br/>
            itself was built from both Slangsoft and Agfa libraries IME libraries)<br/>
            <br/>
            Lead developer of the Japanese on-screen electronic program schedule<br/>
            guide (EPG) currently in test for a large Japanese MSO for which a<br/>
            patent has since been filed for as myself the author.<br/>
            <br/>
            Microsoft Visual C++ .NET 2003 emulator to allow rapid application<br/>
            development of interactive digital television applications using an<br/>
            ordinary desktop PCs running Microsoft Windows. This project saved<br/>
            countless man-hours of developer time whilst also removing some<br/>
            dependency on the final customer product being available.<br/>
            <br/>
            <br/>
            Other tools I have help develop include a WYSIWYG tool to allow<br/>
            graphical content authors to see their handy work on a real television<br/>
            set in real time from their PC.<br/>
            <br/>
            Extensive use of UML, Visual C++ .NET 2003, GNU C/C++ and assembler<br/>
            has contributed to my strong object oriented component-ware<br/>
            development skills and deep understanding and appreciation of the .NET<br/>
            framework currently used in all modern Microsoft operating systems.<br/>
            <br/>
            <br/>
            NTL: / VIRGIN MEDIA (London, UK)<br/>
            <br/>
            My role included design and development of both client and server<br/>
            based applications and application components.<br/>
            <br/>
            One back office system that I personally developed was creating an<br/>
            efficient HTTP content re-director which I chose to developed using<br/>
            Microsoft IIS ISAPI filter technology.<br/>
            <br/>
            The module developed efficiently reformed the data responses (in<br/>
            multiple threads) as they leave the Windows IIS server cluster to<br/>
            support the multitude of simultaneous connected clients.<br/>
            <br/>
            In this instance the filter required significant logic and<br/>
            appreciation of the capabilities of each connecting client based on<br/>
            their HTTP referrer due to the issue that the DHTML and user interface<br/>
            restrictions vary considerably between the various supported web<br/>
            browser clients.<br/>
            <br/>
            Another Microsoft windows based solution included development of a<br/>
            windows desktop information ticker service. This involved creating a<br/>
            shared ActiveX component that in turn used the common .NET WiiInet<br/>
            services to connect to the news feed URL. Using the .NET MSXML<br/>
            processor I then extracted the response data from the call over the<br/>
            Internet.<br/>
            <br/>
            I also provided an ActiveX container program in the form of a<br/>
            Microsoft windows shell extension (Win32) enabling the ticker<br/>
            component to be docked in the Windows task bar or as a floating window<br/>
            component on the users desktop. This project also made its way from<br/>
            ntl: to the BBC and can be downloaded today via their news.bbc.co.uk<br/>
            web site.<br/>
            <br/>
            This project also lead to a minor offshoot cross platform solution to<br/>
            allow Apple Macintosh and Linux home users to gain access to this<br/>
            service. This I chose to implement at the time via a Java applet<br/>
            embedded in the web page on the ntl: website.<br/>
            <br/>
            Other duties whilst employed by ntl: included general admin of the ISP<br/>
            services and the MS SQL Server based billing system.<br/>
            <br/>
            Skills developed included: XML/JavaScript, VxWorks, SQL Server<br/>
            (Transact-SQL), MS WebTV/WinCE, MS IIS/ISAPI, Windows NT Server,<br/>
            TCP/UDP/IP, Sockets, DNS, Perl and Sun OS Solaris UNIX.<br/>
            <br/>
            <br/>
            TMI / TELECOM ITALIA (London, UK)<br/>
            <br/>
            (one full year as part of undergraduate course and later part-time contractural whilst an undergraduate)<br/>
            <br/>
            Development of easy to use project tracking (database) solution<br/>
            between London and Rome.<br/>
            <br/>
            Other duties included general local and wide area network user support.<br/>
            <br/>
            Skills developed included: TCP/IP, Novell Netware 4.11,<br/>
            V.90/X.25/Frame Relay. Basic Cisco, Motorola switches and NewBridge<br/>
            NetCool admin, Microsoft Access JET, Microsoft Visual Basic and Borland<br/>
            Turbo C++ (DOS).<br/>
            <br/>
            <br/>
            EDUCATION<br/>
            <br/>
            Graduate of Computer Science (Software Development) BSCS 2.1 with honours awarded for my dissertation, Interconnecting World Wide Web<br/>
            with Databases (1997/98) demonstrated how multiple tier enterprise<br/>
            technologies were evolving at the time, in particular, focus was given<br/>
            to ISAPI, ASP and ADO all new technology still under development at this time<br/>
            <br/>
            My education and skills have been asserted by both the United States<br/>
            government and also the Australian Computer Society (ACS).<br/>
            <br/>
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
            <div className="ButtonKev" id="afterKev" onClick={handleAfterKev}>Looking for Media Brewer</div>
            <br/>
            <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
            &copy; 2007 Pyrmont Brewery
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
            ABN: 47824483808<br/>
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
